import React, { useState } from "react";
import "../css/App.css";

function App() {
  const [currentOperand, setCurrentOperand] = useState(0);
  const [previousOperand, setPreviousOperand] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");

  const clear = () => {
    setCurrentOperand(0);
    setPreviousOperand("");
    setCurrentOperation("");
  };

  const compute = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(result);
    setCurrentOperation("");
    setPreviousOperand("");
  };

  const inputOperator = operator => {
    if (currentOperand === "") return;
    // if previous operator is there, compute the result and chain next operation
    if (previousOperand !== "") {
      compute();
    }
    setCurrentOperation(operator);
    setPreviousOperand(currentOperand);
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

  const equals = () => {
    compute();
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        <div className="previous-operand">
          {currentOperation !== ""
            ? getDisplayNumber(previousOperand) + "" + currentOperation
            : getDisplayNumber(previousOperand)}
        </div>
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
