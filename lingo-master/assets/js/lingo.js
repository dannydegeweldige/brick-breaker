// Definiëren van variabelen
var arrayWoorden = [
    "Ander", "Abuis", "Baard", "Bench", "Bende", "Boord", "Braaf", "Braam", "Brood", "Check", "Drank", "Draag", "Drugs", "Faalt", "Fabel", "Fiets", "Files", "Graaf", "Graan", "Graat",
     "Groen", "Groot", "Hallo", "Hecht", "Jacht", "Jemig", "Nooit", "Paard", "Paars", "Plaag", "Quota", "Schop", "Schot", "Tabak", "Trein", "Trouw", "Vrouw", "Waard", "Wagen", "Water", "Woord",
      "Zagen", "Zomer", "Zucht", "Zwart", "Analyse", "Argument", "Bewijs", "Concept", "Discussie", "Efficiënt", "Feit", "Groei", "Hypothese", 
    "Inzicht", "Jargon", "Kennis", "Logica", "Methode", "Notatie", "Onderzoek", "Patroon", "Quote", "Resultaat", "Samenvatting", "Theorie", "Uitleg", "Variabel", "Waarde", "X-as", 
    "Y-as", "Zin", "Afleiden", "Begrijpen", "Conclusie", "Definitie", "Experimenteren", "Formule", "Grafiek", "Hypothese", "Illustratie", "Jargon", "Kwantitatief", 
    "Logisch", "Model", "Notatie", "Observeren", "Proces", "Quotatie", "Redeneren", "Steekproef", "Theorie", "Uitleggen", "Verklaren", "Waarnemen"
],
    gekozenWoord = [], // Het te raden woord
    invoerPositie = 1, // Houdt bij welke invoer actief is
    maximalePogingen = 5, // Maximum aantal pogingen
    aantalPogingen = 1, // Telt het aantal pogingen
    lettersGoed = 0; // Aantal juiste letters

// Kiezen van een willekeurig woord
var tijdelijkWoord = woordKiezer(); 

for(var i=0; i<tijdelijkWoord.length; i++){
    gekozenWoord.push(tijdelijkWoord.split("")[i].toUpperCase());
};

// De eerste letter toevoegen aan het speelveld
document.getElementsByClassName("huidigeInvoer")[0].value = gekozenWoord[0];

// CSS toewijzen aan de eerste letter
document.getElementsByClassName("huidigeInvoer")[0].classList.add("letterGoed");

// Focus op het volgende element
document.getElementsByClassName("huidigeInvoer")[invoerPositie].focus();

// Woord controleren
function controleWoord(){
    // Ingevoerde letters in een array plaatsen
    var ingevoerdWoord = [];
    for(i=0; i<5; i++) {
        ingevoerdWoord.push(document.getElementsByClassName("huidigeInvoer")[i].value.toUpperCase());
    };

    // Controlelus
    lettersGoed = 0;
    for(i=0; i<5; i++){
        var ingevoerdeLetter = ingevoerdWoord[i];
        verwijderClasses(i); 
        if(ingevoerdeLetter == gekozenWoord[i]){
            letterGoed(i);
        } else {
            letterFout(i);
        };
    };

    // Controlelus voor het aantal pogingen
    if(lettersGoed < 5){
        if(aantalPogingen < maximalePogingen) {
            nieuweBeurt();
            aantalPogingen++;
        } else {
            document.getElementById("resultaat").innerText = "Helaas, het juiste woord is " + tijdelijkWoord.toUpperCase();
            document.getElementById("reload").disabled = false;
        }
    } else {
        document.getElementById("resultaat").innerText = "Perfect, u heeft het woord geraden!";
        document.getElementById("reload").disabled = false;
    };
};

// Ga naar de volgende letter
$("input").keyup(function () {
    var index = $(this).index("input");		 	
    $("input:eq(" + (index +1) + ")").focus().select();
    invoerPositie = index + 1;
});

// Een letter kiezen uit de array
function woordKiezer()  {
    return arrayWoorden[Math.floor(Math.random() * arrayWoorden.length)];
};

function letterCorrectie() {
    document.getElementsByClassName("huidigeInvoer")[invoerPositie - 1].value = "";
    $("input:eq(" + (invoerPositie - 1) + ")").focus().select();
    invoerPositie--;
};

function verwijderClasses(num) {
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterInWoord");
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterGoed");
    document.getElementsByClassName("huidigeInvoer")[num].classList.remove("letterFout");
};

function letterGoed(positie) {
    document.getElementsByClassName("huidigeInvoer")[positie].classList.add("letterGoed");
    lettersGoed++;
};

function letterFout(positie) {
    document.getElementsByClassName("huidigeInvoer")[positie].classList.add("letterFout");
};

function nieuweBeurt() {
    // Rijen en kolommen opbouwen
    let row = document.createElement("div");
    let colom = document.createElement("div")
    row.classList.add("justify-content-center");
    colom.classList.add("col-md-12", "align-self-center", "text-center");
    
    // Letters overbrengen
    for(var i=0; i<5; i++){
        let oudeBeurt = document.createElement('input');
        let actieveLetter = document.getElementsByClassName("huidigeInvoer")[i]
        oudeBeurt.classList.add("letterNormaal");
        oudeBeurt.disabled = true;
        oudeBeurt.maxLength = 1;
        oudeBeurt.type = "text";
        oudeBeurt.value = actieveLetter.value;
        oudeBeurt.classList = actieveLetter.classList;
        oudeBeurt.classList.remove("huidigeInvoer");
        colom.appendChild(oudeBeurt);
        row.appendChild(colom);
        if(actieveLetter.classList.contains("letterGoed") == false){
            verwijderClasses(i);
            actieveLetter.value = "";
            actieveLetter.classList.add("letterNormaal")
        };
    };

    // Nieuwe div toevoegen
    document.getElementById("speelbord").appendChild(row);
    
    // Ga naar de juiste invoer
    document.getElementsByClassName("huidigeInvoer")[1].focus().select();
}

