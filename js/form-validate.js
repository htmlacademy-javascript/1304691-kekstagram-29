import { isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNT = 5;
const INVALID_COUNT_SYMBOLS = 'Не более 140 символов';
const INVALID_COUNT = 'Можно использовать не более пяти хэш-тегов';
const NOT_UNIQUE = 'Хэш - теги не должны повторяться';
const INVALID_PATTERN = 'Хэш-теги не соответствуют формату';

const formNode = document.querySelector('.img-upload__form');
const hashtagNode = formNode.querySelector('.text__hashtags');
const commentNode = formNode.querySelector('.text__description');

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(formNode, defaultConfig);

const pristineReset = () => pristine.reset();

const validateCommentInput = (value) => value.length <= MAX_COMMENT_LENGTH;

const getHashtags = () => hashtagNode.value
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((hashtag) => hashtag.length > 0);

const validateHashtagFormatInput = () => {
  const hashtags = getHashtags();
  return hashtags.every((value) => HASHTAG_REGEX.test(value));
};

const validateHashtagCountInput = () => {
  const hashtags = getHashtags();

  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};

const validateHashtagDublicateInput = () => {
  const hashtags = getHashtags();
  const isHashtagsDuplicate = new Set(hashtags);

  return isHashtagsDuplicate.size === hashtags.length;
};

const getValidateForm = () => {

  pristine.addValidator(commentNode, validateCommentInput, INVALID_COUNT_SYMBOLS);

  pristine.addValidator(hashtagNode, validateHashtagFormatInput, INVALID_PATTERN, 2, true);
  pristine.addValidator(hashtagNode, validateHashtagCountInput, INVALID_COUNT, 3, true);
  pristine.addValidator(hashtagNode, validateHashtagDublicateInput, NOT_UNIQUE, 1, true);

  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

};

const onInputKeydown = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

hashtagNode.addEventListener('keydown', onInputKeydown);
commentNode.addEventListener('keydown', onInputKeydown);

export { getValidateForm, pristineReset };
