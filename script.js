AOS.init({
duration:1000,
once:true
});

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("theme","dark");
}
else{
localStorage.setItem("theme","light");
}

});
const words = [
"AI Summaries",
"AI Flashcards",
"AI Quizzes",
"AI Learning"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect(){

const currentWord = words[wordIndex];

if(!isDeleting){
typingElement.textContent =
currentWord.substring(0,charIndex+1);

charIndex++;

if(charIndex === currentWord.length){
isDeleting = true;
setTimeout(typeEffect,1500);
return;
}
}
else{

typingElement.textContent =
currentWord.substring(0,charIndex-1);

charIndex--;

if(charIndex === 0){
isDeleting = false;
wordIndex = (wordIndex + 1) % words.length;
}
}

setTimeout(typeEffect,isDeleting ? 60 : 120);
}

typeEffect();

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = +counter.dataset.target;

    const updateCounter = () => {

        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText =
            target.toLocaleString();

        }
    };

    updateCounter();
};

const observer = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter(entry.target);

observer.unobserve(entry.target);

}

});

},
{
threshold:0.5
}
);

counters.forEach(counter=>{
observer.observe(counter);
});
