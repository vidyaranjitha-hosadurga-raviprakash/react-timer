import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";

import { timerReducer, timerActions } from "reducers";

import {
  convertMinuteToSec,
  getTimeInSeconds,
  generateRandomNumber,
} from "utils/commonOperations";

const DEFAULT_TIMER_VALUE = convertMinuteToSec(25);
const TimerContext = createContext();

const timerInitialState = {
  timerKey: 0,
  isTimerExhausted: false,
  isTimerExecuting: false,
  raiseAlarm: false,
  config: [
    {
      value: DEFAULT_TIMER_VALUE,
    },
  ],
};

const TimerProvider = ({ children }) => {
  const intervalRef = useRef();
  const [timer, timerDispatch] = useReducer(timerReducer, timerInitialState);
  // This is required when switching between the pages.
  const [countDownRemainingTime, setCountDownRemainingTime] = useState(
    timer.config[0].value
  );

  // Running the timer.
  useEffect(() => {
    if (timer.isTimerExecuting) {
      intervalRef.current = setInterval(() => {
        setCountDownRemainingTime((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const configTimer = (timerValue) => {
    const { hours, minutes, seconds } = timerValue;
    const timerInSeconds = getTimeInSeconds(hours, minutes, seconds);
    setCountDownRemainingTime(timerInSeconds);
    const payload = {
      timerKey: timer.timerKey + generateRandomNumber(),
      config: [{ value: timerInSeconds }],
      isTimerExecuting: false,
      isTimerExhausted: false,
      raiseAlarm: false,
    };
    timerDispatch({ type: timerActions.CONFIG_TIMER, payload: payload });
  };

  const startTimer = () => {
    timerDispatch({ type: timerActions.START_TIMER, payload: true });
  };

  const stopTimer = () => {
    timerDispatch({ type: timerActions.STOP_TIMER, payload: false });
  };

  const resetTimer = () => {
    setCountDownRemainingTime(DEFAULT_TIMER_VALUE);
    timerDispatch({
      type: timerActions.RESET_TIMER,
      payload: {
        timerKey: timer.timerKey + generateRandomNumber(),
        isTimerExecuting: false,
        isTimerExhausted: false,
        raiseAlarm: false,
        config: [{ value: DEFAULT_TIMER_VALUE }],
      },
    });
  };

  const exhaustedTimer = () => {
    timerDispatch({
      type: timerActions.EXHAUSTED_TIMER,
      payload: true,
    });
  };

  // 0 - CLEAR_ALARM and 1 - RAISE_ALARM
  const raiseClearAlarm = (operation) => {
    timerDispatch({
      type: timerActions.RAISE_CLEAR_ALARM_TIMER,
      payload: operation ? true : false,
    });
  };

  // Monitoring the timer for the completion.
  useEffect(() => {
    if (countDownRemainingTime <= 0) {
      exhaustedTimer();
      stopTimer();
      raiseClearAlarm(1); // Raising the alarm
    }
  }, [countDownRemainingTime]);

  return (
    <TimerContext.Provider
      value={{
        timer,
        configTimer,
        startTimer,
        stopTimer,
        resetTimer,
        raiseClearAlarm,
        countDownRemainingTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);
export { TimerProvider, useTimer };
