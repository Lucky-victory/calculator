import React from "react";
import Button from "./button";

const buttonValues = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "0",
  ".",
  "+",
  "-",
];
const Buttons = (props) => {
  return (
    <>
      {buttonValues.map((val, index) => {
        return <Button key={crypto.randomUUID() || index} value={val} />;
      })}
    </>
  );
};

export default Buttons;
