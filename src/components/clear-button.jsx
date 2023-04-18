import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

const ClearButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const handleClick = () => {
    updateState((prevState) => ({ ...prevState, currentValue: "" }));
  };
  return (
    <div className="grid-box">
      <button className="btn" onClick={handleClick}>
        C
      </button>
    </div>
  );
};
export default ClearButton;
