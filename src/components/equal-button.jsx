import React from "react";
import { Button as F7Button } from "framework7-react";

const EqualButton = (props) => {
  const handleClick = () => {};
  return (
    <>
      <div className="grid-box equal-btn-box ">
        <F7Button type="button" className="btn equal-btn" onClick={handleClick}>
          =
        </F7Button>
      </div>
    </>
  );
};

export default EqualButton;
