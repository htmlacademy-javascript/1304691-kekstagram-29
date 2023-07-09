const picturesContainerNode = document.querySelector('.pictures');
const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({comments, description, likes, url, id}) => {
  const pictureElement = pictureTemplateNode.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.pictureId = id;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    pictureFragment.append(pictureElement);
  });

  picturesContainerNode.append(pictureFragment);
};

export { renderPictures };

