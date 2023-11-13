import React from "react";

import { useClock } from "contexts";
import "components/Appbar/appbar.css";

export const Appbar = () => {
  const {
    clock: { time },
  } = useClock();

  return (
    <div className="flex-display appbar__container">
      <div className="appbar-clock-widget__wrapper">{time}</div>
    </div>
  );
};
