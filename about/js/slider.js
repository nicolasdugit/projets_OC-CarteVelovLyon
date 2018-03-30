
/*------------------LES DIAPOSITIVES CORRESPONDENT AUX IMAGES--------------------*/
/*------------------A FAIRE : FAIRE EN SORTE QUE LES DIAPOSITIVES CORRESPONDENT AUX FIGURES--------------------*/


// CREATION DIAPOSITIVES
var Diapo = {
//initialise la diapo
	initDiapo: function (src, alt) {
		this.src = src;
		this.alt = alt;
	}
};

var diapo1 = Object.create(Diapo);
diapo1.initDiapo("images/diapo1.png","diapo 1");
var diapo2 = Object.create(Diapo);
diapo2.initDiapo("images/diapo2.png","diapo 2");
var diapo3 = Object.create(Diapo);
diapo3.initDiapo("images/diapo3.png","diapo 3"); 
var diapo4 = Object.create(Diapo);
diapo4.initDiapo("images/diapo4.png","diapo 4"); 

// TABLEAU DES DIAPOSITIVES
var diapositives = []
diapositives.push(diapo1);
diapositives.push(diapo2);
diapositives.push(diapo3);
diapositives.push(diapo4);


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
	imageElt.style.position = "relative";
	imageElt.style.width = "50%";
	imageElt.style.height = "400px";
	imageElt.src = diapositive.src;
	imageElt.alt = diapositive.alt;
	
	return imageElt;
}

//FONCTION CREATION FIGCAPTION
function creationFigcaption (diapositive) {
	var figcaptionElt = document.createElement("figcaption");
	figcaptionElt.style.position = "relative";
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




