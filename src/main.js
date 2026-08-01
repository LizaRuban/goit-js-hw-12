import getImagesByQuery from '/js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from '/js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const button = document.querySelector('.load-more-btn');

const PER_PAGE = 15;

let page = 1;
let query = '';

form.addEventListener('submit', onSearch);
button.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    hideLoadMoreButton();
    iziToast.error({
      message: 'Please enter a search query!',
    });

    return;
  }

  page = 1;
  clearGallery();
  await loadImages();

  form.reset();
}

async function onLoadMore() {
  page++;
  await loadImages(true);
}

async function loadImages(shouldScroll = false) {
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    if (shouldScroll) {
      scrollGallery();
    }

    toggleLoadMoreButton(data.totalHits);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Something went wrong!',
    });
  } finally {
    hideLoader();
  }
}

function toggleLoadMoreButton(totalHits) {
  if (page * PER_PAGE < totalHits) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}

function scrollGallery() {
  const card = document.querySelector('.gallery-item');

  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
