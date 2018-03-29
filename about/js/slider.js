var diapositives = [
    {
        "url": "images/diapo1.png",
        "titre": "diapo 1",
        "alt": "diapo 1",
        "id": "diapo1"
    },
    {
    	"url": "images/diapo2.png",
        "titre": "diapo 2",
        "alt": "diapo 2",
        "id": "diapo2"
    },
    {
        "url": "images/diapo3.png",
        "titre": "diapo 3",
        "alt": "diapo 3",
        "id": "diapo3"
    },
    {
        "url": "images/diapo4.png",
        "titre": "diapo 4",
        "alt": "diapo 4",
        "id": "diapo4"
    }
]

var instructionElt = document.getElementById("instruction");
instructionElt.style.overflow = 'hidden';

//PARAMETRAGE DE LA DIV SLIDER
var sliderElt = document.getElementById("slider");
var nombreDiapo = diapositives.length;
sliderElt.style.width = nombreDiapo * 100 +"%";
sliderElt.style.minHeigth = "200px";
sliderElt.style.display = "flex";
sliderElt.style.position = "relative";


//FONCTION DE CREATION DU TEXTE EXPLICATIF
function texteExplicatif (titre) {
	this.titre = titre;
}

//INTEGRATION DES DIAPOSITIVES DANS LE SLIDER
diapositives.forEach( function(diapositive) {
	var diapoElt = document.createElement("figure");
	diapoElt.style.backgroundColor = 'grey';
	diapoElt.style.width =100 / nombreDiapo + '%';
	diapoElt.style.margin = '0';
	diapoElt.style.padding = '0';
	diapoElt.style.display = "flex";
	diapoElt.style.minHeight = '200px';
	diapoElt.id = diapositive.id;


	var textDiapo = document.createElement("figcaption");
	textDiapo.textContent= diapositive.titre;

	var imageDiapo = document.createElement("img");
	imageDiapo.src = diapositive.url;
	imageDiapo.alt = diapositive.alt;
	imageDiapo.style.width ='50%';
	imageDiapo.style.height = "200px";
	
	diapoElt.appendChild(imageDiapo);
	diapoElt.appendChild(textDiapo);
	sliderElt.appendChild(diapoElt);
});


//CREATION DES BOUTONS D'ACTION
var divButton = document.createElement("div");
var buttonBack = document.createElement("button");
buttonBack.textContent = "Précédent";

var buttonForward = document.createElement("button");
buttonForward.textContent = "Suivant";
divButton.appendChild(buttonForward);
divButton.appendChild(buttonBack);

instructionElt.appendChild(divButton);

