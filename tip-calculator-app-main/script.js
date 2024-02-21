const percentajes = document.getElementsByClassName('percentajes__button');
const inputs = document.getElementsByClassName('options__input');
const [dollarInput, customInput, peopleInput] = inputs;
const outputs = document.getElementsByClassName('box__value');
const [tipOutput, totalOutput] = outputs;
const buttons = document.getElementsByClassName('button');
const resetButton = buttons[buttons.length - 1];
const alerts = document.getElementsByClassName("options__message");
let currentPercen = 5;
let currentButton = document.querySelector(".percentajes__button");

Array.from(percentajes).forEach(element => {
    element.addEventListener('click', () => {
        currentButton.classList.remove("button--select");
        element.classList.add("button--select");
        currentPercen = element.value.match(/\d+(?=%)/);
        currentButton = element;
        customInput.classList.remove("options__input--select");
        putResults();
    })
})

resetButton.addEventListener('click', () =>{
    resetData();
    tipOutput.value = "$0.00";
    totalOutput.value = "$0.00"
    dollarInput.value = '';
    peopleInput.value = '';
    customInput.value = '';
    currentPercen = 5;
    currentButton.classList.remove("button--select");
    customInput.classList.remove("options__input--select");
    percentajes[0].classList.add("button--select");
    currentButton = percentajes[0];

})

customInput.addEventListener('click', () => {
    currentButton.classList.remove("button--select");
    customInput.classList.add("options__input--select");
})

const resetData = function(){
    dollarInput.classList.remove("options__input--error");
    peopleInput.classList.remove("options__input--error");
    customInput.classList.remove("options__input--error");
    Array.from(alerts).forEach((element) => {
        element.textContent = '';
    });
}

const isZero = function(element, index){
    if(Number(element.value) == 0){
        return putError(element,index, "Can't be zero");
    }
    return true;
};

const putError = function(element, index, message){
    element.classList.add("options__input--error");
    let correct = false
    alerts[index].textContent = message;
    return correct;
}

const validateData = function(){
    let correct = true;

    correct = isZero(peopleInput,1);

    if(isNaN(Number(dollarInput.value))){
        correct = putError(dollarInput,0, 'Insert a number');
    }

    if(customInput.classList.contains("options__input--select")){
        currentPercen = customInput.value;
        if(isNaN(Number(customInput.value))){
            customInput.classList.add("options__input--error");
            correct = false
        }
    } 
    if(!Number.isInteger(Number(peopleInput.value))){
        correct = putError(peopleInput,1, 'Insert a number');
    }

    return correct;
} 

const putResults = function(){
    resetData();
    if(validateData()){
        let firstPartition = (+dollarInput.value / +peopleInput.value);
        let tip = parseFloat(((firstPartition * (+currentPercen)) / 100).toFixed(2))
        tipOutput.value = '$' + tip; 
        totalOutput.value = '$' + parseFloat((firstPartition + +tip).toFixed(2));
    }
}

Array.from(inputs).forEach(element => {
    element.addEventListener('keypress',function(event){
        if(event.key == "Enter"){
            putResults();
        }
    })
})
