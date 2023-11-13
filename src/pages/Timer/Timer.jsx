import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useSound from "use-sound";

import { useTimer } from "contexts";
import { ConfigTimerForm } from "pages/Timer";
import { CountdownTimer } from "components";
import { convertHMS } from "utils/commonOperations";
import "pages/Timer/timer.css";
import iPhoneTimer from "assets/audio/iphoneTimer.mp3";

const COLORS = ["#004777", "#F7B801", "#A30000", "#b71c1c"];

export const Timer = () => {
  const {
    timer,
    configTimer,
    startTimer,
    stopTimer,
    resetTimer,
    raiseClearAlarm,
    countDownRemainingTime,
  } = useTimer();

  const [play, { stop }] = useSound(iPhoneTimer, { interrupt: true });

  const { timerKey, config, isTimerExecuting, isTimerExhausted, raiseAlarm } =
    timer;

  const timerControls = [
    {
      title: "play-btn",
      value: "fa-play",
      clickHandler: () => startTimer(),
      disabled: isTimerExecuting || isTimerExhausted,
    },
    {
      title: "pause-btn",
      value: "fa-pause",
      clickHandler: () => stopTimer(),
      disabled: !isTimerExecuting,
    },
    {
      title: "reset-btn",
      value: "fa-undo",
      clickHandler: () => resetTimer(),
      disabled: false,
    },
    {
      title: "sound-btn",
      value: `${raiseAlarm ? "fa-bell" : "fa-bell-slash"}`,
      clickHandler: () => raiseClearAlarm(!Boolean(raiseAlarm)),
      disabled: false,
    },
  ];

  const timerChildren = (remainingTime) => {
    const { hours, minutes, seconds } = convertHMS(remainingTime);
    return (
      <div className="flex-column">
        <div className="flex-centered-column">
          <span className="timer-remaining-time">{`${hours}: ${minutes}: ${seconds}`}</span>
        </div>
        <div className="danger flex-centered-column">{"Times Up!"}</div>
      </div>
    );
  };

  // Handling the notifications for the timer exhaustion.
  useEffect(() => {
    if (isTimerExhausted) {
      toast.info("Times up");
    }
  }, [isTimerExhausted]);

  // Handling the alarm for the timer exhaustion
  useEffect(() => {
    let timerAlarmInterval;
    if (raiseAlarm) {
      play();
      timerAlarmInterval = setInterval(() => {
        play();
      }, 12000);
    } else {
      stop();
    }
    return () => clearInterval(timerAlarmInterval);
  });

  return (
    <div className="container flex-centered-column">
      <div className="flex-centered-column timer__container">
        <div className="timer-config-wrapper">
          <ConfigTimerForm
            configTimer={configTimer}
            isTimerConfigEditable={isTimerExecuting}
          />
        </div>
        <div className="timer-display-wrapper">
          <div className="timer-progress">
            <CountdownTimer
              timerKey={timerKey}
              isPlaying={isTimerExecuting}
              duration={config[0].value}
              initialRemainingTime={countDownRemainingTime}
              colors={COLORS}
              isDurationInMinute={false}
              rotation={"counterclockwise"}
              children={timerChildren}
            />
          </div>

          <div className="timer-controls ">
            {timerControls.map(({ title, value, clickHandler, disabled }) => {
              return (
                <button
                  key={title}
                  className={`timer-control-btn ${
                    title === "sound-btn" && !isTimerExhausted && "hide"
                  }`}
                  onClick={clickHandler}
                  disabled={disabled}
                >
                  {<i className={`fa ${value}`} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
