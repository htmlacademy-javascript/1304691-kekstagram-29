const effectLevelValueNode = document.querySelector('.effect-level__value');
const imgUploadPreviewNode = document.querySelector('.img-upload__preview img');
const effectsListNode = document.querySelector('.effects__list');
const sliderContainerNode = document.querySelector('.img-upload__effect-level');
const sliderNode = document.querySelector('.effect-level__slider');

let chosenEffect = 'none';

const configEffects = {
  default: {
    range: {
      'min': 0,
      'max': 100
    },
    start: 0,
    step: 1,
    connect: 'lower',
  },
  chrome: {
    range: {
      'min': 0,
      'max': 1
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {
      'min': 0,
      'max': 1
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    range: {
      'min': 0,
      'max': 100
    },
    start: 0,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {
      'min': 0,
      'max': 3
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {
      'min': 1,
      'max': 3
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  }
};

const effects = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const effectsUnits = {
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: '',
};

const createImageStyle = () => {
  if (chosenEffect === 'none') {
    imgUploadPreviewNode.style.filter = null;
    return;
  }

  const { value } = effectLevelValueNode;
  const currentEffect = effects[chosenEffect];
  const currentEffectUnit = effectsUnits[chosenEffect];
  imgUploadPreviewNode.style.filter = `${currentEffect}(${value}${currentEffectUnit})`;
};

const destroySlider = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.destroy();
  }
  createImageStyle();
};

const onSliderUpdate = () => {
  effectLevelValueNode.value = sliderNode.noUiSlider.get();
  createImageStyle();
};

const createSlider = ({ range, step }) => {
  noUiSlider.create(sliderNode, {
    range: {
      'min': range.min,
      'max': range.max
    },
    start: range.max,
    step,
    connect: 'lower',
  });
  sliderNode.noUiSlider.on('update', onSliderUpdate);
};

const setSlider = () => {
  destroySlider();
  sliderContainerNode.classList.add('hidden');

  if (chosenEffect !== 'none') {
    createSlider(configEffects[chosenEffect]);
    sliderContainerNode.classList.remove('hidden');
  }
};

const createEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
};

const reset = () => {
  createEffect('none');
};

const init = () => {
  setSlider();
  effectsListNode.addEventListener('change', (evt) => {
    createEffect(evt.target.value);
  });
};

export { init, reset };
