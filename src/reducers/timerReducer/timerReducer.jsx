import { timerActions } from "reducers";
export const timerReducer = (timerState = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case timerActions.START_TIMER:
    case timerActions.STOP_TIMER: {
      return { ...timerState, isTimerExecuting: payload };
    }

    case timerActions.EXHAUSTED_TIMER: {
      return { ...timerState, isTimerExhausted: payload };
    }

    case timerActions.RAISE_CLEAR_ALARM_TIMER: {
      return { ...timerState, raiseAlarm: payload };
    }

    case timerActions.CONFIG_TIMER:
    case timerActions.RESET_TIMER: {
      return { ...timerState, ...payload };
    }

    default:
      return timerState;
  }
};
