import BackspaceButton from "./backspace-button";
import Button from "./button";
import React, { useState, useContext } from "react";
import EqualButton from "./equal-button";
import ClearButton from "./clear-button";
import BracketButton from "./bracket-button";
import { Button as F7Button } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { validateSyntax } from "../js/helpers";
import { useParenthesesChecker } from "../js/hooks";

const TopOperatorButtons = () => {
  const buttons = ["!", "^", "(", ")"];
  const funcs = ["cos", "sin", "log", "in", "tan"];
  const { state, updateState } = useContext(CalculatorContext);
  // const isOpenParen = useCheckIsOpenParen(state.currentValue);
  const [isClosed] = useParenthesesChecker(
    state.currentValue
  );

  const handleClick = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;

    const newValue = state.currentValue + value;
    const { currentValue } = validateSyntax(newValue);
    // checkParentheses(currentValue)
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
      {/*<ClearButton></ClearButton>*/}

      {/* <BracketButton></BracketButton> */}
      {buttons.map((val, index) => {
        return (
          <F7Button
            type="button"
            className="top-btns"
            onClick={handleClick}
            data-value={funcs.includes(val) ? val + "(" : val}
            key={crypto.randomUUID() || index}
          >
            {val}
          </F7Button>
        );
      })}
    </>
  );
};
export default TopOperatorButtons;
