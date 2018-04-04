// RECUPERATION DES ELEMENT DU DOM NECESSAIRES
var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");
var imageDiapo = document.getElementById("image-diapo");
var figcationDiapo = document.getElementById("figcaption-diapo")

// CREATION DE L'OBJET IMAGE
var ImageDiaporama = {
// initialise l'image
	initImage: function (src, alt, description) {
		this.src = src;
		this.alt = alt;
		this.description = description;
	}
};
// CREATION DU TABLEAU DES IMAGES
var imagesDiaporama = [];

//CREATION DE L'OBJET DIAPORAMA
var Diaporama = {
	// initialise le diaporama
	initDiaporama: function(tabImages) {
		this.tabImages = tabImages;
		this.index = 0;
		tabImages.forEach( function() {
			imageDiapo.src = tabImages[0].src;
			imageDiapo.alt = tabImages[0].alt;
			figcationDiapo.textContent = tabImages[0].description;
		});
	},
	// méthode déplacement vers la droite
	moveForward: function () {
		if (this.index < this.tabImages.length -1) {
		this.index++;
		} else {
			this.index = 0;
		}
		imageDiapo.src = this.tabImages[this.index].src;
		imageDiapo.alt = this.tabImages[this.index].alt;
		figcationDiapo.textContent = this.tabImages[this.index].description;
	},
	// méthode déplacement vers la gauche
	moveBack: function () {
		if (this.index > 0 ){
			this.index--;
		} else {
			this.index = this.tabImages.length -1;
		}
		imageDiapo.src = this.tabImages[this.index].src;
		imageDiapo.alt = this.tabImages[this.index].alt;
		figcationDiapo.textContent = this.tabImages[this.index].description;
	}
};

