
import { renderPictures } from './create-picture.js';
import { openFullPicture } from './full-picture.js';
import { createUniqueRandomIdGenerator, debounce } from './util.js';

const COUNT_RANDOM_PICTURES = 10;

const pictureContainerNode = document.querySelector('.pictures');
const filtersNode = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const addActiveClassFilter = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const removePictures = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const updatePictures = (pictures) => {
  removePictures();
  renderPictures(pictures);
};

const getRandomPictures = (pictures) => {
  const getRandomPictureId = createUniqueRandomIdGenerator(0, pictures.length - 1);
  const currentPictures = [];

  for (let i = 0; i < COUNT_RANDOM_PICTURES; i++) {
    currentPictures.push(pictures[getRandomPictureId()]);
  }

  updatePictures(currentPictures);
};

const getDiscussedPictures = (pictures) => {
  removePictures();

  renderPictures(pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
  );
};

const renderPicturesGallery = (pictures) => {
  filtersNode.classList.remove('img-filters--inactive');
  addActiveClassFilter();

  document.querySelector('#filter-random').addEventListener('click', debounce(() => getRandomPictures(pictures)));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(() => getDiscussedPictures(pictures)));
  document.querySelector('#filter-default').addEventListener('click', debounce(() => updatePictures(pictures)));

  pictureContainerNode.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');

    if (picture) {
      evt.preventDefault();
      const currentPicture = pictures.find(
        (item) => item.id === +picture.dataset.pictureId
      );
      openFullPicture(currentPicture);
    }
  });

  renderPictures(pictures);
};

export { renderPicturesGallery };
