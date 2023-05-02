import BackspaceButton from "./backspace-button";
import Button from "./button";
import React from "react";
import EqualButton from "./equal-button";
import ClearButton from "./clear-button";

const buttons = ["+", "-", "%"];
const SideOperatorButtons = (props) => {
  return (
    <>
      {/* <ClearButton></ClearButton> */}
      <BackspaceButton></BackspaceButton>

      {buttons.map((val, index) => {
        return (
          <Button
            updateCaretPosition={props.updateCaretPosition}
            value={val}
            key={crypto.randomUUID() || index}
          ></Button>
        );
      })}
      {/* <EqualButton></EqualButton> */}
    </>
  );
};
export default SideOperatorButtons;
