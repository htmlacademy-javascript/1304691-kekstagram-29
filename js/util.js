const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const openErrorAlert = (message) => {
  const alertContainerNode = document.createElement('div');
  document.body.append(alertContainerNode);
  alertContainerNode.classList.add('error-alert-container');

  const alertNode = document.createElement('div');
  alertNode.classList.add('error-alert');
  alertNode.textContent = message;
  alertContainerNode.append(alertNode);

  setTimeout(() => alertContainerNode.remove(), 5000);
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, createIdGenerator, openErrorAlert };
