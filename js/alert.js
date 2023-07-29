import { isEscapeKey } from './util.js';

let activeAlertType = null;

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

const Alerts = {
  success: createAlert('success'),
  error: createAlert('error')
};

const openAlert = (type) => {
  activeAlertType = type;
  document.addEventListener('click', onOuterBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(Alerts[activeAlertType]);
};

function closeActiveAlert() {
  Alerts[activeAlertType].remove();
  activeAlertType = null;
  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function createAlert(type) {
  const alertTemplateNode = document.querySelector(`#${type}`).content;
  const alertNode = alertTemplateNode.querySelector(`.${type}`).cloneNode(true);

  alertNode.querySelector(`.${type}__button`).addEventListener('click', closeActiveAlert);

  return alertNode;
}

const openSuccessAlert = () => openAlert('success');
const openErrorAlert = () => openAlert('error');

export { openSuccessAlert, openErrorAlert };

