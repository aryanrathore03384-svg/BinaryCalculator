
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const binaryResult = document.getElementById("binaryResult");
const decimalResult = document.getElementById("decimalResult");
const remainderResult = document.getElementById("remainderResult");
const calculationSteps = document.getElementById("calculationSteps");
const message = document.getElementById("message");
const operationButtons = document.querySelectorAll(".op");

let operation = "+";

// Convert binary text to an integer
function toDecimal(binary) {
  return BigInt("0b" + binary);
}

// Convert an integer to binary, including negative results
function toBinary(number) {
  if (number < 0n) {
    return "-" + (-number).toString(2);
  }
  return number.toString(2);
}

// Select an arithmetic operation
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    operation = button.dataset.op;

    operationButtons.forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    message.textContent = "";
  });
});

// Calculate the answer
document.getElementById("calculate").addEventListener("click", () => {
  const aText = num1.value.trim();
  const bText = num2.value.trim();

  // Accept only binary digits
  if (!/^[01]+$/.test(aText) || !/^[01]+$/.test(bText)) {
    message.textContent =
      "Error: Enter binary numbers using only 0 and 1.";
    return;
  }

  const a = toDecimal(aText);
  const b = toDecimal(bText);
  let answer;
  let explanation = "";

  if (operation === "+") {
    answer = a + b;
    explanation = `${aText} + ${bText}`;
  } else if (operation === "-") {
    answer = a - b;
    explanation = `${aText} - ${bText}`;
  } else if (operation === "*") {
    answer = a * b;
    explanation = `${aText} × ${bText}`;
  } else if (operation === "/") {
    if (b === 0n) {
      message.textContent = "Error: Division by zero is not allowed.";
      return;
    }

    answer = a / b;
    const remainder = a % b;

    remainderResult.textContent =
      "Remainder (binary): " + toBinary(remainder);

    explanation +=
      `Integer division: quotient ${toBinary(answer)}, ` +
      `remainder ${toBinary(remainder)}.`;
  }

  message.textContent = "";
  binaryResult.textContent = toBinary(answer);
  decimalResult.textContent = "Decimal: " + answer.toString();

  if (operation !== "/") {
    remainderResult.textContent = "";
    explanation = `${aText} ${operation} ${bText} = ${toBinary(answer)}`;
  }

  calculationSteps.textContent = explanation;
});

// Clear inputs and results
document.getElementById("clear").addEventListener("click", () => {
  num1.value = "";
  num2.value = "";
  binaryResult.textContent = "—";
  decimalResult.textContent = "Decimal: —";
  remainderResult.textContent = "";
  calculationSteps.textContent =
    "Enter two binary numbers to begin.";
  message.textContent = "";

  operation = "+";
  operationButtons.forEach(button => {
    button.classList.remove("selected");
  });
  operationButtons[0].classList.add("selected");
});

operationButtons[0].classList.add("selected");
