import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

const CalcInput = ({ fontSize, updateCursorIndicatorPosition, value, output }) => {
  const { state } = useContext(CalculatorContext);
  let count=0
const handleCursorIndicatorUpdate=()=>{
  console.log('CLICK:input ',count++);
  updateCursorIndicatorPosition()
}
  return (
    <div className="input-container">
<div className="input-wrap">

      <div className="indicator" ref={state.cursorIndicatorRef}></div>
      <input
        id="input"
        className={`input ${state.canSave ? "hide" : ""}`}
        readOnly
        style={{ fontSize: `${fontSize}rem` }}
        ref={state.inputRef}
        onClick={()=>handleCursorIndicatorUpdate()}
        // onChange={()=>handleCursorIndicatorUpdate()}
        value={value}
        />
        </div>

      <output
        className={`output ${output == 0 ? "hide" : ""} ${
          state.canSave ? "large" : ""
        }`}
        htmlFor="input"
      >
        {output}
      </output>
    </div>
  );
};

export default CalcInput;
