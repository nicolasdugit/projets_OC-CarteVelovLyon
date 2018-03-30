// CREATION IMAGE
var Image = {
//initialise la diapo
	initDiapo: function (src, alt) {
		this.src = src;
		this.alt = alt;
	}
};

var image1 = Object.create(Image);
image1.initDiapo("images/diapo1.png","diapo 1");
var image2 = Object.create(Image);
image2.initDiapo("images/diapo2.png","diapo 2");
var image3 = Object.create(Image);
image3.initDiapo("images/diapo3.png","diapo 3"); 
var image4 = Object.create(Image);
image4.initDiapo("images/diapo4.png","diapo 4"); 

// TABLEAU DES IMAGES
var images = [];
images.push(image1);
images.push(image2);
images.push(image3);
images.push(image4);


var sliderContainer = document.getElementById("move");
sliderContainer.style.width = images.length*100 + "%";


//FONCTION CREATION FIGURE
function creationFigure (image) {
	var figureElt = document.createElement("figure");
	figureElt.style.width = 100/images.length +"%";
	figureElt.style.display = "flex";
	figureElt.style.justifyContent = 'space-between';

	return figureElt;
}

//FONCTION CREATION IMG
function creationImage (image) {
	var imageElt = document.createElement("img");
	imageElt.style.position = "relative";
	imageElt.style.width = "50%";
	imageElt.style.height = "400px";
	imageElt.src = image.src;
	imageElt.alt = image.alt;
	
	return imageElt;
}

//FONCTION CREATION FIGCAPTION
function creationFigcaption (image) {
	var figcaptionElt = document.createElement("figcaption");
	figcaptionElt.style.position = "relative";
	figcaptionElt.textContent = image.alt;
	return figcaptionElt;
}

// Parcours de la liste des images et ajout d'un élément pour chaque image
images.forEach( function(image) {
	var figureDiapo = creationFigure(image);
	var imageDiapo = creationImage (image);
	var figcaptionDiapo = creationFigcaption (image);

	figureDiapo.appendChild(imageDiapo);
	figureDiapo.appendChild(figcaptionDiapo);
	move.appendChild(figureDiapo);
});




