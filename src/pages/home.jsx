import React, { useContext, useEffect, useRef, useState } from "react";
import { Page, Button as F7Button } from "framework7-react";
import { CalculatorContext } from "../context/calculator";
import Buttons from "../components/buttons";
import {
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  expDependencies,
  sqrtDependencies,
  create,
  factorialDependencies,
  evaluateDependencies,
  ParenthesisNodeDependencies,
} from "mathjs";
import SideOperatorButtons from "../components/side-operator-buttons";
import TopOperatorButtons from "../components/top-operator-buttons";
import CalcInput from "../components/input";
import { isFactorial, format, containsOperator } from "../js/helpers";
const mathjsDeps = [
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  expDependencies,
  sqrtDependencies,
  evaluateDependencies,
  factorialDependencies,
  ParenthesisNodeDependencies,
];
const math = create(mathjsDeps, { matrix: false });

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
  const { state, updateState } = useContext(CalculatorContext);
  const [inputFontSize, setInputFontSize] = useState(6);
  const [output, setOutput] = useState(0);

  /**
   * @type {HTMLInputElement}
   */
  const inputElem = state.inputRef.current;
  const autoScrollInput = () => {
    if (inputElem) {
      const { scrollWidth, clientWidth } = inputElem;
      if (scrollWidth > clientWidth) {
        inputElem.scrollLeft = scrollWidth - clientWidth;
      }
    }
  };
  useEffect(() => {
    /**
     * @type {string}
     */
    const currentValue = state.currentValue;
    const lastChar = currentValue[currentValue.length - 1];

    const valueToEvaluate = currentValue.replace(/x/g, "*").replace(/÷/g, "/");

    const valLen = valueToEvaluate.length;
    switch (true) {
      case valLen >= 8 && valLen < 11:
        setInputFontSize(4.5);
        break;
      case valLen >= 11:
        setInputFontSize(3.5);
        break;

      default:
        setInputFontSize(5);
        break;
    }
    try {
      // console.log({ isClosed: state.isClosedParen });
      autoScrollInput();
      if (valueToEvaluate === "" || !containsOperator(currentValue)) {
        setOutput(0);
        return;
      }
      if (
        !isFactorial(valueToEvaluate) &&
        isNaN(lastChar) &&
        !state.isClosedParen
      ) {
        return;
      }

      const _output = math.evaluate(valueToEvaluate);
      updateOutput(_output);
      updateState((prevState) => ({ ...prevState, outputResult: output }));
    } catch (err) {
      if (err) console.log("Invalid syntax");
    }
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

  const updateCursorIndicatorPosition = () => {
  /**
     * @type {HTMLInputElement}
     */
  const input = state.inputRef.current;
  const cursorIndicator= state.cursorIndicatorRef.current;

  const cursorPosition = state.cursorPosition;
  const cursorPosition2 = input.selectionStart;

  const rect=input.getBoundingClientRect()
  const right=rect.left + (+cursorPosition2) * 10
  console.log({rect,right,cursorPosition,cursorPosition2});

  cursorIndicator.style.left=`${right}px`

  };
  const updateCursorPosition = (pos=null) => {

    updateState((prevState) => ({ ...prevState, cursorPosition:pos }));
  };
  return (
    <Page name="home">
      <main className="main-container">
        <div className="calculator-container">
          <CalcInput
            value={format(state.currentValue)}
            output={output}
            updateCursorPosition={updateCursorPosition}
            updateCursorIndicatorPosition={updateCursorIndicatorPosition}
            fontSize={inputFontSize}
          />
          <div className="btns-container">
            <div className="flex flex-1">
              <div className="top-operators-container">
                <TopOperatorButtons></TopOperatorButtons>
              </div>
              {/* <F7Button
                type="button"
                iconMaterial="expand_less"
                className="material-icons-outlined top-btns-toggle"
              ></F7Button> */}
            </div>

            <div className="grid">
              <Buttons updateCursorPosition={updateCursorPosition} 
            updateCursorIndicatorPosition={updateCursorIndicatorPosition}></Buttons>
              <div className="operators-container">
                <SideOperatorButtons
                  updateCursorPosition={updateCursorPosition} 
                  updateCursorIndicatorPosition={updateCursorIndicatorPosition}
                ></SideOperatorButtons>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};
export default HomePage;
