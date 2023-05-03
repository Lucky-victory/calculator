import React, { useContext } from "react";
import { Button as F7Button } from "framework7-react";
import { Storage } from '@capacitor/storage'
import { CalculatorContext } from "../context/calculator";

import { v4 as uuidv4 } from 'uuid'
import { operators } from "../js/helpers";
const EqualButton = (props) => {
const {state, updateState}=useContext(CalculatorContext);

const saveData=async(key=uuidv4())=>{
  const value=JSON.stringify({date:Date.now(),value:state.currentValue});
  await Storage.set({
    key,value
})
}
const handleClick = async () => {
  // This checks if the expression contains an operator, if not, then don't save the expression
  const containsOperator = operators.some((val) => state.currentValue.includes(val));
  updateState((prevState) => ({ ...prevState, canSave: containsOperator }));
  if (state.currentValue === "" || !containsOperator) return;
  saveData();
};
  return (
    <>
      <div className="grid-box equal-btn-box ">
        <F7Button type="button" className="btn equal-btn" onClick={handleClick}>
          =
        </F7Button>
      </div>
    </>
  );
};

export default EqualButton;
