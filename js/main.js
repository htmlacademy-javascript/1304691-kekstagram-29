import { getPictures } from './data.js';
import { renderPicturesGallery } from './gallery.js';
import { openUploadForm } from './form.js';
import { init as initSlider } from './effects.js';
import { init as initScaleControl } from './scaler.js';

renderPicturesGallery(getPictures());

openUploadForm();
initScaleControl();
initSlider();
