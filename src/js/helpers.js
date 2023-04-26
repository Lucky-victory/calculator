const operators = ["x", "%", "!", "+", "-", "÷", "^", "√", "."];

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
 

/**
 * @param {string} initialValue
 * @returns
 */

export const restrictInvalidSyntax = (initialValue) => {
  let currentValue = initialValue;

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
};
/**
 *
 * @param {string} value
 */
export const isFactorial = (value) => {
  const isValid = /^([1-9]\d*|0)!$/.test(value);
  console.log("factorial|:", { isValid });
  return isValid;
};
// let timeoutId;

// function handleLongPress() {
//   // Replace this with your desired behavior for the long press event
//   clearInput();
// }

// function handleMouseDown(evt) {
//   evt.stopPropagation();
//   timeoutId = setTimeout(handleLongPress, 1200);
// }

// function handleMouseUp(evt) {
//   evt.stopPropagation();

//   if (timeoutId) clearTimeout(timeoutId);
// }

// const element = document.querySelector("#remove-last-btn");
// const startEvents = ["mousedown", "touchstart"];
// const endEvents = ["mouseup", "touchend", "touchcancel", "mouseleave"];
// startEvents.forEach((evtName) => {
//   element.addEventListener(evtName, handleMouseDown);
// });
// endEvents.forEach((evtName) => {
//   element.addEventListener(evtName, handleMouseUp);
// });
const useLongPress = () => {};
