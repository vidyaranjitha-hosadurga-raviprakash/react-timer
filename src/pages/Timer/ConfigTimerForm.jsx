import React, { useState } from "react";
import { toast } from "react-toastify";

import { isTimerInputValidate } from "./helper/ConfgTimerFormValidation";

const DEFAULT_TIMER_VALUE = {
  hours: "",
  minutes: "",
  seconds: "",
};
export const ConfigTimerForm = ({ configTimer, isTimerConfigEditable }) => {
  const [timerInput, setTimerInput] = useState(DEFAULT_TIMER_VALUE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTimerInputValidate(timerInput))
      return toast.error("Please provide the input");
    configTimer(timerInput);
    setTimerInput(DEFAULT_TIMER_VALUE);
  };

  const isConfigFormValid = () =>
    JSON.stringify(timerInput) === JSON.stringify(DEFAULT_TIMER_VALUE);

  const timerInputOptions = [
    {
      name: "hours",
    },
    {
      name: "minutes",
    },
    {
      name: "seconds",
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-centered config-timer-form">
        {timerInputOptions.map(({ name }, index) => {
          return (
            <input
              key={index}
              type="number"
              min="0"
              value={timerInput[name]}
              onChange={(e) => {
                setTimerInput({
                  ...timerInput,
                  [name]: +e.target.value,
                });
              }}
              className="input-box"
              placeholder={name}
              aria-label={`timer in ${name}`}
              title={name}
            />
          );
        })}

        <button
          type="submit"
          disabled={isConfigFormValid() || isTimerConfigEditable}
        >
          <i className="fa fa-arrow-right" />
        </button>
      </div>
    </form>
  );
};
