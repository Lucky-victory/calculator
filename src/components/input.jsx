import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

import PropTypes from "prop-types";

const CalcInput = ({ fontSize, updateCaretPosition, value, output }) => {
  const { state } = useContext(CalculatorContext);

  return (
    <div className="input-container">
      
        <textarea
        rows={1}
          id="input"
          className={`input ${state.canSave?'hide':''}`}
          readOnly
          style={{ fontSize: `${fontSize}rem` }}
          ref={state.inputRef}
          onFocus={updateCaretPosition}
          value={value}
        ></textarea>
      
      <output className={`output ${output == 0 ? "hide" : ""} ${state.canSave?'large':''}`} htmlFor="input">
        {output}
      </output>
    </div>
  );
};

CalcInput.propTypes = {
  fontSize: PropTypes.number,
  value: PropTypes.string.isRequired,
  updateCaretPosition: PropTypes.func,
  output: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default CalcInput;
