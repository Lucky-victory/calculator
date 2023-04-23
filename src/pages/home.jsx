import React, { useContext, useEffect, useRef, useState } from "react";
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

const HomePage = () => {
  const inputRef = useRef();
  const { state, updateState } = useContext(CalculatorContext);

  const [output, setOutput] = useState(0);
  useEffect(() => {
    const lastChar = state.currentValue[state.currentValue.length - 1];
    const valueToEvaluate = state.currentValue
      .replace(/x/g, "*")
      .replace(/÷/g, "/");
    if (valueToEvaluate === "") setOutput(0);
    if (
      isNaN(lastChar) ||
      (!isNaN(lastChar) && state.isOpenParen) ||
      valueToEvaluate === ""
    )
      return;
    const _output = math.evaluate(valueToEvaluate);
    updateOutput(_output);
    updateState((prevState) => ({ ...prevState, outputResult: output }));
  }, [state.currentValue]);

  const updateOutput = (result) => {
    let resultToDisplay = +result;
    // checks if the result is Infinity
    if (!isFinite(resultToDisplay)) return;
    // if the result exceeds 100 trillion
    if (resultToDisplay >= 1e14) {
      resultToDisplay = resultToDisplay.toExponential(2).replace("e+", "e");
      setOutput(resultToDisplay);
      return;
    }
    setOutput(resultToDisplay.toLocaleString("en-US"));
  };
  /**
   *
   * @param {string} numStr
   * @returns
   */
  function format(numStr) {
    /**
     * @type {Array<string>}
     */
    const parts = numStr?.split(/([^0-9]+)/); // Splits the string into numeric and non-numeric parts
    return parts
      .map((part) => {
        if (!isNaN(part) && part !== "") {
          return Number(part).toLocaleString(); // Formats the numeric part with commas
        }
        return part; // Returns the non-numeric part as is
      })
      .join("");
  }

  const handleInputFocus = (evt) => {
    const caretPosition = (evt && evt.selectionStart) || -1;
    updateState((prevState) => ({ ...prevState, caretPosition }));
  };
  return (
    <Page name="home">
      <div className="container">
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              id="input"
              className="input"
              readOnly
              ref={state.inputRef}
              onFocus={handleInputFocus}
              value={format(state.currentValue)}
            ></textarea>
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
              {/* <BracketButton></BracketButton> */}
              <Buttons></Buttons>
            </div>
          </div>
          <div className="operators-container">
            <SideOperatorButtons></SideOperatorButtons>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default HomePage;
