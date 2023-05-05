export const operators = [
  "x",
  "%",
  "!",
  "+",
  "-",
  "÷",
  "^",
  "√",
  ".",
  "(",
  ")",
];

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

export const validateSyntax = (initialValue) => {
  let currentValue = initialValue;

  const ops = preventDoubleOperator(currentValue);
  if (currentValue.length === 1) {
    if (currentValue.charAt(0) === ".") {
      return { currentValue: "0." };
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
  else if (
    ops === "same" &&
    !["(", ")"].includes(currentValue[currentValue.length - 1])
  ) {
    currentValue = currentValue.slice(0, -1);
    return { currentValue };
  }
  // when two different operators are clicked sequentially, replace the previous with current expect it's a factorial (!) or minus (-)
  else if (ops === "similar") {
    const { currentChar, prevChar } = getCurrentAndPrevChar(currentValue);
    if (!["(", ")", "!"].includes(prevChar)) {
      currentValue = currentValue.slice(0, -2);
      currentValue += currentChar;
      return { currentValue };
    }
    // prevent non-numeric
    else if (isNaN(currentChar)) {
      return { currentValue: currentValue.slice(0, -1) };
    }
    return { currentValue };
  }

  return { currentValue };
};
/**
 *
 * @param {string} value
 */
export function isFactorial(value) {
  const isValid = /^([1-9]\d*|0)!$/.test(value);
  // console.log("factorial|:", { isValid });
  return isValid;
}

/**
 *
 * @param {string} numStr
 * @returns
 */
export function format(numStr) {
  /**
   * @type {Array<string>}
   */

  const parts = numStr?.split(/([^0-9\.]+)/); // Splits the string into numeric and non-numeric parts excluding decimals
  return parts
    .map((part) => {
      if (!isNaN(part) && part !== "") {
        const numPart = part.split(".");
        const integerPart = numPart[0]?.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
        // Formats the numeric part with commas
        const fractionalPart = numPart[1];
        // if there's a fractional part, concat and return it with the integer part, otherwise return the integer part

        if (fractionalPart) return `${integerPart}.${fractionalPart}`;
        else if (part.includes(".") && !fractionalPart)
          return `${integerPart}.`;
        return integerPart;
      }
      return part; // Returns the non-numeric part as is
    })
    .join("");
}
/**
 This checks if the expression has any operator, if not, then don't render any result
 * 
 * @param {string} value 
 */
export function containsOperator(value) {
  const ops = operators.filter((op) => op !== ".");
  return ops.some((val) => value.includes(val));
}

/**
 *
 * @param {string} value
 * @returns
 */
export function parenthesesChecker(value) {
  let isClosed = true;

  let stack = [];

  for (let i = 0; i < value.length; i++) {
    if (value[i] === "(") {
      stack.push("(");
    } else if (value[i] === ")") {
      if (stack.length === 0) {
        return (isClosed = false);
      } else {
        stack.pop();
      }
    }
  }

  isClosed = stack.length === 0;
  return isClosed;
}
