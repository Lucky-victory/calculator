import React, { useContext, useState } from "react";

import { CalculatorContext } from "../context/calculator";
import { Button as F7Button } from "framework7-react";
import {
  containsOperator,
  parenthesesChecker,
  validateSyntax,
} from "../js/helpers";

const Button = (props) => {
  const { state, updateState } = useContext(CalculatorContext);

  const [btnValue, setBtnValue] = useState(props.value);
  /**
   * @type {HTMLInputElement}
   */
  const handleClick = (evt) => {
      /**
     * @type {HTMLInputElement}
     */
        const input = state.inputRef.current;

          const cursorPosition = input?.selectionStart;
          props.updateCursorPosition(cursorPosition);
          // props.updateCursorIndicatorPosition();
        
    console.log({cursorPosition});
    /**
     * @type {HTMLButtonElement}
     */

    let target = evt.target;
    if (target.nodeName !== "BUTTON") target = target.parentElement;
    const { value } = target.dataset;

    setBtnValue(value);
    const newValue = state.currentValue.substring(0,cursorPosition) + value + state.currentValue.substring(cursorPosition);
    const { currentValue } = validateSyntax(newValue);
    const isClosed = parenthesesChecker(currentValue);
    updateState((prevState) => {
      return {
        ...prevState,cursorPosition,
        currentValue,
        canSave: false,
        isClosedParen: isClosed,
      };
    });
    input.setSelectionRange(cursorPosition+1,cursorPosition+1)
  };

  return (
    <>
      <div
        className={`grid-box ${
          containsOperator(btnValue) ? "btn-primary" : ""
        }`}
      >
        <F7Button
          type="button"
          iconMaterial={props?.icon}
          onClick={handleClick}
          className={`btn  ${props?.icon ? "material-icons-outlined" : ""}`}
          data-value={btnValue}
        >
          <span>

          {!props?.icon && btnValue}
          </span>
        </F7Button>
      </div>
    </>
  );
};

export default Button;
