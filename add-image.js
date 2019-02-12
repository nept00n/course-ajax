function addImage(images, responseContainer, searchedForText) {
  const figTemplate = ({ src, searchedText, name }) => {
    return `<figure>
      <img src="${src}" alt="${searchedText}" />
      <figcaption>${searchedText} by ${name}</figcaption>
    </figure>`
  }

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
