import React, { useEffect, useRef, useState } from "react";
import { Page } from "framework7-react";

import BracketButton from "../components/bracket-button";
import { CalculatorContext } from "../context/calculator";
import Buttons from "../components/buttons";
import BackspaceButton from "../components/backspace-button";
import ClearButton from "../components/clear-button";
import {
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  expDependencies,
  sqrtDependencies,
  cosDependencies,
  sinDependencies,
  create,
  evaluateDependencies,
  all,
} from "mathjs";
import SideOperatorButtons from "../components/side-operator-buttons";
import TopOperatorButtons from "../components/top-operator-buttons";
// [
//     addDependencies,
//     subtractDependencies,
//     multiplyDependencies,
//     divideDependencies,
//     cosDependencies,
//     sinDependencies,
//     expDependencies,
//     sqrtDependencies,
//     evaluateDependencies,
//   ],
const math = create(all, { matrix: false });
function customSqrt(x) {
  return Math.sqrt(x);
}
math.import(
  {
    mod: function (x, y) {
      return x * (y / 100);
    },
    "%": function (x, y) {
      return x * (y / 100);
    },
  },
  { override: true }
);

console.log({ math });
const HomePage = () => {
  const inputRef = useRef();
  const [state, setState] = useState({
    caretPosition: 0,
    outputResult: 0,
    currentValue: "",
    isOpenParen: true,
    inputRef,
  });
  const [output, setOutput] = useState(0);
  const updateState = (state) => {
    setState(state);
  };
  useEffect(() => {
    console.log({ val: state.currentValue });
    let output = 0;
    const lastChar = state.currentValue[state.currentValue.length - 1];
    const valueToEvaluate = state.currentValue
      .replace(/x/g, "*")
      .replace(/÷/g, "/");
    if (valueToEvaluate === "") setOutput(0);
    if (isNaN(lastChar) || state.isOpenParen || valueToEvaluate === "") return;
    output = math.evaluate(valueToEvaluate);
    updateOutput(output);
    updateState((prevState) => ({ ...prevState, outputResult: output }));
  }, [state.currentValue]);

  const updateOutput = (result) => {
    if (isNaN(result)) return;
    let resultToDisplay = +result;
    if (resultToDisplay >= 1e14) {
      resultToDisplay = resultToDisplay.toExponential(2).replace("e+", "e");
      setOutput(resultToDisplay);
      return;
    }
    setOutput(resultToDisplay.toLocaleString("en-US"));
  };
  function format(numStr) {
    const parts = numStr.split(/(\D+)/); // Splits the string into numeric and non-numeric parts
    return parts.map(part => {
  if (!isNaN(part)) { // Checks if the part is numeric
    return Number(part).toLocaleString(); // Formats the numeric part with commas
  }
  return part; // Returns the non-numeric part as is
}).join('');
  
}

  const handleInputFocus = (evt) => {
    const caretPosition = (evt && evt.selectionStart) || -1;
    updateState((prevState) => ({ ...prevState, caretPosition }));
  };
  return (
    <CalculatorContext.Provider value={{ state, updateState }}>
      <Page name="home">
        <div className="container">
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={format(state.currentValue)}
                id="input"
                className="input"
                readOnly
                ref={inputRef}
                onFocus={handleInputFocus}
              />
              <span className="indicator"></span>
            </div>
            <output className="output" htmlFor="input">
              {output}
            </output>
          </div>

          <div className="flex wrapper">
            <div className="flex-col">
              {/*<div className="top-operators-container">
              <TopOperatorButtons></TopOperatorButtons>
            </div>
*/}
              <div className="grid">
                <BracketButton></BracketButton>
                <Buttons></Buttons>
              </div>
            </div>
            <div className="operators-container">
              <SideOperatorButtons></SideOperatorButtons>
            </div>
          </div>
        </div>
      </Page>
    </CalculatorContext.Provider>
  );
};
export default HomePage;
