const picturesContainerNode = document.querySelector('.pictures');
const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({comments, description, likes, url, id}) => {
  const pictureNode = pictureTemplateNode.cloneNode(true);
  const pictureImgNode = pictureNode.querySelector('.picture__img');

  pictureImgNode.src = url;
  pictureImgNode.alt = description;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  pictureNode.dataset.pictureId = id;

  return pictureNode;
};

const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureNode = createPicture(picture);
    pictureFragment.append(pictureNode);
  });

  picturesContainerNode.append(pictureFragment);
};

export { renderPictures };

