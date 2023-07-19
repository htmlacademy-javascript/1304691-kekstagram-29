import { isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNT = 5;

const ValidationMessages = {
  INVALID_COUNT_SYMBOLS: 'Не более 140 символов',
  INVALID_COUNT: 'Можно использовать не более пяти хэш-тегов',
  NOT_UNIQUE: 'Хэш - теги не должны повторяться',
  INVALID_PATTERN: 'Хэш-теги не соответствуют формату'
};

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

const doValidateForm = () => {

  pristine.addValidator(commentNode, validateCommentInput, ValidationMessages['INVALID_COUNT_SYMBOLS']);

  pristine.addValidator(hashtagNode, validateHashtagFormatInput, ValidationMessages['INVALID_PATTERN'], 2, true);
  pristine.addValidator(hashtagNode, validateHashtagCountInput, ValidationMessages['INVALID_COUNT'], 3, true);
  pristine.addValidator(hashtagNode, validateHashtagDublicateInput, ValidationMessages['NOT_UNIQUE'], 1, true);

  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

};

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagNode.addEventListener('keydown', onInputKeydown);
commentNode.addEventListener('keydown', onInputKeydown);

export { doValidateForm, pristineReset };
