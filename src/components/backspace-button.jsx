import React, { useContext, useRef } from "react";
import { CalculatorContext } from "../context/calculator";
import {
  useLongPress,
  useParenthesesChecker,
} from "../js/hooks";
import { Button as F7Button } from "framework7-react";

const BackspaceButton = () => {
  const { state, updateState } = useContext(CalculatorContext);
  
  const buttonRef = useRef(null);
    const funcs = ["cos(", "sin(", "log(", "in(", "tan("];
    const handleLongPress = () => {
      console.log("long press");
    updateState((prevState) => ({
      ...prevState,
      isClosedParen: true,
      currentValue: "",
    }));
  };
  const [isClosed] = useParenthesesChecker(
    state.currentValue
    );
  useLongPress(buttonRef, handleLongPress);
  const handleClick = () => {
    /**
     * @type {string}
     */
    const currentValue = state.currentValue;

    updateState((prevState) => ({
      ...prevState,
      isClosedParen: isClosed,
      currentValue: currentValue.slice(0, currentValue.length - 1),
    }));
  };

  return (
    <>
      <div className="grid-box" ref={buttonRef}>
        <F7Button
          type="button"
          className={`btn material-icons-outlined`}
          onClick={handleClick}
          iconMaterial="backspace_outlined"
        >
      
        </F7Button>
      </div>
    </>
  );
};
export default BackspaceButton;
