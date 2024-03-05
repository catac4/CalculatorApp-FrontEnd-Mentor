
const offerts = new Map();
offerts.set(0,["10k",8]);
offerts.set(1,["50K",12]);
offerts.set(2,["100K",16]);
offerts.set(3,["500K",24]);
offerts.set(4,["1M",36]);

const timeButtons = document.getElementsByClassName("changer__button");
const changeTime = document.querySelector(".pricer__time-mode");
const circle = document.querySelector(".pricer__circle");
const slider = document.querySelector(".pricer__range");
const views = document.querySelector(".pricer__views");
const valueSelect = document.querySelector(".pricer__value");
const changer = document.querySelector(".pricer__changer");
let currentMode = 0;

const typesTime = new Map();
typesTime.set(0,["/ month", 3, 0]);
typesTime.set(1,["/ year", +changer.offsetWidth - +circle.offsetWidth - 3, 25]);


Array.from(timeButtons).forEach((btt,index) =>{
    btt.addEventListener("click", () => {
        circle.style.left = typesTime.get(index)[1] +'px';
        currentMode = index
        setCostValue();
    })
});

window.addEventListener('resize', () => {
    typesTime.set(1,["/ year", +changer.offsetWidth - +circle.offsetWidth - 3, 25]);
    circle.style.left = typesTime.get(currentMode)[1] +'px';
}, true);

const setCostValue = function(){
    let curr = Math.ceil(slider.value/20) -1;
    views.innerText = offerts.get(curr)[0] + " pageviews";
    let newVal = (offerts.get(curr)[1] - (offerts.get(curr)[1]*typesTime.get(currentMode)[2]/100)); 
    valueSelect.innerText = "$" + newVal + ".00";
    let perValue = slider.value;
    slider.style.background = "linear-gradient(90deg,hsl(174, 77%, 80%) "+perValue+"%, #EBF0F9 " +perValue+"%)";
}

setCostValue();

slider.addEventListener("input", () =>{
    setCostValue();
})

