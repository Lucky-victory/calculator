import React, { useContext, useRef } from "react";
import { Icon } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import {
  useCheckIsOpenParen,
  useLongPress,
  useParenthesesChecker,
} from "../js/hooks";
import { Button as F7Button } from "framework7-react";

const BackspaceButton = () => {
  const { state, updateState } = useContext(CalculatorContext);
  const [isClosed, checkParentheses] = useParenthesesChecker(
    state.currentValue
  );

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
  useLongPress(buttonRef, handleLongPress);
  const handleClick = () => {
    /**
     * @type {string}
     */
    const currentValue = state.currentValue;
    // checkParentheses(currentValue);
    updateState((prevState) => ({
      ...prevState,
      isClosedParen: isClosed,
      currentValue: currentValue.slice(0, currentValue.length - 1),
    }));
  };

  return (
    <>
      <div className="grid-box backspace" ref={buttonRef}>
        <F7Button
          type="button"
          className={`btn btn-colored`}
          onClick={handleClick}
        >
          <Icon
            material="backspace_outlined"
            className="material-icons-outlined"
          />
        </F7Button>
      </div>
    </>
  );
};
export default BackspaceButton;
