import React, { useContext, useState } from "react";
import { Icon } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { useCheckIsOpenParen } from "../js/hooks";
const BackspaceButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const [currentValue, setCurrentValue] = useState(state.currentValue);
  const isOpenBracket = useCheckIsOpenParen(currentValue);

  const handleClick = ()=>{
    //const updatedValue = currentValue.slice(0, currentValue.length - 1) + currentValue.slice(currentValue.length);
    setCurrentValue((prev)=>prev.slice(0,prev.length -1)+prev.slice(prev.length))
    updateState((prevState) => ({
      ...prevState,
      isOpenParen: isOpenBracket,
      currentValue,
    }));
    
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
