import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/pixabay-api.js';
import { displayImages, displayErrorMessage } from './js/render-functions.js';
import { PER_PAGE } from './js/pixabay-api.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.querySelector('.btn-load-more');
let searchText = '';
let currentPage = 1;

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  searchText = input.value.trim();
  console.log(searchText);

  if (searchText === '') {
    displayErrorMessage('Please fill input');
    return;
  }
  input.value = '';
  loader.classList.remove('is-hidden');

  try {
    const data = await getImages(searchText, 1);
    currentPage = 1;
    handleImageData(data);
  } catch (error) {
    console.error('Error during search:', error);
    displayErrorMessage('Error during search');
  } finally {
    loader.classList.add('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async function () {
  const loadMoreLoader = document.getElementById('load-more-loader');
  loadMoreLoader.classList.remove('is-hidden');
  loadMoreBtn.disabled = true;

  try {
    const data = await getImages(searchText, currentPage + 1);
    currentPage++;
    handleImageData(data);

    if (currentPage * PER_PAGE >= data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      displayEndMessage();
    }
  } catch (error) {
    console.error('Error during loading more images:', error);
    displayErrorMessage('Error loading more images');
  } finally {
    loadMoreLoader.classList.add('is-hidden');
    loadMoreBtn.disabled = false;
  }
});

function displayEndMessage() {
  iziToast.info({
    title: '',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

function handleImageData(data) {
  if (data.hits.length === 0) {
    displayErrorMessage(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  if (loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.remove('is-hidden');
  }

  displayImages(data.hits, gallery);

  displayImages(data.hits, document.querySelector('.gallery'));

  const galleryItemHeight = document
    .querySelector('.card')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: 2 * galleryItemHeight,
    behavior: 'smooth',
  });
}
