let currentDisplayNumber = 0;
let previousDisplayNumber = 0;
let previousOperator = "";

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
    case "":
      return currentDisplayNumber;
  
    default:
      //probably not best practice but should work
      return Number.NaN;
  }


}  
function setUpButtons(){
  const container = document.querySelector(".calculator-number-container");
  for (let i = 1; i <= 9; i++) {
    //create new div and add it
    const added = container.appendChild(document.createElement("div"));
    added.innerText = i;
    added.classList.add("calculator-button");
    added.id = `btn-${i}`;
    added.addEventListener("click", () => processNextKeypress(i));
  }
}

function processNextKeypress(key) {
  alert(`processing key press of ${key}`);
  //remove spaces (althought none should be present) and parse key either as Number, or as NaN!
  const keyAsFloat = parseFloat(key);

  if(Number.isNaN(keyAsFloat)) { //when input cannot be parsed to a number
    const operatorRegex = new RegExp(" *(\+|\-|\*|\/|\=) *");
    if (key.match(operatorRegex) !== null) { //if key is an operator
      //previous Value is the result of current operation
      previousDisplayNumber = operate(previousDisplayNumber, currentDisplayNumber, previousOperator);
      currentDisplayNumber = 0;
      previousOperator = key.trim();
    }
  } else { //input is number
    currentDisplayNumber = currentDisplayNumber * 10 + keyAsFloat;
  }
}