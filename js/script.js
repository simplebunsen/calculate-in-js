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

function operate(a,b,operant){
  switch (operant) {
    case "+":
      return add(a,b);
      break;
    case "-":
      return subtract(a,b);
      break;
    case "*":
      return multiply(a,b);
      break;
    case "/":
      return divide(a,b);
      break;
  
    default:
      //probably not best practice but should work
      return Number.NaN;
  }


}  
function setUpButtons(){
    const container = document.querySelector(".calculator-number-container");
    for (let i = 1; i <= 9; i++) {
      const added = container.appendChild(document.createElement("div"));
      added.innerText = i;
      added.classList.add("calculator-button");
    }
  }

  function processNextKeypress(key) {
    if(Number.isNaN(parseFloat(key))) { //when input cannot be parsed to a number
      
    }
  }