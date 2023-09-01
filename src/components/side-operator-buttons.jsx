import BackspaceButton from "./backspace-button";
import Button from "./button";
import React from "react";

const buttonValues = [
  { icon: "add", value: "+" },
  { icon: "percent", value: "%" },
  { icon: "remove", value: "-" },
];
const SideOperatorButtons = (props) => {
  return (
    <>
      <BackspaceButton
          updateCursorPosition={props.updateCursorPosition}
            
          updateCursorIndicatorPosition={props.updateCursorIndicatorPosition}></BackspaceButton>

      {buttonValues.map((btnVal, index) => {
        return (
          <Button
            icon={btnVal?.icon}
            updateCursorPosition={props.updateCursorPosition}
            
            updateCursorIndicatorPosition={props.updateCursorIndicatorPosition}
            key={crypto.randomUUID() || index}
            value={btnVal.value}
          />
        );
      })}
    </>
  );
};
export default SideOperatorButtons;
