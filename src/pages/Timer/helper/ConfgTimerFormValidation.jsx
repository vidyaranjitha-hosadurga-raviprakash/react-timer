export const isTimerInputValidate = (timer) => {
  return Object.values(timer).some((time) => time > 0);
};
