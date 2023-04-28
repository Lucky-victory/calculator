import React from "react";
import Button from "./button";
import SideOperatorButtons from "./side-operator-buttons";
import ClearButton from "./clear-button";
import EqualButton from "./equal-button";

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
  "0",
  ".",
];

const buttons = ["+", "-", "^"];
const Buttons = (props) => {
  return (
    <>
    <ClearButton></ClearButton>
      {buttonValues.map((val, index) => {
        return <Button key={crypto.randomUUID() || index} value={val} />;
      })}
      {buttons.map((val, index) => {
        return <Button key={crypto.randomUUID() || index} value={val} />;
      })}
<EqualButton></EqualButton>
    </>
  );
};

export default Buttons;
