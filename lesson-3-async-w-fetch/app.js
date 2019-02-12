(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    fetchUnsplash(searchedForText);
    fetchNYT(searchedForText);
  });
  function fetchUnsplash(search) {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${search}`
    const opts =   {
      headers: {
        'Authorization': `Client-ID ${unsplash}`
      },
    }
    fetch(url, opts)
      .then((res) => res.json())
      .then((res) => addImage(res, responseContainer, search))
      .catch(console.log)
  }

  function fetchNYT(search) {
    fetch( `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${nyt}`)
      .then((res) => res.json())
      .then((res) => addArticles(res, responseContainer))
      .catch(console.log)
  }
})();

