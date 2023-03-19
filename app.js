let operator = '';
let currentVal = '';
let previousVal = '';

let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');

let equal = document.querySelector('.equals');
let clear = document.querySelector('.clear');
let decimal = document.querySelector('.decimal');
let back = document.querySelector('.back');

let currentScreen = document.querySelector('.currentScreen');
let previousScreen = document.querySelector('.previousScreen');

//listens for any keypress on the keyboard. calls HandlekeyPress if one is pushed.
window.addEventListener("keydown", handleKeyPress);



//adds click event that updates text of the top screen to currentVal
numbers.forEach((number) => number.addEventListener('click', function(e){
    if (previousVal == "Error, can't / by 0"){
        previousVal = '';
    }
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentVal;
}))

operators.forEach((op) => op.addEventListener('click', function(e) {
    handleOperator(e.target.textContent);
    previousScreen.textContent = previousVal + " " + operator;
    currentScreen.textContent = currentVal;
}))

//clears the screen and resets variables.
clear.addEventListener('click', function(){
    currentVal = '';
    previousVal = '';
    currentScreen.textContent = '0';
    previousScreen.textContent = '';
    operator = '';
})

decimal.addEventListener('click', function(){
    addDecimal();
})

//checks if the values are empty. If not runs Caculate() and displays answer.
equal.addEventListener('click', function() {
    if(currentVal != '' && previousVal != ''){
        calculate();
        previousScreen.textContent = '';
        currentScreen.textContent = previousVal;
    }
})

back.addEventListener('click', function (){
    handleDelete();
})

//makes sure the number isn't too long and sets currentVal = to num
function handleNumber(num) {
    if (previousVal !== "" && currentVal !== "" && operator === "") {
        previousVal = "";
        currentScreen.textContent = currentVal;
    }
    if (currentVal.length <= 11) {
        currentVal += num;
        currentScreen.textContent = currentVal;
    }
}

function handleOperator(op){
    if (previousVal === "") {
        previousVal = currentVal;
        operatorCheck(op);
    } else if (currentVal === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentScreen.textContent = "0";
        previousScreen.textContent = previousVal + " " + operator;
    }
}

//converts Val's to numbers and does math based on operator.
function calculate(){
    previousVal = Number(previousVal);
    currentVal = Number(currentVal);

    if(operator === '+'){
        previousVal += currentVal;
    }else if(operator === '-'){
        previousVal -= currentVal;
    }else if(operator === 'x'){
        previousVal *= currentVal;
    }else{
        if(currentVal <= 0){
            previousVal = "Error, can't / by 0"
            displayResults();
            return
        }
        previousVal /= currentVal;
    }
    previousVal = roundNum(previousVal);
    previousVal = previousVal.toString();
    displayResults();
}

//checks if the caculation would be too long. Adds ... if it is > 11
function displayResults() {
    if (previousVal.length <= 11) {
        currentScreen.textContent = previousVal;
    } else {
        currentScreen.textContent = previousVal.slice(0, 11) + "...";
    }
    previousScreen.textContent = "";
    operator = "";
    currentVal = "";
}

function roundNum(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal () {
    if (!currentVal.includes('.')){
        currentVal += '.';
    }
}

function operatorCheck(text) {
    operator = text;
    previousScreen.textContent = previousVal + " " + operator;
    currentScreen.textContent = "0";
    currentVal = "";
}

//keyboard support for the calculator
function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        console.log(e.key);
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentVal != "" && previousVal != "")
    ) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

//deletes one number
function handleDelete() {
    if (currentVal !== "") {
        currentVal = currentVal.slice(0, -1);
        currentScreen.textContent = currentVal;
        if (currentVal === "") {
            currentScreen.textContent = "0";
        }
    }
    if (currentVal === "" && previousVal !== "" && operator === "") {
        previousVal = previousVal.slice(0, -1);
        currentScreen.textContent = previousVal;
    }
}