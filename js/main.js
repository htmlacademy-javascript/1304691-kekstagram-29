import { getPictures } from './data.js';
import { renderPicturesGallery } from './gallery.js';
import { openUploadForm } from './form.js';

renderPicturesGallery(getPictures());

openUploadForm();

