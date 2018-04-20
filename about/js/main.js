// CREATION DU TABLEAU DES IMAGES
var imagesDiaporama = [];
// CREATION DES IMAGES A L'AIDE DE L'OBJET IMAGE
var image1 = Object.create(ImageDiaporama);
image1.initImage("about/images/diapo1.png","diapo 1", "Bienvenue sur le site de Résavélo'v, service de location de velo sur la ville de lyon. Première visite ? Suivez le guide pas à pas");
var image2 = Object.create(ImageDiaporama);
image2.initImage("about/images/diapo2.png","diapo 2", "Selectionner votre station Vélo'V. Les marqueurs verts indiquent une station ouverte avec vélo diponible, les rouges une station ouvertes mais sans vélo disponible.");
var image3 = Object.create(ImageDiaporama);
image3.initImage("about/images/diapo3.png","diapo 3", "Une fois votre station selectionnée, vous pouvez y reserver un vélo en cliquant sur le bouton prevu  cet effet"); 
// var image4 = Object.create(ImageDiaporama);
// image4.initImage("about/images/img4.png","diapo 4", "texte explication de la quatrieme diapo"); 
// MISE EN PLACE DE CHAQUE IMAGE DANS LE TABLEAU IMAGES
imagesDiaporama.push(image1, image2, image3);

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
			slider.moveBack();
			buttonBack.style.backgroundColor = "rgb(0,180,204)";
			setTimeout(slider.colorButton, 150);
			break;
		case 39:
			slider.moveForward();
			buttonForward.style.backgroundColor = "rgb(0,180,204)";
			setTimeout(slider.colorButton, 150);
			break;
			return;
	};
};


var markers = [];
// APPEL DE L'API JCDECAUX
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
	stationsVelov = JSON.parse(reponse);

	var marqueur = Object.create(Marqueur);

    stationsVelov.forEach( function(station) {
    	marqueur.initMarker(station);
		
	});

    clusteringMarker.initClustering();
    
});

buttonActiveCanvas.addEventListener("click", function () {
	canvasSignature.erase();
	canvas.style.display = "flex";
	buttonActiveCanvas.style.display = "none";
	if (rebours.textContent !== ""){
		Timer.resetTimer();
	}
});

// CREATION DE L'ESPACE SIGNATURE NOMME CANVAS AVEC L'OBJET PAINT
var canvasSignature = Object.create(Paint);
canvasSignature.initPaint(canvas);

canvas.addEventListener("mousedown", function (e) {
	painting = true;
	cursorX = (e.pageX - this.offsetLeft) ;
	cursorY = (e.pageY - this.offsetTop);
	canvasSignature.startDraw();
});

canvas.addEventListener("mousemove", function (e) {
	if (painting === true) {
		cursorX = (e.pageX - this.offsetLeft) ;
		cursorY = (e.pageY - this.offsetTop);
		canvasSignature.draw();
	}
});

canvas.addEventListener("mouseup", function () {
	painting = false;
	buttonReserve.style.display = "flex";
});

if(typeof sessionStorage!='undefined') {
  if('time' in sessionStorage) {
    // alert("Message récupéré");
    var tempsRestant = sessionStorage.time;
    Timer.initTimer(tempsRestant);
    timer.style.display = "flex";
    
  } else {
  	tempsRestant = "20:00";
  }
} else {
  alert("sessionStorage n'est pas supporté");
}

buttonReserve.addEventListener("click", function () {
    buttonReserve.style.display = "none";
    canvasSignature.erase();
    canvas.style.display = "none";
    nameStationReserved.style.display = "inline";
    timer.style.display = "flex";
    rebours.textContent = "20:00";
	Timer.initTimer(tempsRestant);
});




