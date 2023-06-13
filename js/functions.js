const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('проверяемая строка', 20);

const isPalindrome = (string) => {
  const formatString = string.replaceAll(' ', '').toLowerCase();

  let newString = '';

  for (let i = formatString.length - 1; i >= 0; i--) {
    newString += formatString.at(i);
  }

  return formatString === newString;
};

isPalindrome('топот');
isPalindrome('Лёша на полке клопа нашёл ');

const getNumber = (string) => {

  string = string.toString().split(' ').join('');

  let parseString = '';

  for (let i = 0; i < string.length; i++) {

    if (!isNaN(string.at(i))) {
      parseString += parseInt(string.at(i), 10);
    }
  }

  return parseString || 'NaN';
};

getNumber('1 кефир, 0.5 батона');
getNumber(20223);
