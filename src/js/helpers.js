export const operators = ["x", "%", "!", "+", "-", "÷", "^", "√", ".","(",")"];

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
  else if (ops === "same" &&
    !['(',')'].includes(currentValue[currentValue.length - 1])) {
    currentValue = currentValue.slice(0, -1);
    return { currentValue };
  }
  // when two different operators are clicked sequentially, replace the previous with current expect it's a factorial (!) or minus (-)
  else if (
    ops === "similar"
  ) {
    const { currentChar,prevChar } = getCurrentAndPrevChar(currentValue);
    if (![ "(", ")", "!"].includes(prevChar)) {
      currentValue = currentValue.slice(0, -2);
      currentValue += currentChar;
      return { currentValue };
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
        return fractionalPart
          ? `${integerPart}.${fractionalPart}`
          : integerPart; // if there's a fractional part, concat and return it with the integer part, otherwise return the integer part
      }
      return part; // Returns the non-numeric part as is
    })
    .join("");
}
