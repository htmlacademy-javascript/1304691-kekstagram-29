import { isEscapeKey } from './util.js';

let activeAlertType = null;
let onEscapeKeydown = null;

const Alerts = {
  SUCCESS: createAlert('success'),
  ERROR: createAlert('error')
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
  activeAlertType = type.toUpperCase();
  document.addEventListener('click', onOuterBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(Alerts[activeAlertType]);
};

function closeActiveAlert() {
  Alerts[activeAlertType].remove();
  activeAlertType = null;
  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onEscapeKeydown);
}

function createAlert(type) {
  const alertTemplateNode = document.querySelector(`#${type}`).content;
  const alertNode = alertTemplateNode.querySelector(`.${type}`).cloneNode(true);

  alertNode.querySelector(`.${type}__button`).addEventListener('click', closeActiveAlert);

  return alertNode;
}

const openSuccessAlert = () => openAlert('success');
const openErrorAlert = (handler) => {
  onEscapeKeydown = handler;
  openAlert('error');
};

export { openSuccessAlert, openErrorAlert };

