import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { CalculatorContext } from "../context/calculator";

import { Button as F7Button } from "framework7-react";
import { useCheckIsOpenParen } from "../js/hooks";

const BracketButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const isOpenParen = useCheckIsOpenParen(state.currentValue);
  const clickHandler = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const btn = evt.target;

    if (isOpenParen) {
      btn.dataset["value"] = ")";
    } else {
      btn.dataset["value"] = "(";
    }
    const { value } = btn.dataset;
    const newValue = state.currentValue + value;
    updateState((prevState) => ({
      ...prevState,
      isOpenParen,
      currentValue: newValue,
    }));
  };

  return (
    <>
      <div className="grid-box">
        <F7Button className="btn" data-value="(" onClick={clickHandler}>
          ( )
        </F7Button>
      </div>
    </>
  );
};

export default BracketButton;
