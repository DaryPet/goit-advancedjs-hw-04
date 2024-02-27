import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function displayImages(images, gallery) {
  gallery.innerHTML = '';
  const imageElements = images
    .map(image => {
      return ` <div class="card">
         <a href="${image.webformatURL}"><img class="card-image" src="${image.webformatURL}" alt="${image.tags}" />
         <div class="card-info">
           <p>Likes: <span>${image.likes}</span></p>
           <p>Views: <span>${image.views}</span></p>
           <p>Comments: <span>${image.comments}</span></p>
           <p>Downloads:<span>${image.downloads}</span></p>
         </div></a>
       </div> `;
    })
    .join('');

  gallery.innerHTML = imageElements;
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function displayErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
