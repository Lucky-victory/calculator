import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

const CalcInput = ({ fontSize, updateCaretPosition, value, output }) => {
  const { state } = useContext(CalculatorContext);

  return (
    <div className="input-container">
      <input
        id="input"
        className={`input ${state.canSave ? "hide" : ""}`}
        readOnly
        style={{ fontSize: `${fontSize}rem` }}
        ref={state.inputRef}
        onFocus={updateCaretPosition}
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
