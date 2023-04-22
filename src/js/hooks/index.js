import { useState, useEffect } from "react";

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
export function usePreventDoubleOperator(inputValue) {
  const [prevChar, currentChar] = getCurrentAndPrevChar(inputValue);
  const [operatorStatus, setOperatorStatus] = useState(null);

  if (
    operators.includes(prevChar) &&
    operators.includes(currentChar) &&
    prevChar !== currentChar
  ) {
    setOperatorStatus("similar");
  } else if (operators.includes(prevChar) && operators.includes(currentChar)) {
    setOperatorStatus("same");
  } else {
    setOperatorStatus(null);
  }

  return operatorStatus;
}
/**
 *
 * @param {string} currentValue
 * @returns
 */
export function useCurrentAndPrevChar(currentValue) {
  const [currentChar, setCurrentChar] = useState("");
  const [prevChar, setPrevChar] = useState("");

  useEffect(() => {
    setPrevChar(currentValue[currentValue.length - 2] || "");
    setCurrentChar(currentValue[currentValue.length - 1] || "");
  }, [currentValue]);

  return { prevChar, currentChar };
}
