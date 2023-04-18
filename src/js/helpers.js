const operators = ["+", "-", "*", "/", "%", "^", "√"];
const visibleOperators = ["x", "%", "+", "-", "÷", "^", "√", "."];
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const multiply = (a, b) => {
  return a * b;
};
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const divide = (a, b) => {
  return a / b;
};
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const add = (a, b) => {
  return a + b;
};
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const subtract = (a, b) => {
  return a - b;
};
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const percentage = (a, b) => {
  return ((a / 100) * b).toFixed(2);
};
/**
 *
 * @param {number} b
 * @returns
 */
const sqrt = (b) => {
  return Math.sqrt(b);
};
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const exponential = (a, b) => {
  return a ** b;
};


/**
 *
 * @param {string} char
 * @returns
 */
const getPrecedence = (char) => {
  switch (char) {
    case "+":
    case "-":
      return 1;
    case "^":
    case "/":
    case "*":
    case "%":
    case "√":
      return 2;
    default:
      return 0;
  }
};
/**
 *
 * @param {string} char
 * @returns
 */
const isOperator = (char) => {
  return operators.includes(char);
};

/**
 *
 * @param {string} expression
 */
const infixToPostfix = (expression) => {
  let output = "";
  let stack = [];
  for (let i = 0; i < expression.length; i++) {
    let char = expression.charAt(i);
    if (isOperator(char)) {
      while (
        stack.length > 0 &&
        isOperator(stack[stack.length - 1]) &&
        getPrecedence(char) <= getPrecedence(stack[stack.length - 1])
      ) {
        output += stack.pop();
      }
      stack.push(char);
    } else if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output += stack.pop();
      }
      stack.pop();
    } else if (!isNaN(parseFloat(char))) {
      let num = char;
      // handle decimal values
      while (
        (i + 1 < expression.length && !isNaN(expression.charAt(i + 1))) ||
        expression.charAt(i + 1) === "."
      ) {
        num += expression.charAt(i + 1);

        i++;
      }
      output += num + " ";
    }
  }
  while (stack.length > 0) {
    output += stack.pop();
  }

  return output.trim();
};

/**
 *
 * @param {string} _expression
 * @returns
 */
const calculate = (_expression) => {
  // replace x and ÷ with proper operators (* and /);
  const expression = _expression
    .replace(/['÷']/gm, "/")
    .replace(/['x']/gim, "*");
  let postfix = infixToPostfix(expression);

  let stack = [];

  for (let i = 0; i < postfix.length; i++) {
    let c = postfix.charAt(i);

    if (isOperator(c)) {
      let b = parseFloat(stack.pop());
      let a = parseFloat(stack.pop());

      switch (c) {
        case "+":
          stack.push(add(a, b));
          break;
        case "-":
          stack.push(subtract(a, b));
          break;
        case "^":
          stack.push(exponential(a, b));
          break;
        case "√":
          stack.push(sqrt(b));
          break;
        case "*":
          stack.push(multiply(a, b));
          break;

        case "/":
          stack.push(divide(a, b));
          break;
        case "%":
          stack.push(percentage(a, b));
          break;
      }
    } else if (!isNaN(parseFloat(c))) {
      let num = c;
      while (
        (i + 1 < postfix.length && !isNaN(parseFloat(postfix.charAt(i + 1)))) ||
        expression.charAt(i + 1) === "."
      ) {
        num += postfix.charAt(i + 1);
        i++;
      }
      stack.push(parseFloat(num));
    }
  }

  return stack.pop();
};

export const helpers = {
  isOperator,
  getPrecedence,
  infixToPostfix,
  calculate,
  operators,
  visibleOperators,

  
};
