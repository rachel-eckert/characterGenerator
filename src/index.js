window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed')
    let btn = document.getElementById("clickMe");
    btn.addEventListener("click", calcAttributes) //callbacks
    btn.addEventListener("mouseover", hoverButton)
    btn.addEventListener("mouseout", hoverOff)
    getClasses()
});

function hoverButton() {
    document.getElementById("clickMe").style.background = "white";
}
function hoverOff() {
    document.getElementById("clickMe").style.background = "rgb(192, 192, 255)";
}
function getClasses() {
    fetch("https://www.dnd5eapi.co/api/classes/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            arrClasses = data.results; //declaration here
        })
} 

let arrClasses = [];
let arrRace = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-elf",
    "Halfling",
    "Half-orc",
    "Human",
    "Tiefling"
];

const abilityScore = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

function calcAttributes() {

   let randomRace =
        arrRace[Math.floor(Math.random() * arrRace.length)];
    console.log(randomRace)
     document.getElementById("race-info").innerText = randomRace;
    
    console.log("arrclasses=" + arrClasses);
    let randomClass =
        arrClasses[Math.floor(Math.random() * arrClasses.length)].name;
    console.log(randomClass)
    document.getElementById("class-info").innerText = randomClass;

    abilityScore.forEach(getAbilityScore)
    calcHitPoints(randomClass);
    // call hitPoints with constitution
}
function getAbilityScore(ability) {
    max = 2
    min = 19
    let score = Math.floor((Math.random() * (max + 1 - min)) + min)
    console.log(ability + " score = " + score)
    document.getElementById("score-" + ability).innerText = score;
//Lowest ability score is 3, highest is 18. Consider reversing max and min so it makes sense
}

function hitPoints(x) {
    let consti = parseInt(document.getElementById("score-constitution").innerText);
    let hPoint = x + consti;
    console.log("hitPoints x=" + x + " consti=" + consti)
    document.getElementById("hp-info").innerText = hPoint
}
function calcHitPoints(arrClass) {
    switch (arrClass) {
        case "Barbarian":
            hitPoints(12);
            break;
        case "Bard":
        case "Cleric":
        case "Druid":
        case "Monk":
        case "Rogue":
        case "Warlock":
            hitPoints(8);
            break;
        case "Sorcerer":
        case "Wizard":
            hitPoints(6);
            break;
        case "Fighter":
        case "Paladin":
        case "Ranger":
            hitPoints(10);
            break;
    }
}
