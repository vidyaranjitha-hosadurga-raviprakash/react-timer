export const isActiveEle = (currentActiveEle, selectedElem) => {
  return currentActiveEle === selectedElem ? "active" : "";
};

export const generateRandomNumber = (max = 16, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const convertMinuteToSec = (timeInSec) => {
  return timeInSec * 60;
};

export const convertHourToSec = (timerInHour) => {
  return convertMinuteToSec(timerInHour) * 60;
};

export const getTimeInSeconds = (hours, minutes, seconds) => {
  return convertHourToSec(hours) + convertMinuteToSec(minutes) + seconds;
};

export const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return { hours, minutes, seconds };
};

export const getSingularFormBasedOnValue = (conditionCheck, value, content) => {
  return value <= conditionCheck
    ? content.substring(0, content.length - 1)
    : content;
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const isEmptyStr = (input) => {
  if (input === undefined) return true;
  return input.toString().trim().length ? false : true;
};
