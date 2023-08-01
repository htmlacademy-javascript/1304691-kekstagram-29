import { isEscapeKey } from './util.js';
import { onDocumentKeydown as onFormKeydown } from './form.js';

let activeAlertType = null;

const alerts = {
  success: createAlert('success'),
  error: createAlert('error')
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeActiveAlert();
  }
};

const onOuterBodyClick = (evt) => {
  if (!evt.target.closest(`.${activeAlertType}__inner`)) {
    closeActiveAlert();
  }
};

const openAlert = (type) => {
  activeAlertType = type;
  document.addEventListener('click', onOuterBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alerts[activeAlertType]);
  document.removeEventListener('keydown', onFormKeydown);
};

function closeActiveAlert() {
  alerts[activeAlertType].remove();
  activeAlertType = null;
  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onFormKeydown);
}

function onButtonAlertClick() {
  closeActiveAlert();
}

function createAlert(type) {
  const alertTemplateNode = document.querySelector(`#${type}`).content;
  const alertNode = alertTemplateNode.querySelector(`.${type}`).cloneNode(true);

  alertNode.querySelector(`.${type}__button`).addEventListener('click', onButtonAlertClick);

  return alertNode;
}

const openSuccessAlert = () => openAlert('success');
const openErrorAlert = () => openAlert('error');

export { openSuccessAlert, openErrorAlert };

