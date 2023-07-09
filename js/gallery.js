
import { renderPictures } from './create-picture.js';
import { openFullPicture } from './full-picture.js';

const pictureContainer = document.querySelector('.pictures');

const renderPicturesGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');
    if (!picture) {
      return;
    }

    evt.preventDefault();
    const currentPicture = pictures.find(
      (item) => item.id === +picture.dataset.pictureId
    );
    openFullPicture(currentPicture);
  });
  renderPictures(pictures);
};

export { renderPicturesGallery };
