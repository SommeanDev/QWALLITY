  const images = [
    { term: 'black hair', urls: [
      { url: 'https://drive.google.com/uc?export=download&id=1Q_Em2-jhonk9Tk_p2B0vX-T6kQRwIfqO', fileName: 'image1.jpg' },
      { url: 'https://drive.google.com/uc?export=download&id=1Q_Em2-jhonk9Tk_p2B0vX-T6kQRwIfqO', fileName: 'image2.jpg' },
      { url: 'https://drive.google.com/uc?export=download&id=1Q_Em2-jhonk9Tk_p2B0vX-T6kQRwIfqO', fileName: 'image3.jpg' }
    ]},
    { term: 'marvel', urls: [
      { url: 'https://example.com/images/marvel-1.jpg', fileName: 'marvel1.jpg' },
      { url: 'https://example.com/images/marvel-2.jpg', fileName: 'marvel2.jpg' },
      { url: 'https://example.com/images/marvel-3.jpg', fileName: 'marvel3.jpg' }
    ]},
    // Add more search terms and associated URLs as needed
  ];

  const form = document.getElementById('search-form');
  const searchInputs = document.querySelectorAll('.search-input');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchTerms = Array.from(searchInputs).map(input => input.value.toLowerCase());
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));

    // Call a function to filter and display the images based on the search terms
    displayImages(searchTerms);
  });

  function displayImages(searchTerms) {
    const matchedImages = [];

    images.forEach(image => {
      searchTerms.forEach(term => {
        if (image.term.toLowerCase().includes(term)) {
          matchedImages.push(...image.urls);
        }
      });
    });

    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    if (matchedImages.length > 0) {
      matchedImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = 'Image';
        imgElement.setAttribute('data-download-url', image.url);
        imgElement.setAttribute('data-file-name', image.fileName);
        imgElement.addEventListener('click', handleImageClick);
        imageContainer.appendChild(imgElement);
      });
    } else {
      imageContainer.textContent = 'No images found.';
    }
  }

function handleImageClick(event) {
  const url = event.target.getAttribute('data-download-url');
  const fileName = event.target.getAttribute('data-file-name');
  if (url && fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
}


window.addEventListener('load', function() {
  const storedSearchTerms = JSON.parse(localStorage.getItem('searchTerms'));
  const redirectKey = 'redirected';

  if (!localStorage.getItem(redirectKey)) {
    if (storedSearchTerms && storedSearchTerms.length > 0) {
      storedSearchTerms.forEach((searchTerm, index) => {
        searchInputs[index].value = searchTerm;
      });

      displayImages(storedSearchTerms);
    }

    // Clear search history from local storage
    localStorage.removeItem('searchTerms');

    // Redirect to frame.html
    localStorage.setItem(redirectKey, 'true');
    window.location.href = 'frame.html';
  }
});
