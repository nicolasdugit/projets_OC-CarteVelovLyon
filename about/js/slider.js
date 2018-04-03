var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");
var buttonStop = document.getElementById("button-stop")
var carrousel = document.getElementById("carrousel");

// CREATION tableau IMAGE
var Image = {
//initialise l'image
	initImage: function (src, alt, id, figureId, description) {
		this.src = src;
		this.alt = alt;
		this.id = id;
		this.figureId = figureId;
		this.description = description;
	}
};

var image1 = Object.create(Image);
image1.initImage("images/img1.png","diapo 1", "diapo1", "figure1", "texte explication de la premiere diapo");
var image2 = Object.create(Image);
image2.initImage("images/img2.png","diapo 2", "diapo2", "figure2", "texte explication de la deuxieme diapo");
var image3 = Object.create(Image);
image3.initImage("images/img3.png","diapo 3", "diapo3", "figure3", "texte explication de la troisieme diapo"); 
var image4 = Object.create(Image);
image4.initImage("images/img4.png","diapo 4", "diapo4", "figure4", "texte explication de la quatrieme diapo"); 

// TABLEAU DES IMAGES
var images = [];
images.push(image1);
images.push(image2);
images.push(image3);
images.push(image4);


//FONCTION CREATION FIGURE
function creationFigure (image) {
	var figureElt = document.createElement("figure");
	figureElt.style.width = "100%";
	figureElt.style.display = "flex";
	figureElt.style.justifyContent = 'space-between';
	figureElt.id = image.id;

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
	figcaptionElt.textContent = image.description;
	figcaptionElt.id = image.figureId;
	return figcaptionElt;
}

//CREATION DU TABLEAU DES DIAPOS
var diapos =[];

var i = 0;
var time = 3000;

var Diaporama = {

	initDiaporama: function() {

		images.forEach( function(image) {
		var figureDiapo = creationFigure(image);
		var imageDiapo = creationImage (image);
		var figcaptionDiapo = creationFigcaption (image);

		figureDiapo.appendChild(imageDiapo);
		figureDiapo.appendChild(figcaptionDiapo);
		diapos.push(figureDiapo);
		});

		carrousel.appendChild(diapos[i]);
		
	},

	moveForward: function () {
		clearInterval(Diaporama.moveAuto);
		if (i< diapos.length -1) {
		carrousel.innerHTML = "";
		carrousel.appendChild(diapos[i+1]);
		i++;
		} else {
			i=0;
			carrousel.innerHTML = "";
			carrousel.appendChild(diapos[i]);
		}
	},

	moveBack: function () {
		clearInterval(Diaporama.moveAuto);
		if (i>0){
		carrousel.innerHTML = "";
		carrousel.appendChild(diapos[i-1]);
		i--;
		} else {
			i=diapos.length -1;
			carrousel.innerHTML = "";
			carrousel.appendChild(diapos[i]);
		}
	},

	moveAuto: function (){

		carrousel.innerHTML = "";
		carrousel.appendChild(diapos[i]);
		if (i< diapos.length -1) {
		i++;
		}  else {
			i =0;
		}
	},

};
