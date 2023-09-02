import React, { useContext } from "react";
import { Button as F7Button } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { parenthesesChecker, validateSyntax } from "../js/helpers";

const TopOperatorButtons = () => {
  const buttons = ["!", "^", "(", ")"];
  const { state, updateState } = useContext(CalculatorContext);

  const handleClick = (evt) => {
    /**
     * @type {HTMLButtonElement}
     */
    const target = evt.target;
    const { value } = target.dataset;

    const newValue = state.currentValue + value;
    const { currentValue } = validateSyntax(newValue);

    const isClosed = parenthesesChecker(currentValue);
    updateState((prevState) => {
      return {
        ...prevState,
        currentValue,
        isClosedParen: isClosed,
        canSave: false,
      };
    });
    console.log({
      currentValue,
    });
  };
  return (
    <>
      {buttons.map((val, index) => {
        return (
          <F7Button
            type="button"
            className="top-ops-btn"
            onClick={handleClick}
            data-value={val}
            key={'top-btn'+index}
          >
            {val}
          </F7Button>
        );
      })}
    </>
  );
};
export default TopOperatorButtons;
