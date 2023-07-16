import { isEscapeKey } from './util.js';
import { getValidateForm, pristineReset } from './form-validate.js';

const formNode = document.querySelector('.img-upload__form');
const imgUploadRedactorNode = formNode.querySelector('.img-upload__overlay');
const imgUploadInputNode = formNode.querySelector('.img-upload__input');
const closeFormNode = formNode.querySelector('.img-upload__cancel');

const closeUploadForm = () => {
  formNode.reset();
  pristineReset();
  imgUploadRedactorNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openUploadForm = () => {
  imgUploadInputNode.addEventListener('change', () => {
    imgUploadRedactorNode.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    getValidateForm();
  });
};

const onExitButtonClick = () => {
  closeUploadForm();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

closeFormNode.addEventListener('click', onExitButtonClick);

export { openUploadForm };
