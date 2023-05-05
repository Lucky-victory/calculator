import React from "react";
import Button from "./button";

import ClearButton from "./clear-button";
import EqualButton from "./equal-button";

const buttonValues = [
  { icon: null, value: "÷" },
  { icon: "close", value: "x" },
  { icon: null, value: "7" },
  { icon: null, value: "8" },
  { icon: null, value: "9" },
  { icon: null, value: "4" },
  { icon: null, value: "5" },
  { icon: null, value: "6" },
  { icon: null, value: "1" },
  { icon: null, value: "2" },
  { icon: null, value: "3" },
  { icon: null, value: "0" },
  { icon: null, value: "." },
];

const Buttons = (props) => {
  return (
    <>
      <ClearButton></ClearButton>
      {buttonValues.map((btnVal, index) => {
        return (
          <Button
            icon={btnVal?.icon}
            updateCaretPosition={props.updateCaretPosition}
            key={crypto.randomUUID() || index}
            value={btnVal.value}
          />
        );
      })}
      <EqualButton></EqualButton>
    </>
  );
};

export default Buttons;
