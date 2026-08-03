const display = document.querySelector('.display');
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];



function appendToDisplay(value) {
    if (display.textContent === '0' && nums.includes(value)) {
        display.textContent = '';
    }
    if (display.textContent.length >= 18) {
        return;
    }

    const cad = display.textContent;
    const lastChar = cad.at(-1);

    if (!nums.includes(lastChar) && !nums.includes(value)) {
        deleteLast();
        display.textContent += value;
        return;
    }

    display.textContent += value;
}

function clearDisplay() {
    display.textContent = '0';
}


function deleteLast() {
    let cad = "";

    for (let i = 0; i < display.textContent.length-1; i++) {
        cad += display.textContent[i];
    }

    if (display.textContent.length === 1) {
        cad = "0";
    }

    display.textContent = cad;
}


function calculateResult() {
    let cad = display.textContent;
    cad += "=";
    let list = [];
    let num = "";

    for (let i = 0; i < cad.length; i++) {
        if (nums.includes(cad[i])) {
            num += cad[i];
        } else {
            list.push(parseFloat(num));
            list.push(cad[i]);
            num = "";
        }
    }

    let result = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === "+") {
            result = list[i-1] + list[i+1];
            list.splice(i-1, 3, result);
            i -= 2;
        } else if (list[i] === "-") {
            result = list[i-1] - list[i+1];
            list.splice(i-1, 3, result);
            i -= 2;
        } else if (list[i] === "*") {
            result = list[i-1] * list[i+1];
            list.splice(i-1, 3, result);
            i -= 2;
        } else if (list[i] === "/") {
            if(list[i+1] === 0){
                display.textContent = "Nice try 😎";
                return "Nice try 😎";
            }
            result = list[i-1] / list[i+1];
            list.splice(i-1, 3, result);
            i -= 2;
        }   
    }
    display.textContent = list[0];
    console.log(list);
}

