import { similarPhotoDescription } from './create-photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//console.log(pictureElement);
//console.log(picturesContainer);

const similarPicture = similarPhotoDescription();

const similarPicturesFragment = document.createDocumentFragment();

similarPicture.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture['comments count'];
  similarPicturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(similarPicturesFragment);
