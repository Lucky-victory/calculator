import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";
import { Button as F7Button } from "framework7-react";
import { useParenthesesChecker } from "../js/hooks";
const ClearButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
//  const [isClosed,checkParentheses] = useParenthesesChecker();

  const handleClick = () => {
    updateState((prevState) => ({ ...prevState, currentValue: "",isClosedParen:true }));
  };
  return (
    <div className="grid-box">
      <F7Button
        type="button"
        className={`btn btn-colored`}
        onClick={handleClick}
      >
        C
      </F7Button>
    </div>
  );
};
export default ClearButton;
