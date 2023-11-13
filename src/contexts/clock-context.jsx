import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { getTimeDate } from "utils/clockUtils";

const ClockContext = createContext();

const initialState = { date: "", time: "", greet: "" };

const ClockProvider = ({ children }) => {
  const [clock, setClock] = useState(initialState);

  //Fetching the time for the first time when the application starts.
  useEffect(() => setClock(getTimeDate()), []);

  // Updating the time every 1 minute.
  useEffect(() => {
    const timer = setInterval(() => setClock(getTimeDate()), 60000);
    return () => clearInterval(timer);
  }, [clock]);

  return (
    <>
      <ClockContext.Provider value={{ clock }}>
        {children}
      </ClockContext.Provider>
    </>
  );
};

const useClock = () => useContext(ClockContext);
export { ClockProvider, useClock };
