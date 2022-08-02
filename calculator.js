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
let nums = [];

const buttons = document.querySelectorAll("button");
const display = document.querySelector("span");

let didOperation = false;

const interact = function () {
    for (let button of buttons) {
        
        // console.log(typeof button.textContent);
        button.addEventListener("click", function() {
            let text = button.textContent;
            

            if (isNaN(text) === false) {
                // This condition checks if the = button pressed, clears screen for new numbers to display
                if (didOperation || display.textContent === "OOPS") {
                    display.textContent = "";
                    didOperation = false;
                }
                display.textContent += text;
                nums.push(text);
            }
            if (text === "AC") {
                display.textContent = "";
                signs, nums, numbers = [];
            }
            if (text === "+" || text === "-" || text === "x" || text === "/") {
                console.log(didOperation);
                console.log(display.textContent === "OOPS");
                if (didOperation && display.textContent === "OOPS") {
                    didOperation = false;
                    display.textContent = "";
                    return;
                }
                else if (didOperation) {
                    didOperation = false;
                    signs.push(text);
                    display.textContent += ` ${text} `;
                    return;
                }
                else if (!didOperation && nums.length === 0) {
                    console.log(nums.length);
                    return;
                }
                display.textContent += ` ${text} `;
                numbers.push(parseInt(nums.join("")));
                nums = [];
                signs.push(text);
            }
            if (text === "=") {
                console.log(numbers, "numbers");
                numbers.push(parseInt(nums.join("")));
                const equals = operate();
                display.textContent = equals;
                console.log(equals);
                if (equals === "OOPS") {
                    numbers = [];
                    nums = [];
                    didOperation = true;
                    return;
                }
                numbers = [equals];
                nums = [];
                didOperation = true;
            }
        });
    }
}

interact();