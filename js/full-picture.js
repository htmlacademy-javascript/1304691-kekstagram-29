import { isEscapeKey } from './util.js';

const fullPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('#picture-cancel');
const commentsContainer = fullPicture.querySelector('.social__comments');
const socialCommentCount = fullPicture.querySelector('.social__comment-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');

const renderDataOnFullPicture = ({ url, description, likes, comments }) => {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.big-picture__img img').alt = description;
  fullPicture.querySelector('.social__comment-count').textContent = comments.length;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.social__caption').textContent = description;
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  comments.forEach(({ avatar, message, name }) => {
    const comment = `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
    </li>
    `;
    commentsContainer.innerHTML += comment;
  });
};

const openFullPicture = (data) => {
  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderDataOnFullPicture(data);
  renderComments(data.comments);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

const onExitButtonClick = () => {
  closeFullPicture();
};

closePicture.addEventListener('click', onExitButtonClick);

export { openFullPicture };
