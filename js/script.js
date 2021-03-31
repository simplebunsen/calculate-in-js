const OPERATORS = ["+", "-", "*", "/", "="];
let currentDisplayNumber = 0;
let previousDisplayNumber = 0;
let previousOperator = "";
let calcDisplayObject = document.querySelector("#calc-display-object");

function add(a,b){
  return a + b;
}
function subtract(a,b){
  return a - b;
}
function multiply(a,b){
  return a * b;
}
function divide(a,b){
  return a / b;
}

function operate(a,b,operator){
  switch (operator) {
    case "+":
      return add(a,b);
    case "-":
      return subtract(a,b);
    case "*":
      return multiply(a,b);
    case "/":
      return divide(a,b);
    case "=":
      return operate(a,b,previousOperator);
    //fires when there isn't a previous operator yet (only one number has been entered yet)
    case "":
      return currentDisplayNumber;
    //in case something funky ends up being the operator
    default:
      //probably not best practice but should work
      return Number.NaN;
  }


}  
function setUpButtons(){
  const container = document.querySelector(".calculator-number-container");

  //setting up numpad
  for (let i = 1; i <= 9; i++) {
    addButton(i);
  }

  //crudely setting up operators
  for (let i = 0; i < OPERATORS.length; i++) {
    const current = OPERATORS[i];
    addButton(current);    
  }

  function addButton(desired) {
    const added = container.appendChild(document.createElement("div"));
    added.innerText = desired;
    added.classList.add("calculator-button");
    added.id = `btn-${desired}`;
    added.addEventListener("click", () => processNextKeypress(desired));
  }
}

function processNextKeypress(key) {
  alert(`processing key press of ${key}`);
  //remove spaces (althought none should be present) and parse key either as Number, or as NaN!
  const keyAsFloat = parseFloat(key);

  if(Number.isNaN(keyAsFloat)) { //when input cannot be parsed to a number
    const operatorRegex = / *(\+|\-|\*|\/|\=) *"/;
    if (key.match(operatorRegex) !== null) { //if key is an operator
      //previous Value is the result of current operation
      previousDisplayNumber = operate(previousDisplayNumber, currentDisplayNumber, previousOperator);
      currentDisplayNumber = 0;
      previousOperator = key.trim();
    }
  } else { //input is number
    currentDisplayNumber = currentDisplayNumber * 10 + keyAsFloat;
  }
  //update field
  updateDisplay(currentDisplayNumber);
}

function updateDisplay(desired) {
  calcDisplayObject.value = desired;
}

function resetDisplay() {
  calcDisplayObject.value = 0;
  currentDisplayNumber = 0;
}