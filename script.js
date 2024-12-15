// Variables to store calculator data
let currentInput = "";
let previousInput = "";
let operator = "";

// DOM Elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Button Click Handling
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!value) return;

    // If it's an operator, store it
    if (button.classList.contains("operator")) {
      operator = value;
      previousInput = currentInput;
      currentInput = "";
    } else {
      currentInput += value;
    }

    updateDisplay(currentInput || previousInput);
  });
});

// Clear Button Handling
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
});

// Equals Button Handling
equalsButton.addEventListener("click", () => {
  if (!previousInput || !currentInput || !operator) return;

  // Call the API for the calculation
  calculateWithAPI(previousInput, operator, currentInput);
});

// Update Display Function
function updateDisplay(value) {
  display.textContent = value;
}

// API Call Function
function calculateWithAPI(num1, operator, num2) {
  const apiURL = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(
    `${num1}${operator}${num2}`
  )}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((result) => {
      updateDisplay(result);
      currentInput = result.toString();
      previousInput = "";
      operator = "";
    })
    .catch((error) => {
      console.error("Error calling the API:", error);
      updateDisplay("Error");
    });
}
