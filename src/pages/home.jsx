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
  evaluateDependencies,ParenthesisNodeDependencies,
} from "mathjs";
import SideOperatorButtons from "../components/side-operator-buttons";
import TopOperatorButtons from "../components/top-operator-buttons";
import CalcInput from "../components/input";
import { isFactorial, format, operators } from "../js/helpers";
const mathjsDeps = [
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  expDependencies,
  sqrtDependencies,
  evaluateDependencies,
  factorialDependencies,ParenthesisNodeDependencies
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
    try{
      
    // This checks if the user has clicked any operator, if not, then don't render any result
    const containsOperator = operators.some((val) =>
      currentValue.includes(val)
      );

    if (valueToEvaluate === "" || !containsOperator) {
      setOutput(0);
      return;
    }
    if(state.isClosedParen){
      const _output = math.evaluate(valueToEvaluate);
      updateOutput(_output);
      updateState((prevState) => ({ ...prevState, outputResult: output }));
    }
    if (
      (!isFactorial(valueToEvaluate) && isNaN(lastChar)) ||
      (!isNaN(lastChar) && !state.isClosedParen)
      ){
        return;
      }
      autoScrollInput();
    

      const _output = math.evaluate(valueToEvaluate);
      updateOutput(_output);
      updateState((prevState) => ({ ...prevState, outputResult: output }));
    }
    catch(err){
if(err)console.log('Invalid syntax');
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

  const updateCaretPosition = () => {
    /**
     * @type {HTMLInputElement}
     */
    const target = state.inputRef.current;
    if (!target) return;
    const caretPosition = target?.selectionStart || -1;
    updateState((prevState) => ({ ...prevState, caretPosition }));
  };
  return (
    <Page name="home">
      <main className="main-container">
        <div className="calculator-container">
          <CalcInput
            value={format(state.currentValue)}
            output={output}
            updateCaretPosition={updateCaretPosition}
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
                {/* <BracketButton></BracketButton> */}
                <Buttons updateCaretPosition={updateCaretPosition}></Buttons>
                <div className="operators-container">
                  <SideOperatorButtons
                    updateCaretPosition={updateCaretPosition}
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
