let buttons = document.querySelectorAll(".btnClass");
let dispControl = document.querySelector("#resDisplay");
let prevValue = null;
let lastOperator = null;
let currValue = "";

let refreshDisplay = () => {
    //console.log(currValue);
    if (currValue.length > 0) dispControl.textContent = currValue;
    else if (prevValue !== null) dispControl.textContent = prevValue;
    else dispControl.textContent = "0";
};

let calculate = (val1, val2, operator) => {
    let v1Num = Number(val1);
    let v2Num = Number(val2);
    if (operator === "+") return v1Num + v2Num;
    if (operator === "-") return v1Num - v2Num;
    if (operator === "*") return v1Num * v2Num;
    if (operator === "/") return v1Num / v2Num;
};

let onBtnClick = (e) => {
    let btnId = e.target.id;
    if (btnId.startsWith("btn")) {
        currValue = currValue + btnId.replace("btn", ""); // number button. Add to currValue string
    } else if (btnId === "comma") {
        if (currValue === "") currValue = "0"; // if no number in currValue, put zero
        currValue = currValue + ".";
    } else if (btnId.startsWith("oper")) {
        let operator = btnId.replace("oper", ""); // get operator from id
        if (prevValue === null) {
            prevValue = currValue; // first number. Do nothing except write number to last value variable
        } else {
            prevValue = calculate(prevValue, currValue, lastOperator); // calculate and store in last value variable
        }
        lastOperator = operator; // store operator and reset current value
        currValue = "";
    } else if (btnId.startsWith("result")) {
        currValue = calculate(prevValue, currValue, lastOperator).toString(); // calclulate and reset last value
        prevValue = null;
    }

    refreshDisplay();
};

let addListeners = () => {
    let btnArray = [...buttons];
    btnArray.forEach((btn) => {
        btn.addEventListener("click", onBtnClick);
    });
};

addListeners();
refreshDisplay();
