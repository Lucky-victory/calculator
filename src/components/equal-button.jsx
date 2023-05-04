import React, { useContext } from "react";
import { Button as F7Button } from "framework7-react";
import { Preferences } from '@capacitor/preferences'
import { CalculatorContext } from "../context/calculator";

import { v4 as uuidv4 } from 'uuid'
import { containsOperator } from "../js/helpers";
const EqualButton = (props) => {
const {state, updateState}=useContext(CalculatorContext);

const saveData=async(key=uuidv4())=>{
  const value=JSON.stringify({date:Date.now(),value:state.currentValue});
  await Preferences.set({
    key,value
})
}
const handleClick = async () => {
  
  const containsOp = containsOperator( state.currentValue);
  updateState((prevState) => ({ ...prevState, canSave: containsOp }));
  if (state.currentValue === "" || !containsOp) return;
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
