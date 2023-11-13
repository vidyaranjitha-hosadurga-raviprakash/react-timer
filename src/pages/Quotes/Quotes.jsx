import React from "react";

import { useQuotes } from "contexts/";
import "pages/Quotes/quotes.css";

export const Quotes = () => {
  const {
    quotes: { text, author },
  } = useQuotes();

  return (
    <div className="flex-centered-column quotes-wrapper">
      <div className="quotes-text">"{text}"</div>

      <div className="quotes-author">
        By {`${author?.length ? author.split(",")[0] : "Unknown"}`}
      </div>
    </div>
  );
};
