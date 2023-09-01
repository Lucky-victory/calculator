import React, { useContext, useRef,useEffect } from "react";
import { CalculatorContext } from "../context/calculator";
import { useLongPress } from "../js/hooks";
import { Button as F7Button } from "framework7-react";
import { parenthesesChecker } from "../js/helpers";
import { Dom7} from 'framework7'
const $$=Dom7;
const BackspaceButton = (props) => {
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
     * @type {HTMLInputElement}
     */
      const input = state.inputRef.current;

      const cursorPosition = input?.selectionStart || state.cursorPosition;
      props.updateCursorPosition(cursorPosition);
      props.updateCursorIndicatorPosition();
    

    /**
     * @type {string}
     */
    const currentValue = state.currentValue;
    if(cursorPosition > 0){

      const updatedValue = currentValue.substring(0, cursorPosition - 1) + currentValue.substring(cursorPosition);
      const isClosed = parenthesesChecker(updatedValue);
      updateState((prevState) => ({
        ...prevState,cursorPosition,
        isClosedParen: isClosed,
        canSave: false,
        currentValue: updatedValue, 
      }));
      input.setSelectionRange(cursorPosition - 1,cursorPosition -1)
    }
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
