import React, { useContext, useRef,useEffect } from "react";
import { CalculatorContext } from "../context/calculator";
import { useLongPress } from "../js/hooks";
import { Button as F7Button } from "framework7-react";
import { parenthesesChecker } from "../js/helpers";
import { Dom7} from 'framework7'
const $$=Dom7;
const BackspaceButton = () => {
  const { state, updateState } = useContext(CalculatorContext);

  const buttonRef = useRef(null);
  const funcs = ["cos(", "sin(", "log(", "in(", "tan("];
  const handleLongPress = () => {
    
    updateState((prevState) => ({
      ...prevState,
      isClosedParen: true,
      currentValue: "",
      canSave: false,
    }));
  };
const selector='#backspace-btn'
  useLongPress(selector, handleLongPress);

  const handleClick = () => {
    /**
     * @type {string}
     */
    const currentValue = state.currentValue;
    const updatedValue = currentValue.slice(0, currentValue.length - 1);
    const isClosed = parenthesesChecker(updatedValue);
    updateState((prevState) => ({
      ...prevState,
      isClosedParen: isClosed,
      canSave: false,
      currentValue: updatedValue, 
    }));
  };

  return (
    <>
      <div className="grid-box btn-primary" >
        <F7Button
          type="button" id={'backspace-btn'}
          className={`btn material-icons-outlined backspace-btn`}
          onClick={handleClick}
          iconMaterial="backspace_outlined"
        ></F7Button>
      </div>
    </>
  );
};
export default BackspaceButton;
