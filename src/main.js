import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import { displayErrorMessage } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const searchText = input.value.trim();

  if (searchText === '') {
    displayErrorMessage('Please fill imput');
    return;
  }
  loader.classList.remove('is-hidden');

  getImages(searchText)
    .then(data => {
      if (data.hits.length === 0) {
        displayErrorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      displayImages(data.hits, gallery);
      input.value = '';
    })
    .catch(error => {
      console.error('Error during search:', error);
      displayErrorMessage('Error');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
});
