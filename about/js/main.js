// CREATION DES IMAGES A L'AIDE DE L'OBJET IMAGE
var image1 = Object.create(ImageDiaporama);
image1.initImage("about/images/img1.png","diapo 1", "texte explication de la premiere diapo");
var image2 = Object.create(ImageDiaporama);
image2.initImage("about/images/img2.png","diapo 2", "texte explication de la deuxieme diapo");
var image3 = Object.create(ImageDiaporama);
image3.initImage("about/images/img3.png","diapo 3", "texte explication de la troisieme diapo"); 
var image4 = Object.create(ImageDiaporama);
image4.initImage("about/images/img4.png","diapo 4", "texte explication de la quatrieme diapo"); 
// MISE EN PLACE DE CHAQUE IMAGE DANS LE TABLEAU IMAGES
imagesDiaporama.push(image1, image2, image3, image4);

// CREATION DU SLIDER AVEC L'OBJET DIAPORAMA
var slider = Object.create(Diaporama);
//INITIALISATION DU SLIDER AVEC LE TABLEAU IMAGES EN PARAMETRE
slider.initDiaporama(imagesDiaporama);

// AJOUT DES EVENEMENENT SUR LES BOUTONS ET FLECHES DIRECTIONNELLES
buttonForward.addEventListener("click", function () {
	slider.moveForward();
});
buttonBack.addEventListener("click", function () {
	slider.moveBack();
});
document.onkeydown = function handleKeyDown(e){
	var key = e.keyCode;
	var Direction;
	switch (key){
		case 37:
			slider.moveBack()
			break;
		case 39:
			slider.moveForward();
			break;
			return;
	};
};


ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
		stationsVelov = JSON.parse(reponse)
    	stationsVelov.forEach( function(station) {
    		var map;
    		Carte.initMarker(station.position, station);
		});
    Carte.clusteringMarker();
});
