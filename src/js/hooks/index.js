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
    operatorStatus = false;
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
  useEffect(() => {
    if (
      currentValue.length === 1 &&
      operators.includes(currentValue.charAt(0)) &&
      !(currentValue.charAt(0) === "(")
    ) {
      setCurrentValue("");
    }
    // when the same operator is clicked twice
    const ops = preventDoubleOperator(currentValue);
    // console.log({ ops });
    if (ops === "same") {
      setCurrentValue(currentValue.slice(0, -1));
    }
    // when two different operators are clicked sequentially, replace the previous with current
    if (ops === "similar") {
      const { currentChar } = getCurrentAndPrevChar(currentValue);
      setCurrentValue(currentValue.slice(0, -2));
      setCurrentValue((prev) => prev + currentChar);
    }
  }, [initialValue]);
  const setCurrent = (val) => {
    setCurrentValue(val);
  };
  return { currentValue, setCurrent };
}

/**
 * @param {string} initialValue
 * @returns
 */
export function restrictInvalidSyntax(initialValue) {
  let currentValue = initialValue;
  console.log({ currentValue }, "here in hook");
  const ops = preventDoubleOperator(currentValue);
  if (currentValue.length === 1) {
    if (currentValue.charAt(0) === ".") {
      currentValue = "0.";
      return { currentValue };
    }
    if (
      operators.includes(currentValue.charAt(0)) &&
      !(currentValue.charAt(0) === "(" || currentValue.charAt(0) === "-")
    ) {
      currentValue = "";
      return { currentValue };
    }
  }
  // if currentValue has 2 values and it started with '-' but the next char is not a number
  else if (
    currentValue.length === 2 &&
    currentValue.charAt(0) === "-" &&
    isNaN(currentValue.charAt(1))
  ) {
    currentValue = "-";
    return { currentValue };
  }
  // when the same operator is clicked twice
  else if (ops === "same") {
    currentValue = currentValue.slice(0, -1);
    return { currentValue };
  }
  // when two different operators are clicked sequentially, replace the previous with current
  else if (ops === "similar" && currentValue[currentValue.length - 1] !== "-") {
    const { currentChar } = getCurrentAndPrevChar(currentValue);
    currentValue = currentValue.slice(0, -2);
    currentValue += currentChar;
    return { currentValue };
  }

  return { currentValue };
}
