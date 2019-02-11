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

  function addImage(images) {
    if (images && images.results && images.results[0]) {
      const firstImage = images.results[0];
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
    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        'Authorization': `Client-ID ${unsplash}`
      },
    })
      .done(addImage)
      .error(handleImageError)
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

  function addArticles (articles) {
    const htmlContent = articlesTemplate(articles.response.docs || []);
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }
  function fetchNytArticle() {
    $.ajax({
      url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nyt}`
    }).done(addArticles)
  }

})();
