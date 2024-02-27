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
const loadMoreBtn = document.querySelector('.btn-load-more');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchText = input.value.trim();

  if (searchText === '') {
    displayErrorMessage('Please fill imput');
    return;
  }
  loader.classList.remove('is-hidden');

  try {
    const data = await getImages(searchText);
    if (data.hits.length === 0) {
      displayErrorMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    displayImages(data.hits, gallery);
    input.value = '';
  } catch (error) {
    console.error('Error during search:', error);
    displayErrorMessage('Error during search');
  } finally {
    loader.classList.add('is-hidden');
  }
});

// loadMoreBtn.addEventListener('click', onLoadMore);

// function onLoadMore() {
//   loader.classList.remove('is-hidden');
// }
