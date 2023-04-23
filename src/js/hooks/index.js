import { useState, useEffect } from "react";

const operators = ["x", "%", "+", "-", "÷", "^", "√", "."];
/**
 *
 * @param {string} currentValue
 * @returns
 */
export function useCheckIsOpenParen(currentValue) {
  const [openBrackets, setOpenBrackets] = useState([]);

  useEffect(() => {
    let idxOfCloseParen = currentValue.lastIndexOf(")");
    let idxOfOpenParen = currentValue.lastIndexOf("(");
    const lastChar = currentValue[currentValue.length - 1];

    if (
      idxOfOpenParen !== -1 &&
      idxOfCloseParen < idxOfOpenParen &&
      lastChar !== "("
    ) {
      setOpenBrackets((prev) => [...prev, "("]);
    } else if (
      idxOfCloseParen !== -1 &&
      idxOfOpenParen < idxOfCloseParen &&
      openBrackets.length
    ) {
      setOpenBrackets((prev) => prev.slice(0, prev.length - 1));
    }
  }, [currentValue]);

  return openBrackets.length > 0;
}
/**
 *
 * @param {string} inputValue
 * @returns
 */
export function preventDoubleOperator(inputValue) {
  const { prevChar, currentChar } = getCurrentAndPrevChar(inputValue);
  let operatorStatus;

  if (
    operators.includes(prevChar) &&
    operators.includes(currentChar) &&
    prevChar !== currentChar
  ) {
    operatorStatus = "similar";
  } else if (
    operators.includes(prevChar) &&
    operators.includes(currentChar) &&
    prevChar === currentChar
  ) {
    operatorStatus = "same";
  } else {
    operatorStatus = null;
  }

  return operatorStatus;
}
/**
 *
 * @param {string} currentValue
 * @returns
 */
export function getCurrentAndPrevChar(currentValue) {
  const prevChar = currentValue[currentValue.length - 2];
  const currentChar = currentValue[currentValue.length - 1];

  return { prevChar, currentChar };
}

/**
 *
 * @param {string} char
 * @param {string} initialValue
 * @returns
 */
export function useRestrictInvalidSyntax(char, initialValue) {
  const [currentValue, setCurrentValue] = useState(initialValue);
  // console.log({ currentValue, char, initialValue });

  if (
    currentValue.length === 1 &&
    operators.includes(currentValue.charAt(0)) &&
    !(char === "(")
  ) {
    setCurrentValue("");
  }
  // when the same operator is clicked twice
  const ops = preventDoubleOperator(currentValue);
  if (ops === "same") {
    setCurrentValue(currentValue.slice(0, -1));
  }
  // when two different operators are clicked sequentially, replace the previous with current
  if (ops === "similar") {
    const { currentChar } = getCurrentAndPrevChar(currentValue);
    setCurrentValue(currentValue.slice(0, -2));
    setCurrentValue((prev) => prev + currentChar);
  }

  const setCurrent = (val) => {
    setCurrentValue(val);
  };

  return { currentValue, setCurrent };
}
