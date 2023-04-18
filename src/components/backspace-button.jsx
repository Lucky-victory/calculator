import React, { useContext, useState } from "react";
import { Icon } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { useCheckIsOpenParen } from "../js/hooks";
const BackspaceButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const [currentValue, setCurrentValue] = useState(state.currentValue);
  const isOpenBracket = useCheckIsOpenParen(currentValue);

  const handleClick = () => {
    const valuesToArray = state.currentValue.split("");

    console.log({ valuesToArray });
    valuesToArray.splice(state.caretPos - 1, 1);
    const updatedValue = valuesToArray.join("");
    updateState((prevState) => ({
      ...prevState,
      isOpenParen: isOpenBracket,
      currentValue,
    }));
    setCurrentValue(updatedValue);
  };
  return (
    <>
      <div className="grid-box ">
        <button className="btn" id="remove-last-btn" onClick={handleClick}>
          <Icon
            material="backspace_outlined"
            className="material-icons-outlined"
          />
        </button>
      </div>
    </>
  );
};
export default BackspaceButton;
