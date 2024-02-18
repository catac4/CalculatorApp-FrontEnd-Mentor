"use strict";

const circle = document.querySelector(".slider__circle");
const buttonsTheme = document.getElementsByClassName("slider__button");
const buttonsCalculator = document.getElementsByClassName("buttons__item");
const val = document.querySelector(".output__text");
const htmlTag = document.getElementsByTagName("html")[0];
const showSave = document.querySelector(".output__show");
val.readOnly = true;
showSave.readOnly = true;

let finishOperation = true;
let saveNumber = 'def';
let currentOperator, lastOperator = 'void';
let continueOperation = false;
let firstOperation = true;
let saveOperation = [];

Array.from(buttonsTheme).forEach((btt,index) => {
    btt.addEventListener('click',()=>{
        circle.style.left = 10 + 30*index + '%';
        htmlTag.setAttribute('data-theme','col'+(+index+1));
    });
});

const resetVal = function(){
    val.textContent = ' ';
}

const isDecimal = function(current){
    return (current.toString()).includes(".");
}

const deleteCommas = function(val){
    return val.toString().replace(/,/g,'');
}

const normalizeValue = function(val){
    if(!isDecimal(val) && val[0] == '0' && val.length > 1){
        val = val.toString().slice(1);
    }
    val = deleteCommas(val);
    if(isDecimal(val)){
        return val;
    }else{
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}

const doOperation = function(current, operator){
    let result;
    switch(operator){
        case 'x':
            result = +current * +saveNumber;
        break;
        case '+':
             result = +current + +saveNumber;
        break;
        case '-':
            result = +saveNumber - +current;
        break;
        case '/':
            result = +saveNumber / +current;
        break;   
    }
    return result;
}

const resetShow = function(){
    saveNumber = 0;
    continueOperation = false;
    firstOperation = true;
    saveOperation.length = 0;
    showSave.value = saveOperation.join(' ');
}

const addFirstValue = function(valueAdded){
    if(continueOperation){
        resetShow();
    }
    resetVal();
    val.value = valueAdded;
    finishOperation = false;
}

const deleteValue = function(){
    let text = deleteCommas(val.value);
    text = text.slice(0,text.length - 1);
    val.value = (text.length <  1) ? 0 : text;
    val.value = normalizeValue(val.value);
}

const resetCalculator = function(){
    saveOperation.length = 0;
    showSave.value = saveOperation.join(' ');
    finishOperation = true;
    resetVal();
    lastOperator = 'void';
    val.value = 0;
    saveNumber = 0;
    firstOperation = true;
}

const pushValue = function(value, operator){
    saveOperation.push(value);
    saveOperation.push(operator);  
}

Array.from(buttonsCalculator).forEach(btt => {
    btt.addEventListener('click',()=>{
        let curr = btt.getAttribute('value');
        if(!isNaN(Number(curr))){
            if(finishOperation){
                addFirstValue(curr);
            }else{
                val.value+=curr;
            }
            val.value = normalizeValue(val.value);
        }else{
            switch(curr){
                case '.':
                    if(!isDecimal(val.value)){
                        if(finishOperation){
                            addFirstValue('.0');
                        }else{
                            val.value+='.';
                        }
                    } 
                break;
                case 'x':
                case '+':
                case '-':
                case '/':
                    continueOperation = false;
                    currentOperator = curr; 
                    if(!finishOperation){
                        pushValue(val.value,curr)
                    }else{
                        if(firstOperation){
                            pushValue(val.value,curr)
                        }   
                    }
                    saveOperation[saveOperation.length - 1] = curr;
                    showSave.value = saveOperation.join(' ');
                    if(firstOperation){
                        finishOperation = true;
                        saveNumber = deleteCommas(val.value);
                    }
                    if(!finishOperation){          
                        let operator = (lastOperator == "void") ? currentOperator : lastOperator;
                        val.value = Number(doOperation(deleteCommas(val.value),operator));
                        saveNumber = deleteCommas(val.value);
                        val.value = normalizeValue(val.value);
                    }
                    firstOperation = false;
                    finishOperation = true;
                    lastOperator = curr;
                break;
                case 'DEL':
                    deleteValue();
                break;
                case 'RESET':
                    resetCalculator();
                break;
                case '=':
                    if(currentOperator){
                        saveOperation.push(val.value);
                        showSave.value = saveOperation.join(' ');
                        continueOperation = true;
                        lastOperator = 'void';
                        finishOperation = true;
                        val.value = Number(doOperation(deleteCommas(val.value),currentOperator)); 
                        val.value = normalizeValue(val.value);
                        saveNumber = deleteCommas(val.value);
                        currentOperator = false;
                        saveOperation.length = 0;
                        pushValue(val.value,' ')
                    }
                break;
            }
        }
    })
});

