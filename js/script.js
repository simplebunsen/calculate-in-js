const OPERATORS = ["+", "-", "*", "/", "="];
let currentDisplayNumber = 0;
let previousDisplayNumber = 0;
let previousOperator = "";
const previousDisplayObject = document.querySelector("#previous-display-object");
const operatorDisplayObject = document.querySelector("#operator-display-object");
const calcDisplayObject = document.querySelector("#calc-display-object");

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
  if (b == 0) {
    alert("dumb dumb tried to divide by zero. gootta clear the screen for that :(")
    clearCalculator();
    return 0;
  }
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
    const added = container.appendChild(document.createElement("a"));
    added.innerText = desired;
    added.classList.add("calculator-button");
    added.id = `btn-${desired}`;
    added.addEventListener("click", () => processNextKeypress(desired));
  }
}

function processNextKeypress(key) {

  //alert(`processing key press of ${key}`);

  //remove spaces (althought none should be present) and parse key either as Number, or as NaN!
  const keyAsFloat = parseFloat(key);

  if(Number.isNaN(keyAsFloat)) { //when input cannot be parsed to a number
    //alert("input is NaN");

    const operatorRegex = / *(\+|\-|\*|\/|\=) */;

    if (key.match(operatorRegex) !== null) { //if key is an operator

      //alert("input is operator");

      //don't operate if the previous operator was "="
      if(previousOperator !== "=") {     
        previousDisplayNumber = operate(previousDisplayNumber, currentDisplayNumber, previousOperator);
      }
      currentDisplayNumber = 0;
      previousOperator = key.trim();
    }

  } else { //input is number
    
    if(previousOperator === "=") {
      currentDisplayNumber = keyAsFloat;
      previousDisplayNumber = 0;
      previousOperator = "";
    } else {
      currentDisplayNumber = currentDisplayNumber * 10 + keyAsFloat; 
    }
  }
  updateDisplay();   
}

function updateDisplay() {
  previousDisplayObject.value = parseFloat(previousDisplayNumber.toFixed(5));
  if(previousOperator === "=" && currentDisplayNumber == 0) {
    alert("we have equal sign and 0 current number");
    calcDisplayObject.value = "";
    operatorDisplayObject.value = "";
    return;
  }
  calcDisplayObject.value = parseFloat(currentDisplayNumber.toFixed(5));
  operatorDisplayObject.value = previousOperator;
}

function clearCalculator() {
  //numbners = 0
  updateDisplay();
  //alert("cleared");
}
