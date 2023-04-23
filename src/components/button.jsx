import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";
import { restrictInvalidSyntax, useCheckIsOpenParen } from "../js/hooks";
import { Button as F7Button } from "framework7-react";

const Button = function (props) {
  const { state, updateState } = useContext(CalculatorContext);
  // const isOpenParen = useCheckIsOpenParen(state.currentValue);
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
    const { currentValue } = restrictInvalidSyntax(newValue);
    updateState((prevState) => {
      return {
        ...prevState,
        currentValue,
        // isOpenParen
      };
    });
    console.log({
      btnValue,
      currentValue,
    });
  };

  // useEffect(() => {}, [btnValue, currentValue])
  return (
    <>
      <div className="grid-box">
        <F7Button
          type="button"
          onClick={handleClick}
          className="btn"
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
  extraClassName: PropTypes.string,
};
export default Button;
