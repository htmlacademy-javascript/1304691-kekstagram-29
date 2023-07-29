import { isEscapeKey } from './util.js';
import { init as initValidateForm, reset as resetPristine } from './form-validate.js';
import { reset as resetScaleControl } from './scaler.js';
import { reset as resetEffect } from './effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formNode = document.querySelector('.img-upload__form');
const imgUploadRedactorNode = formNode.querySelector('.img-upload__overlay');
const imgUploadInputNode = formNode.querySelector('.img-upload__input');
const imgUploadPreviewNode = formNode.querySelector('.img-upload__preview img');
const closeFormNode = formNode.querySelector('.img-upload__cancel');

const close = () => {
  formNode.reset();
  resetPristine();
  resetScaleControl();
  resetEffect();
  imgUploadRedactorNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSelectImg = () => {
  const file = imgUploadInputNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreviewNode.src = URL.createObjectURL(file);
  }
};

const open = () => {
  imgUploadInputNode.addEventListener('change', () => {
    showSelectImg();
    imgUploadRedactorNode.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    initValidateForm(close);
  });
};

const onExitButtonClick = () => {
  close();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
}

closeFormNode.addEventListener('click', onExitButtonClick);

export { open, close };
