import React from "react";
import Button from "./button";
import SideOperatorButtons from "./side-operator-buttons";
import ClearButton from "./clear-button";

const buttonValues = [
  
  "÷",
  "x",
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "%",
  "0",
  ".",
];
const Buttons = (props) => {
  return (
    <>
    <ClearButton></ClearButton>
      {buttonValues.map((val, index) => {
        return <Button key={crypto.randomUUID() || index} value={val} />;
      })}

    </>
  );
};

export default Buttons;
