import iziToast from 'izitoast/dist/js/iziToast.min.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/pixabay-api.js';
import { displayImages, displayErrorMessage } from './js/render-functions.js';
import { PER_PAGE } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.querySelector('#loadMoreBtn');

let searchText = '';
let currentPage = 1;

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  searchText = input.value.trim();

  if (searchText === '') {
    displayErrorMessage('Please fill input');
    return;
  }
  input.value = '';
  loader.classList.remove('is-hidden');

  if (currentPage === 1) {
    gallery.innerHTML = '';
  }

  try {
    const data = await getImages(searchText, currentPage);
    currentPage = 1;
    if (data.hits.length === 0) {
      displayErrorMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    displayImages(data.hits, gallery);
    if (data.totalHits > PER_PAGE) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error('Error during search:', error);
    displayErrorMessage('Error during search');
  } finally {
    loader.classList.add('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async function () {
  if (!navigator.onLine) {
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');

    iziToast.error({
      title: 'Error',
      message: 'No internet connection',
      position: 'topRight',
    });
    return;
  }

  const loadMoreLoader = document.getElementById('load-more-loader');
  loadMoreLoader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await getImages(searchText, currentPage + 1);
    currentPage++;
    handleImageData(data);

    if (currentPage * PER_PAGE >= data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      displayEndMessage();
    }

    loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
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

  const galleryItemHeight =
    document.querySelector('.gallery-item')?.getBoundingClientRect().height ||
    200;
}
