//import { getPictures } from './data.js';
import { renderPicturesGallery } from './gallery.js';
import { open as openUploadForm } from './form.js';
import { init as initSlider } from './effects.js';
import { init as initScaleControl } from './scaler.js';
import { openErrorAlert } from './util.js';
import { get as getData} from './api.js';

openUploadForm();
initScaleControl();
initSlider();

getData()
  .then((pictures) => {
    renderPicturesGallery(pictures);
  })
  .catch(() => openErrorAlert('Не удалось получить данные с сервера'));
