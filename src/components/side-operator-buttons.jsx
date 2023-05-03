import BackspaceButton from "./backspace-button";
import Button from "./button";
import React from "react";

const buttons = ["+", "-", "%"];
const SideOperatorButtons = (props) => {
  return (
    <>
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
    
    </>
  );
};
export default SideOperatorButtons;
