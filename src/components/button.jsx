import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";
import { useCheckIsOpenParen } from "../js/hooks";
import { Button as F7Button } from "framework7-react";

const Button = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const isOpenParen = useCheckIsOpenParen(state.currentValue);
  const handleClick = (evt) => {
    console.log({ evt });
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;
    state.inputRef.current?.focus();
    console.log({ st: state.caretPosition });
    const newValue = state.currentValue + value;
    updateState((prevState) => ({
      ...prevState,
      currentValue: newValue,
      isOpenParen,
    }));
  };
  return (
    <>
      <div className="grid-box">
        <F7Button
          type="button"
          onClick={handleClick}
          className="btn"
          data-value={props.value}
        >
          {props.value}
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
