import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

import { apiUrls } from "data/Constants";
import { generateRandomNumber } from "utils/commonOperations";

const QuotesContext = createContext();

const quotesInitialState = {
  text: "Everything happens for a cause",
  author: "",
};

const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState(quotesInitialState);

  const fetchQuotes = async () => {
    const random = generateRandomNumber();

    await axios
      .get(apiUrls.QUOTES)
      .then(({ data }) => {
        const { text, author } = data[random];
        setQuotes({ text, author }); // ES6 notation
      })
      .catch((err) => console.log("Error while fetching quotes. Error =", err));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <QuotesContext.Provider value={{ quotes }}>
      {children}
    </QuotesContext.Provider>
  );
};

const useQuotes = () => useContext(QuotesContext);
export { QuotesProvider, useQuotes };
