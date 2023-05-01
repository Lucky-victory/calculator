import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";
import { Button as F7Button } from "framework7-react";
import { validateSyntax } from "../js/helpers";
import { useParenthesesChecker } from "../js/hooks";

const Button = function (props) {
  const { state, updateState } = useContext(CalculatorContext);
  const [isClosed ] = useParenthesesChecker(
    state.currentValue
  );

  const [btnValue, setBtnValue] = useState(props.value);
/**
 * @type {HTMLInputElement}
 */
const handleClick = (evt) => {
    const inputElem=state.inputRef.current;
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;
    inputElem?.focus();
    
    setBtnValue(value);
    const newValue = state.currentValue + value;
    const { currentValue } = validateSyntax(newValue);
    updateState((prevState) => {
      return {
        ...prevState,
        currentValue,
        isClosedParen: isClosed,
      };
    });
    console.log({
      currentValue,
    });
  };

  return (
    <>
      <div className={`grid-box`}>
        <F7Button
          type="button"
          onClick={handleClick}
          className={`btn`}
          data-value={btnValue}
        >
          {btnValue}
        </F7Button>
      </div>
    </>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
};
export default Button;
