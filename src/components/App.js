import React, { useState } from "react";
import "../css/App.css";

function App() {
  const [currentOperand, setCurrentOperand] = useState(0);
  const [infixStack, setInfixStack] = useState([]);

  const clear = () => {
    setCurrentOperand(0);
    setInfixStack([]);
  };

  const isOperator = val => {
    return val === "+" || val === "-" || val === "*" || val === "/";
  };

  const getPrecedence = operator => {
    const precedence = {
      "/": 10,
      "*": 10,
      "+": 5,
      "-": 5
    };
    return precedence[operator];
  };

  const isOperand = val => {
    return !isNaN(val);
  };

  const getPostfixFromInfix = () => {
    const infix = infixStack;
    const outputStack = [];
    const operatorStack = [];
    for (let currentChar of infix) {
      if (isOperand(currentChar)) {
        outputStack.push(currentChar);
      } else if (isOperator(currentChar) && operatorStack.length === 0) {
        operatorStack.push(currentChar);
      } else {
        const topOperator = operatorStack[operatorStack.length - 1];
        if (getPrecedence(currentChar) > getPrecedence(topOperator)) {
          operatorStack.push(currentChar);
        } else if (getPrecedence(currentChar) <= getPrecedence(topOperator)) {
          do {
            const popped = operatorStack.pop();
            outputStack.push(popped);
          } while (
            getPrecedence(operatorStack[operatorStack.length - 1]) <=
            getPrecedence(currentChar)
          );
          operatorStack.push(currentChar);
        }
      }
    }
    if (operatorStack) {
      while (operatorStack.length !== 0) {
        const op = operatorStack.pop();
        outputStack.push(op);
      }
    }
    return outputStack;
  };

  const compute = (a, b, operator) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
    }
  };

  const evaulatePostfix = postfix => {
    const operandStack = [];
    postfix.forEach(val => {
      if (isOperand(val)) {
        operandStack.push(val);
      } else if (isOperator(val)) {
        const b = Number(operandStack.pop());
        const a = Number(operandStack.pop());
        const res = compute(a, b, val);
        operandStack.push(res);
      }
    });
    return operandStack.pop();
  };

  const evaluate = () => {
    if (currentOperand) {
      infixStack.push(currentOperand);
    }
    const postfix = getPostfixFromInfix();
    return evaulatePostfix(postfix);
  };

  const inputOperator = operator => {
    if (currentOperand === "") {
      return;
    }
    setInfixStack([...infixStack, currentOperand, operator]);
    setCurrentOperand("");
  };

  const getDisplayNumber = number => {
    const strNum = number.toString();
    const intDigits = parseFloat(strNum.split("."));
    const decDigits = strNum.split(".")[1];
    let intDisplay;
    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  };

  const inputNumber = number => {
    if (number === "." && currentOperand.includes(".")) return;
    if (currentOperand === 0) {
      setCurrentOperand(number + "");
    } else {
      setCurrentOperand(currentOperand + "" + number);
    }
  };

  const getDisplayExpression = () => {
    return infixStack.join("");
  };

  const equals = () => {
    const result = evaluate();
    setCurrentOperand(result);
    setInfixStack([]);
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        <div className="expression">{getDisplayExpression()}</div>
        <div className="current-operand">
          {getDisplayNumber(currentOperand)}
        </div>
      </div>
      <button id="clear" onClick={clear}>
        AC
      </button>
      <button id="divide" onClick={() => inputOperator("/")}>
        /
      </button>
      <button id="multiply" onClick={() => inputOperator("*")}>
        X
      </button>
      <button id="seven" onClick={() => inputNumber(7)}>
        7
      </button>
      <button id="eight" onClick={() => inputNumber(8)}>
        8
      </button>
      <button id="nine" onClick={() => inputNumber(9)}>
        9
      </button>
      <button id="subtract" onClick={() => inputOperator("-")}>
        -
      </button>
      <button id="four" onClick={() => inputNumber(4)}>
        4
      </button>
      <button id="five" onClick={() => inputNumber(5)}>
        5
      </button>
      <button id="six" onClick={() => inputNumber(6)}>
        6
      </button>
      <button id="add" onClick={() => inputOperator("+")}>
        +
      </button>
      <button id="one" onClick={() => inputNumber(1)}>
        1
      </button>
      <button id="two" onClick={() => inputNumber(2)}>
        2
      </button>
      <button id="three" onClick={() => inputNumber(3)}>
        3
      </button>
      <button id="equals" onClick={() => equals()}>
        =
      </button>
      <button id="zero" onClick={() => inputNumber(0)}>
        0
      </button>
      <button id="decimal" onClick={() => inputNumber(".")}>
        .
      </button>
    </div>
  );
}

export default App;
