import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";

const Button = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const handleClick = (evt) => {
    const { value } = evt.currentTarget;
    state.inputRef.current?.focus();
    console.log({ st: state.caretPosition });
    updateState((prevState) => ({
      ...prevState,
      currentValue: prevState.currentValue + value,
    }));
  };
  return (
    <>
      <div className="grid-box">
        <button className="btn" value={props.value} onClick={handleClick}>
          {props.value}
        </button>
      </div>
    </>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  extraClassName: PropTypes.string,
};
export default Button;
