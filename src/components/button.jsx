import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";
// import { restrictInvalidSyntax } from "../js/helpers";
import { Button as F7Button } from "framework7-react";
import { validateSyntax } from "../js/helpers";
import { useParenthesesChecker } from "../js/hooks";

const Button = function (props) {
  const { state, updateState } = useContext(CalculatorContext);
  const [isClosed ] = useParenthesesChecker(
    state.currentValue
  );

  const [btnValue, setBtnValue] = useState(props.value);

  const handleClick = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;
    // state.inputRef.current?.focus();
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
          className={`btn  ${isNaN(btnValue) ? "btn-colored" : ""}`}
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
