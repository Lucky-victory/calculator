import React, { useContext, useState } from "react";
import { Icon } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import { useCheckIsOpenParen } from "../js/hooks";
import { Button as F7Button } from "framework7-react";
const BackspaceButton = (props) => {
  const { state, updateState } = useContext(CalculatorContext);
  const isOpenBracket = useCheckIsOpenParen(state.currentValue);

  const handleClick = () => {
    const currentValue = state.currentValue;
    updateState((prevState) => ({
      ...prevState,
      isOpenParen: isOpenBracket,
      currentValue: currentValue.slice(0, currentValue.length - 1),
    }));
  };
  return (
    <>
      <div className="grid-box ">
        <F7Button className="btn" id="remove-last-btn" onClick={handleClick}>
          <Icon
            material="backspace_outlined"
            className="material-icons-outlined"
          />
        </F7Button>
      </div>
    </>
  );
};
export default BackspaceButton;
