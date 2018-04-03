var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");
var buttonStop = document.getElementById("button-stop")
var carrousel = document.getElementById("carrousel");

var imageDiapo = document.getElementById("image-diapo");
var figcationDiapo = document.getElementById("figcaption-diapo")

// CREATION tableau IMAGE
var Image = {
//initialise l'image
	initImage: function (src, alt, description) {
		this.src = src;
		this.alt = alt;
		this.description = description;
	}
};

var image1 = Object.create(Image);
image1.initImage("images/img1.png","diapo 1", "texte explication de la premiere diapo");
var image2 = Object.create(Image);
image2.initImage("images/img2.png","diapo 2", "texte explication de la deuxieme diapo");
var image3 = Object.create(Image);
image3.initImage("images/img3.png","diapo 3", "texte explication de la troisieme diapo"); 
var image4 = Object.create(Image);
image4.initImage("images/img4.png","diapo 4", "texte explication de la quatrieme diapo"); 

// TABLEAU DES IMAGES
var images = [];
images.push(image1);
images.push(image2);
images.push(image3);
images.push(image4);


var Diaporama = {

	// INITIALISE LE DIAPORAMA
	initDiaporama: function(tabImages) {

		this.tabImages = tabImages;
		this.index = 0;

		tabImages.forEach( function() {
			imageDiapo.src = tabImages[0].src;
			imageDiapo.alt = tabImages[0].alt;
			figcationDiapo.textContent = tabImages[0].description;
		});
	},

	// DIAPORAMA VERS LA DROITE
	moveForward: function () {
		if (this.index < this.tabImages.length -1) {
		this.index++;
		imageDiapo.src = this.tabImages[this.index].src;
		imageDiapo.alt = this.tabImages[this.index].alt;
		figcationDiapo.textContent = this.tabImages[this.index].description;
		} else {
			this.index = 0;
			imageDiapo.src = this.tabImages[this.index].src;
			imageDiapo.alt = this.tabImages[this.index].alt;
			figcationDiapo.textContent = this.tabImages[this.index].description;
		}
	},

	// DIAPORAMA VERS LA GAUCHE
	moveBack: function () {
		if (this.index > 0 ){
			this.index--;
			imageDiapo.src = this.tabImages[this.index].src;
			imageDiapo.alt = this.tabImages[this.index].alt;
			figcationDiapo.textContent = this.tabImages[this.index].description;
		} else {
			this.index = this.tabImages.length -1;
			imageDiapo.src = this.tabImages[this.index].src;
			imageDiapo.alt = this.tabImages[this.index].alt;
			figcationDiapo.textContent = this.tabImages[this.index].description;
		}
	},

};

