import React, { useContext, useEffect } from "react";
import { CalculatorContext } from "../context/calculator";

import PropTypes from "prop-types";

const CalcInput = ({ fontSize, updateCaretPosition, value, output }) => {
  const { state,updateState } = useContext(CalculatorContext);

  const removeCursor=()=>{
  /**
   * @type {HTMLTextAreaElement}
  */
  const textarea = state.inputRef.current;

    
    const span=textarea.querySelector('span');
    span.remove()
console.log('cursor removed');
  }

  const insertCursor=()=>{
    /**
     * @type {HTMLTextAreaElement}
     */
    const textarea = state.inputRef.current;

    // Get the current value of the textarea
    const textareaValue = textarea.value;

    let span = document.createElement("span");
    span.classList.add("blinking-cursor");
    let text = document.createTextNode("|");
    span.appendChild(text);
    textarea.appendChild(span);
  }

  useEffect(()=>{

    insertCursor()

  
  },[state.currentValue])
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <textarea
          cols="30"
          rows="1"
          id="input"
          className="input"
          readOnly
          style={{ fontSize: `${fontSize}rem` }}
          ref={state.inputRef}
          onFocus={updateCaretPosition}
        
        ></textarea>
        {/* <span className="indicator"></span> */}
      </div>
      <output className={`output ${output == 0 ? "hide" : ""}`} htmlFor="input">
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
