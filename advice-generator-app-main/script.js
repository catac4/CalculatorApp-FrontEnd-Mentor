const btt = document.querySelector(".advicer__button");
const number = document.querySelector(".advicer__number");
const text = document.querySelector(".advicer__text");

const setAdvice = async function(){
    try{
        const result = await fetch("https://api.adviceslip.com/advice", {cache: "no-cache",});
        const data = await result.json();
        number.innerText = "ADVICE #"+data.slip.id;
        text.innerText = "\“"+data.slip.advice+"\”";
    }catch(ex){
        console.log("Error: "+ ex);
    }
}

btt.addEventListener("click", setAdvice);