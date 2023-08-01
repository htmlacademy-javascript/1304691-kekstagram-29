const STEP_SCALE_CONTROL = 25;
const MIN_SCALE_CONTROL = 25;
const MAX_SCALE_CONTROL = 100;
const DEFAULT_SCALE_CONTROL = 100;

const scaleControlSmallerNode = document.querySelector('.scale__control--smaller');
const scaleControlBiggerNode = document.querySelector('.scale__control--bigger');
const scaleControlValueNode = document.querySelector('.scale__control--value');
const imgUploadPreviewNode = document.querySelector('.img-upload__preview img');

let styleValue = parseInt(scaleControlValueNode.value, 10);

const scaleImage = (value) => {
  scaleControlValueNode.value = `${value}%`;
  imgUploadPreviewNode.style.transform = `scale(${value / 100})`;
};

const reset = () => {
  styleValue = DEFAULT_SCALE_CONTROL;
  scaleImage(DEFAULT_SCALE_CONTROL);
};

const onSmallerButtonClick = () => {
  if (styleValue > MIN_SCALE_CONTROL) {
    styleValue -= STEP_SCALE_CONTROL;
  }
  scaleImage(styleValue);
};

const onBiggerButtonClick = () => {
  if (styleValue < MAX_SCALE_CONTROL) {
    styleValue += STEP_SCALE_CONTROL;
  }
  scaleImage(styleValue);
};

const init = () => {
  scaleControlSmallerNode.addEventListener('click', onSmallerButtonClick);
  scaleControlBiggerNode.addEventListener('click', onBiggerButtonClick);
};

export { reset, init };

