//LISTE DES DIAPOSITIVES

var diapositives = [
    {
        url: "images/diapo1.png",
        titretitre: "diapo 1",
        alt: "diapo 1",
        id: "diapo1"
    },
    {
    	url: "images/diapo2.png",
        titre: "diapo 2",
        alt: "diapo 2",
        id: "diapo2"
    },
    {
        url: "images/diapo3.png",
        titre: "diapo 3",
        alt: "diapo 3",
        id: "diapo3"
    },
    {
        url: "images/diapo4.png",
        titre: "diapo 4",
        alt: "diapo 4",
        id: "diapo4"
    }
]
var sliderContainer = document.getElementById("move");
sliderContainer.style.width = diapositives.length*100 + "%";


//FONCTION CREATION FIGURE
function creationFigure (diapositive) {
	var figureElt = document.createElement("figure");
	figureElt.style.width = 100/diapositives.length +"%";
	figureElt.style.display = "flex";
	figureElt.style.justifyContent = 'space-between';

	return figureElt;
}

//FONCTION CREATION IMG
function creationImage (diapositive) {
	var imageElt = document.createElement("img");
	imageElt.src = diapositive.url;
	imageElt.alt = diapositive.alt;
	
	return imageElt;
}

//FONCTION CREATION FIGCAPTION
function creationFigcaption (diapositive) {
	var figcaptionElt = document.createElement("figcaption");
	figcaptionElt.textContent = diapositive.alt;
	return figcaptionElt;
}

// Parcours de la liste des diapositives et ajout d'un élément pour chaque diapositive
diapositives.forEach( function(diapositive) {
	var figure = creationFigure(diapositive);
	var image = creationImage (diapositive);
	var figcaption = creationFigcaption (diapositive);

	figure.appendChild(image);
	figure.appendChild(figcaption);
	move.appendChild(figure);
});




