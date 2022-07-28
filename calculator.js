const a = ["1", "+", "2", "-", "3", "+", "6", "*", "3", "/", "2"];
const b = ["+", "-", "+", "*", "/"];
const c = [1, 2, 3, 6, 3, 2];


function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b === 0) {
        return "OOPS";
    }
    return a / b;
}

// start with the first number, then check for the first sign, delete that sign and call that sign operation, repeat
function operate() {
    return numbers.reduce(function(total, num, index)
    {  
        // console.log(total, num)
        if (total === "OOPS") {
            return "OOPS";
        }
        let a;
        if (index !== 0) {
            a = signs.shift();
            if (a === "+") {
                return add(total, num);
            }
            else if (a === "-") {
                return subtract(total, num);
            }
            else if (a === "x") {
                return multiply(total, num);
            }
            else if (a === "/") {
                return divide(total, num);
            }
        }
    })
}


let signs = [];
let numbers = [];

const buttons = document.querySelectorAll("button");
const display = document.querySelector("span");
// console.log(buttons);

let didOperation = false;

for (let button of buttons) {
    // console.log(typeof button.textContent);
    button.addEventListener("click", function() {
        let text = button.textContent;
        // if (didOperation) {
        //     didOperation = true;
        //     numbers = [];
        //     return
        // }
        if (isNaN(text) === false) {
        // console.log(button.textContent);
            if (didOperation) {
                display.textContent = "";
                didOperation = false;
                // return
            }
            display.textContent += text;
            numbers.push(parseInt(text));
            console.log(numbers);
        }
        if (text === "AC") {
            display.textContent = "";
            signs = [];
            numbers = [];
        }
        if (text === "+" || text === "-" || text === "x" || text === "/") {
            display.textContent += ` ${text} `;
            signs.push(text);
            console.log(signs);
        }
        if (text === "=") {
            const equals = operate();
            console.log(equals);
            display.textContent = equals;
            numbers = [];
            didOperation = true;
        }

    });
    // break;
}

// console.log(button.textContent);
// button.addEventListener("click", () => 
//     display.textContent = button.textContent);

