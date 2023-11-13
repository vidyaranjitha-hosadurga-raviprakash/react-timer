import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const getDurationBreakPoints = (duration, colorsList) => {
  const onePart = Math.floor(duration / colorsList.length);
  const result = Array(colorsList.length)
    .fill(onePart)
    .map((element, index) => {
      return element * (index + 1);
    });
  // .reverse();

  return result;
};

export const CountdownTimer = ({
  timerKey,
  isPlaying,
  duration,
  initialRemainingTime,
  onComplete,
  children,
  colors,
  rotation,
}) => {
  const colorsList = colors ? colors : [];

  return (
    <>
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={initialRemainingTime}
        onComplete={onComplete ?? null}
        colors={colors}
        colorsTime={getDurationBreakPoints(duration, colorsList)}
        size={190}
        strokeWidth={18}
        rotation={rotation}
      >
        {({ remainingTime }) => children(remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};
