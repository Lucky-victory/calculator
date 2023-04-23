import React, { useContext, useEffect, useState } from "react";
import PropTypes, { func } from "prop-types";
import { CalculatorContext } from "../context/calculator";
import { useCheckIsOpenParen, useRestrictInvalidSyntax } from "../js/hooks";
import { Button as F7Button } from "framework7-react";

const Button = function (props) {
  const { state, updateState } = useContext(CalculatorContext);
  // const isOpenParen = useCheckIsOpenParen(state.currentValue);
  const [btnValue, setBtnValue] = useState(props.value);
  const [v, setV] = useState(state.currentValue);
  const { currentValue, setCurrent } = useRestrictInvalidSyntax(
    btnValue,
    state.currentValue
  );

  const handleClick = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;
    // state.inputRef.current?.focus();
    setBtnValue(value);
    setV((prev) => prev + btnValue);
    setCurrent(v);
    updateState((prevState) => ({
      ...prevState,
      currentValue: currentValue,
      // isOpenParen
    }));
    console.log({
      value,
      btnValue,
      v,
      cur: currentValue,
      ur: currentValue,
    });
  };

  useEffect(() => {}, [btnValue, currentValue]);
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
