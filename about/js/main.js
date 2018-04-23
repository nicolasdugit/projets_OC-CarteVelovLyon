// CREATION DU TABLEAU DES IMAGES
var imagesDiaporama = [];
// CREATION DES IMAGES A L'AIDE DE L'OBJET IMAGE
var image1 = Object.create(ImageDiaporama);
image1.initImage("about/images/diapo1.png","diapo 1", "Bienvenue sur le site de Résavélo'v, service de location de velo sur la ville de lyon. Première visite ? Suivez le guide pas à pas. Utilisez les fleches directionnelles pour actionner le diaporama");
var image2 = Object.create(ImageDiaporama);
image2.initImage("about/images/diapo2.png","diapo 2", "Selectionnez votre station Vélo'V. Les marqueurs verts indiquent une station ouverte avec vélo diponible, les rouges une station mais sans vélo disponible. Les stations fermées sont repérées par une icone travaux. Une fois la station selectionnée, cliquez sur reserver.");
var image3 = Object.create(ImageDiaporama);
image3.initImage("about/images/diapo3.png","diapo 3", "Vous devez maintenant signer dans la zone de signature pour valider votre réservation."); 
var image4 = Object.create(ImageDiaporama);
image4.initImage("about/images/diapo4.png","diapo 4", "Votre vélo est maintenant reservé pour une durée de 20 min. Si cette reservation ne vous convient plus, vous pouvez l'annuler. Bonne promenade ! "); 
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
			slider.moveBack();
			break;
		case 39:
			slider.moveForward();
			break;
			return;
	};
};

// APPEL DE L'API JCDECAUX
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
	allStation = JSON.parse(reponse);
    allStation.forEach( function(station) {
    	Carte.initMarker(station);
	});
    Carte.initClustering();
});
Station.reservedStation();

buttonActiveCanvas.addEventListener("click", function () {
    Signature.erase();
    canvas.style.display = "flex";
    buttonActiveCanvas.style.display = "none";
    if (Timer.isOn) {
        Reservation.stopReservation();
    }
});
// CREATION DE L'ESPACE SIGNATURE NOMME CANVAS AVEC L'OBJET PAINT
Signature.initPaint(canvas);

canvas.addEventListener("mousedown", function (e) {
	painting = true;
	cursorX = (e.pageX - this.offsetLeft) ;
	cursorY = (e.pageY - this.offsetTop);
	Signature.startDraw();
});

canvas.addEventListener("mousemove", function (e) {
	if (painting === true) {
		cursorX = (e.pageX - this.offsetLeft) ;
		cursorY = (e.pageY - this.offsetTop);
		Signature.draw();
	}
});

canvas.addEventListener("mouseup", function () {
	Signature.stopDraw();
});

buttonReserve.addEventListener("click", function () {
    Reservation.initReservatation();
});

bouttonCancel.addEventListener("click", function() {
    Reservation.stopReservation();
})



