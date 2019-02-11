(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetchSearchedText();
        fetchNytArticle();
    });


  const figTemplate = ({ src, searchedText, name }) => {
    return `<figure>
      <img src="${src}" alt="${searchedText}" />
      <figcaption>${searchedText} by ${name}</figcaption>
    </figure>`
  }

  function addImage() {
    const data = JSON.parse(this.responseText);
    if (data && data.results && data.results[0]) {
      const firstImage = data.results[0];
      htmlContent = figTemplate({
        src: firstImage.urls.regular,
        searcedText: searchedForText,
        name: firstImage.user.name,
      });
    } else {
      htmlContent = '<div className="error-no-image">NO images available</div>';
    }
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent)
    console.log('ajax SUCCESS');
  }
  function handleImageError() {
    console.log('ajax FAIL');
  }

  function fetchSearchedText () {
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization', `Client-ID ${unsplash}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.onerror = handleImageError;
    unsplashRequest.send();
  }

  function articlesTemplate (docs) {
    if (docs.length) {
      const articleTemp = ({ web_url, headline, snippet }) => {
        return `<li class="article">
        <h2><a href="${web_url}">${headline.main}</a></h2>
        <p>${snippet}</p>
        </li>`
      }
      const articles = docs.map(articleTemp)
      return `<ul>${articles.join('')}</ul>`
    }
    return '<div className="error-no-articles">No articles available</div>'
  }

  function addArticles () {
    const data = JSON.parse(this.responseText);
    const htmlContent = articlesTemplate(data.response.docs || []);
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }
  function fetchNytArticle() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nyt}`);
    articleRequest.send();
  }

})();
