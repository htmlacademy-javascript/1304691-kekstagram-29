import { isEscapeKey } from './util.js';

const fullPictureNode = document.querySelector('.big-picture');
const closePictureNode = document.querySelector('#picture-cancel');
const commentsContainerNode = fullPictureNode.querySelector('.social__comments');
const commentTemplateNode = fullPictureNode.querySelector('.social__comment');

const renderDataOnfullPicture = ({ url, description, likes, comments }) => {
  fullPictureNode.querySelector('.big-picture__img img').src = url;
  fullPictureNode.querySelector('.big-picture__img img').alt = description;
  fullPictureNode.querySelector('.social__comment-count').textContent = comments.length;
  fullPictureNode.querySelector('.likes-count').textContent = likes;
  fullPictureNode.querySelector('.social__caption').textContent = description;
};

const createComment = (data) => {
  const comment = commentTemplateNode.cloneNode(true);

  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
};

const renderComments = (comments) => {
  commentsContainerNode.innerHTML = '';

  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    commentFragment.append(commentElement);
  });

  commentsContainerNode.append(commentFragment);

};

const openFullPicture = (data) => {
  fullPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderDataOnfullPicture(data);
  renderComments(data.comments);
  fullPictureNode.querySelector('.social__comment-count').classList.add('hidden');
  fullPictureNode.querySelector('.comments-loader').classList.add('hidden');
};

const closeFullPicture = () => {
  fullPictureNode.classList.add('hidden');
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

closePictureNode.addEventListener('click', onExitButtonClick);

export { openFullPicture };
