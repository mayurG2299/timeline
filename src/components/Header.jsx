import React, { useCallback } from "react";
import "./Header.css";
import DateFilterButton from "./DateFilterButton";

function Header({ onChangeTweets }) {
  const getFilteredData = useCallback(
    (data) => {
      onChangeTweets(data);
    },
    [onChangeTweets]
  );
  return (
    <div className="appHeader">
      <h2 className="appHeaderTitle">Mayur Ghadi</h2>
      <DateFilterButton onFilter={getFilteredData} />
    </div>
  );
}

export default Header;
