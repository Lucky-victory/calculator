import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

const CalcInput = ({ fontSize, updateCursorIndicatorPosition, value, output }) => {
  const { state } = useContext(CalculatorContext);
const handleCursorIndicatorUpdate=()=>{
  console.log('input click');
  updateCursorIndicatorPosition()
}
  return (
    <div className="input-container">
      <div className="indicator" ref={state.cursorIndicatorRef}></div>
      <input
        id="input"
        className={`input ${state.canSave ? "hide" : ""}`}
        readOnly
        style={{ fontSize: `${fontSize}rem` }}
        ref={state.inputRef}
        onClick={()=>handleCursorIndicatorUpdate}
        onChange={()=>handleCursorIndicatorUpdate}
        value={value}
      />

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
