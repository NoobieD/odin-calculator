let firstOperand='';
let secondOperand='';
let currentOperation=null;
let shouldResetDisplay=false;

const numberBtn=document.querySelectorAll('.number');
const operatorBtn=document.querySelectorAll('.operator');
const resetBtn=document.getElementById("resetBtn");
const deleteBtn=document.getElementById("deleteBtn");
const dotBtn=document.getElementById("dotBtn");
const equalsBtn=document.getElementById("equalsBtn");
const queryDisplay=document.getElementById("queryDisplay");
const resultDisplay=document.getElementById("resultDisplay");

resetBtn.addEventListener("click",()=>resetOperation());

deleteBtn.addEventListener("click",()=>deleteOperation());

dotBtn.addEventListener("click",()=>appendPoint());

equalsBtn.addEventListener("click",()=>compute());

numberBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>appendNumber(btn.textContent));
})

operatorBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>appendOperation(btn.textContent));
})

let resetOperation=()=>{
    queryDisplay.textContent=''
    resultDisplay.textContent='0'
    let firstOperand='';
    let secondOperand='';
    let currentOperation=null;
    let shouldResetDisplay=false;
}

let deleteOperation=()=>{
    resultDisplay.textContent=resultDisplay.textContent.toString().slice(0,-1);
}

let resetDisplay=()=>{
    resultDisplay.textContent='';
    shouldResetDisplay=false;
}

let appendNumber=(number)=>{
    if(resultDisplay.textContent==='0' || shouldResetDisplay)
        resetDisplay();
    resultDisplay.textContent+=number;
}

let appendOperation=(operation)=>{
    if(currentOperation!==null)
        compute();
    firstOperand=resultDisplay.textContent;
    currentOperation=operation;
    queryDisplay.textContent=`${firstOperand}${currentOperation}`;
    shouldResetDisplay=true;
}

let appendPoint=()=>{
    if(shouldResetDisplay)
        resetDisplay();
    if(resultDisplay.textContent==='')
        resultDisplay.textContent='0';
    if(resultDisplay.textContent.includes('.'))
        return;
    resultDisplay.textContent+='.';
}

let add=(a,b)=>{
    return a+b;
}

let subtract=(a,b)=>{
    return a-b;
}

let multiply=(a,b)=>{
    return a*b;
}

let divide=(a,b)=>{
    return a/b;
}


let compute=()=>{
    if(currentOperation===null || shouldResetDisplay)
        return;
    if(currentOperation==='÷' && resultDisplay.textContent==='0'){
        alert("Can't divide by 0");
        return;
    }
    secondOperand=resultDisplay.textContent;
    resultDisplay.textContent=Math.round(solve(currentOperation,firstOperand,secondOperand)*1000)/1000;
    queryDisplay.textContent=`${firstOperand}${currentOperation}${secondOperand}=`;
    currentOperation=null;
    
}

let solve=(operator,operandFirst,operandSecond)=>{
    first=Number(operandFirst);
    second=Number(operandSecond);
    switch (operator) {
        case '+':
            return add(first,second);
        case '-':
            return subtract(first,second);
        case '×':
            return multiply(first,second);
        case '÷':
            if(second===0)
                return null;
            else
                return divide(first,second);
        default:
            return null;
    }
}