
import React, {  useContext } from "react";
import { Button as F7Button } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { validateSyntax } from "../js/helpers";
import { useParenthesesChecker } from "../js/hooks";

const TopOperatorButtons = () => {
  const buttons = ["!", "^", "(", ")"];
  const { state, updateState } = useContext(CalculatorContext);
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
