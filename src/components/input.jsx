import React, { useContext } from "react";
import { CalculatorContext } from "../context/calculator";

import PropTypes from "prop-types";

const CalcInput = ({ fontSize, handleInputFocus, value, output }) => {
  const { state } = useContext(CalculatorContext);
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          id="input"
          className="input"
          readOnly
          style={{ fontSize: `${fontSize}rem` }}
          ref={state.inputRef}
          onFocus={handleInputFocus}
          value={value}
        />
        <span className="indicator"></span>
      </div>
      <output className={`output ${output == 0 ? "hide":""}`} htmlFor="input">
        { output}
      </output>
    </div>
  );
};

CalcInput.propTypes = {
  fontSize: PropTypes.number,
  value: PropTypes.string.isRequired,
  handleInputFocus: PropTypes.func,
  output: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default CalcInput;
