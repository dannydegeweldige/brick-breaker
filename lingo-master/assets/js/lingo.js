// Definining variables
var arrayWoorden = [
    "Ander","Abuis","Baard","Bench","Bende","Boord","Braaf","Braam","Brood","Check","Drank","Draag","Drugs","Faalt","Fabel","Fiets","Files","Graaf","Graan","Graat","Groen","Groot","Hallo",
    "Hecht","Jacht","Jemig","Nooit","Paard","Paars","Plaag","Quota","Schop","Schot","Tabak","Trein","Trouw","Vrouw","Waard","Wagen","Water","Woord","Zagen","Zomer","Zucht","Zwart"
],
    gekozenWoord = [], // Word that should be guessed
    invoerPositie = 1, // Keeping track wich input is active
    maximalePogingen = 5, // Maximum attempts
    aantalPogingen = 1, // Keeping count of attempts
    lettersGoed = 0; // Number of letters right

    
//Choosing random word
var tijdelijkWoord = woordKiezer(); 

for(var i=0;i<tijdelijkWoord.length;i++){
    gekozenWoord.push(tijdelijkWoord.split("")[i].toUpperCase());
};

// Adding first letter to playing field
document.getElementsByClassName("huidigeInvoer")[0].value=gekozenWoord[0];

// Assign css to first letter
document.getElementsByClassName("huidigeInvoer")[0].classList.add("letterGoed");

//Focus to next element
document.getElementsByClassName("huidigeInvoer")[invoerPositie].focus();

// Checkeing word
function controleWoord(){
    // Chosen letters to array
    var ingevoerdWoord = [];
    for(i=0;i<5;i++) {
        ingevoerdWoord.push(document.getElementsByClassName("huidigeInvoer")[i].value.toUpperCase());
    };

    // Contole loop
    lettersGoed = 0;
    for(i=0;i<5;i++){
        var ingevoerdeLetter = ingevoerdWoord[i];
        verwijderClasses(i); // Removing classes, thanks Thirza for finding the bug!!!
        if(ingevoerdeLetter == gekozenWoord[i]){
            letterGoed(i);
        } else {
            letterFout(i);
        };
    };

    // Control loop number of attempts
    if(lettersGoed<5){
        if(aantalPogingen<maximalePogingen) {
            nieuweBeurt();
            aantalPogingen++;
        } else {
            document.getElementById("resultaat").innerText="Helaas het juiste woord is " + tijdelijkWoord.toUpperCase();
            document.getElementById("reload").disabled=false;
        }
    } else {
        document.getElementById("resultaat").innerText="Perfect u heeft het woord geraden!";
        document.getElementById("reload").disabled=false;
    };
};

// Goto next letter
$("input").keyup(function () {
    var index = $(this).index("input");		 	
    $("input:eq(" + (index +1) + ")").focus().select();
    invoerPositie=index+1
 });


 // choosing letter from array
function woordKiezer()  {
    return arrayWoorden[Math.floor(Math.random()*arrayWoorden.length)];
    // Scource: Marten Blaauw's Galgje (https://github.com/mcblaauw/Galgje)
};

function letterCorrectie() {
    document.getElementsByClassName("huidigeInvoer")[ invoerPositie- 1].value="";
    $("input:eq(" + (invoerPositie - 1) + ")").focus().select();
    invoerPositie --;
};

function verwijderClasses(num) {
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterInWoord");
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterGoed");
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterFout");
};

function letterGoed(positie) {
    document.getElementsByClassName("huidigeInvoer")[positie].classList.add("letterGoed");
    lettersGoed ++;
};

function letterFout(positie) {
    document.getElementsByClassName("huidigeInvoer")[positie].classList.add("letterFout");
};

function nieuweBeurt() {
    // Building row and colums
    let row = document.createElement("div");
    let colom = document.createElement("div")
    row.classList.add("justify-content-center");
    colom.classList.add("col-md-12", "align-self-center", "text-center");
    
    // Transfer letters
    for(var i=0;i<5;i++){
        let oudeBeurt=document.createElement('input');
        let actieveLetter=document.getElementsByClassName("huidigeInvoer")[i]
        oudeBeurt.classList.add("letterNormaal");
        oudeBeurt.disabled=true;
        oudeBeurt.maxLength=1;
        oudeBeurt.type="text";
        oudeBeurt.value=actieveLetter.value;
        oudeBeurt.classList=actieveLetter.classList;
        oudeBeurt.classList.remove("huidigeInvoer");
        colom.appendChild(oudeBeurt);
        row.appendChild(colom);
        if(actieveLetter.classList.contains("letterGoed")==false){
            verwijderClasses(i);
            actieveLetter.value="";
            actieveLetter.classList.add("letterNormaal")
        };
    };

    // Adding new div
    document.getElementById("speelbord").appendChild(row);
    
    // Goto correct input
    document.getElementsByClassName("huidigeInvoer")[1].focus().select();
}