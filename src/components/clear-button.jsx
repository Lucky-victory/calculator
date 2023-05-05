import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";
import { Button as F7Button } from "framework7-react";

const ClearButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);

  const handleClick = () => {
    updateState((prevState) => ({
      ...prevState,
      currentValue: "",
      isClosedParen: true,
      canSave: false,
    }));
  };
  return (
    <div className="grid-box btn-primary">
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
