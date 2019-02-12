function addArticles (articles, responseContainer) {
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

  const htmlContent = articlesTemplate(articles.response.docs || []);
  responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}
