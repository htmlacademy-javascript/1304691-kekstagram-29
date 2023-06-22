import { getRandomInteger } from './util.js';
import { checkUniqueId } from './check-id.js';

const NAMES_COMMENTATORS = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const randomLikes = getRandomInteger(15, 200);
const randomId = checkUniqueId(1, 25);

const createPhotoDescription = () => {
  const randomUrl = getRandomInteger(1, 25);
  const randomCountComments = getRandomInteger(0, 30);

  const generatedComments = () => {

    const generatedIdComments = checkUniqueId(0, 30);
    const arrayComments = [];

    for (let i = 0; i <= randomCountComments; i++) {
      const comment = {
        id: generatedIdComments(),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(TEXT_COMMENTS),
        name: getRandomArrayElement(NAMES_COMMENTATORS)
      };
      arrayComments.push(comment);
    }
    return arrayComments;
  };

  return {
    id: randomId(),
    url: `photos/${randomUrl}.jpg`,
    description: 'Просто красивая фотография',
    likes: randomLikes,
    comments: generatedComments()
  };
};

const similarPhotoDescription = () => Array.from({ length: 25 }, createPhotoDescription);

export { similarPhotoDescription };
