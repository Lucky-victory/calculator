import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";

import { useCheckIsOpenParen } from "../js/hooks";

const BracketButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const isOpenParen = useCheckIsOpenParen(state.currentValue);
  const clickHandler = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const btn = evt.currentTarget;

    if (isOpenParen) {
      btn.value = ")";
    } else {
      btn.value = "(";
    }
    const { value } = btn;
    updateState((prevState) => ({
      ...prevState,
      isOpenParen,
      currentValue: prevState.currentValue + value,
    }));
  };

  return (
    <>
      <div className="grid-box">
        <button className="btn" value="(" onClick={clickHandler}>
          ( )
        </button>
      </div>
    </>
  );
};

export default BracketButton;
