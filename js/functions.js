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

const HOUR_IN_MINUTES = 60;

const parseTime = (timeString) => {
  const timeArray = timeString.split(':');
  const hour = timeArray[0];
  const minute = timeArray[1];
  return hour * HOUR_IN_MINUTES + Number(minute);
};

const checkMeeting = (startWork, finishWork, startMeet, durationMeet) => {
  const startWorkInMinutes = parseTime(startWork);
  const finishWorkInMinutes = parseTime(finishWork);
  const startMeetInMinutes = parseTime(startMeet);

  return (
    startMeetInMinutes >= startWorkInMinutes &&
    startMeetInMinutes + durationMeet <= finishWorkInMinutes
  );
};

checkMeeting('08:00', '17:30', '14:00', 90);
checkMeeting('8:0', '10:0', '8:0', 120);
