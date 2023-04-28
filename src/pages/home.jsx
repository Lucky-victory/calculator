import React, { useContext, useEffect, useRef, useState } from "react";
import { Page } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import Buttons from "../components/buttons";
import BackspaceButton from "../components/backspace-button";
import ClearButton from "../components/clear-button";

import { Button as F7Button, Icon } from "framework7-react";
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
  factorialDependencies,
  tanDependencies,
  indexDependencies,
  evaluateDependencies,
} from "mathjs";
import SideOperatorButtons from "../components/side-operator-buttons";
import TopOperatorButtons from "../components/top-operator-buttons";
import CalcInput from "../components/input";
import { isFactorial } from "../js/helpers";
const mathjsDeps = [
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  cosDependencies,
  sinDependencies,
  tanDependencies,
  indexDependencies,
  expDependencies,
  sqrtDependencies,
  evaluateDependencies,
  factorialDependencies,
];
const math = create(mathjsDeps, { matrix: false });

math.import(
  {
    mod: function (x, y) {
      return x * (y / 100);
    },
    "%": function (x, y) {
      return x * r(y / 100);
    },
  },
  { override: true }
);

const HomePage = () => {
  const { state, updateState } = useContext(CalculatorContext);
  const [inputFontSize, setInputFontSize] = useState(6);
  const [output, setOutput] = useState(0);
  useEffect(() => {
    const lastChar = state.currentValue[state.currentValue.length - 1];
    /**
     * @type {string}
     */
    const valueToEvaluate = state.currentValue
      .replace(/x/g, "*")
      .replace(/÷/g, "/");
    if (valueToEvaluate === "") setOutput(0);
    if (
      (!isFactorial(valueToEvaluate) && isNaN(lastChar)) ||
      (!isNaN(lastChar) && !state.isClosedParen)
    )
      return;
    const valLen = valueToEvaluate.length;
    switch (true) {
      case valLen >= 8 && valLen < 11:
        setInputFontSize(4.5);
        break;
      case valLen >= 11:
        setInputFontSize(3.5);
        break;

      default:
        setInputFontSize(6);
        break;
    }
    const _output = math.evaluate(valueToEvaluate);
    updateOutput(_output);
    updateState((prevState) => ({ ...prevState, outputResult: output }));
  }, [state.currentValue]);

  const updateOutput = (result) => {
    let resultToDisplay = +result;
    // checks if the result is Infinity
    if (!isFinite(resultToDisplay)) return;
    // if the result exceeds 100 trillion
    if (Math.abs(resultToDisplay) >= 1e14) {
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
      <main className="main-container">
        <div className="calculator-container">
          <CalcInput
            value={format(state.currentValue)}
            output={output}
            handleInputFocus={handleInputFocus}
            fontSize={inputFontSize}
          />
          <div className="btns-container">
            {/*  <div className="flex">
              <div className="top-operators-container">
                <TopOperatorButtons></TopOperatorButtons>
              </div>
              <F7Button
                type="button"
                iconMaterial="expand_less"
                className="material-icons-outlined top-btns-toggle"
              ></F7Button>
            </div>
  */}
            <div className="wrapper">
              <div className="grid">
                {/* <BracketButton></BracketButton> */}
                <Buttons></Buttons>
              </div>
              {/*<div className="operators-container">
                <SideOperatorButtons></SideOperatorButtons>
              </div>*/}
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};
export default HomePage;
/**
 * 
 * 
 * 
        <div className="flex wrapper">
          <div className="flex-col">
            </div>
            </div>
 */
