
let math = document.querySelector('.math');
let answer = document.querySelector('.answer');

let topScreen = [];
let operator = '';
let numOne = [];
let numTwo = [];

document.querySelector(".add").addEventListener('click', () => {
    operator = 'add';
});
document.querySelector(".subtract").addEventListener('click', () => operator = 'subtract');
document.querySelector(".multiply").addEventListener('click', () => operator = 'multiply');
document.querySelector(".divide").addEventListener('click', () => operator = 'divide');
document.querySelector('.equals').addEventListener('click', () => operate());

const operate = function () {
    let numTwoHolder = 0;
    numTwoHolder = Number(numTwo.join(''));

    if (operator == 'add'){
        operator = '';
        return updateAnswer(addNum(numOne , numTwoHolder));
    } else if (operator == 'subtract'){
        operator = '';
        return updateAnswer(subtractNum(numOne , numTwoHolder));
    } else if (operator == 'multiply'){
        operator = '';
        return updateAnswer(multiplyNum(numOne , numTwoHolder));
    } else {
        operator = '';
        return updateAnswer(divideNum(numOne , numTwoHolder));
    }
}


const addNum = function (a , b) {
    return a + b;
}

const subtractNum = function (a , b) {
    return a - b;
}

const multiplyNum = function (a , b) {
    return a * b;
}

const divideNum = function (a , b) {
    return a / b;
}

const updateNums = function(num) {
    if (num === '+' || num === '-' || num === 'x' || num === '/' && numOne != []){
        numOne = Number(topScreen.join(''));
    }else if (operator != '') {
        numTwo.push(num);
    }
}

//check if operator has anything in it. If so calls operate() like the user pressed =
// const longMath = function(num) {
//     if(operator != '' && numOne != [] && numTwo != [] && num === '-' || num === '+' || num === '/' || num === 'x'){
//         operate();
//     }
// 

const updateScreen = function(num) {
    if (answer.textContent != ''){
        clearScreen();
    }
    updateNums(num);

    topScreen.push(num);
    math.textContent = topScreen.join('');
}

//sets the bottom screen = to the answer
const updateAnswer = function (num){
    answer.textContent = num;
}

//Clears both screens and numbers aswell as the operator
const clearScreen = function () {
    topScreen = [];
    operator = '';
    numOne = [];
    numTwo = [];
    math.textContent = topScreen;
    answer.textContent = ''
}
