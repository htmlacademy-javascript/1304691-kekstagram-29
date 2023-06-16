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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createPhotoDescription = () => {
  const randomId = getRandomInteger(1, 25);
  const randomUrl = getRandomInteger(1, 25);
  const randomLikes = getRandomInteger(15, 200);
  const randomAvatar = getRandomInteger(1, 6);
  const randomIdComments = getRandomInteger(0, 30);

  return {
    id: randomId,
    url: `photos/${randomUrl}.jpg`,
    description: 'Просто красивая фотография',
    likes: randomLikes,
    comments: [
      {
        id: randomIdComments,
        avatar: `img/avatar-${randomAvatar}.svg`,
        message: getRandomArrayElement(TEXT_COMMENTS),
        name: getRandomArrayElement(NAMES_COMMENTATORS)
      },
      {
        id: randomIdComments,
        avatar: `img/avatar-${randomAvatar}.svg`,
        message: getRandomArrayElement(TEXT_COMMENTS),
        name: getRandomArrayElement(NAMES_COMMENTATORS)
      },
      {
        id: randomIdComments,
        avatar: `img/avatar-${randomAvatar}.svg`,
        message: getRandomArrayElement(TEXT_COMMENTS),
        name: getRandomArrayElement(NAMES_COMMENTATORS)
      },
    ]
  };
};

const similarPhotoDescription = Array.from({ length: 25 }, createPhotoDescription);

similarPhotoDescription();

