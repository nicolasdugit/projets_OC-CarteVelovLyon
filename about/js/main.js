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

// CREATION DE LA CARTE VELOV AVEC L'OBJET CARTE
var mapVelov = Object.create(Carte);

// APPEL DE L'API JCDECAUX
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
	allStation = JSON.parse(reponse);
    allStation.forEach( function(station) {
    	// Mise en place de tous les markers sur la carte
    	mapVelov.initMarker(station);
	});
	//Regroupement des markers
    mapVelov.initClustering();
});


buttonConfirme.addEventListener("click", function () {
    canvas.style.display = "flex";
    buttonConfirme.style.display = "none";
});

buttonNewReservation.addEventListener("click", function () {

	if(typeof sessionStorage!='undefined') {
  				newReservation.stopReservation();
  				sessionStorage.setItem("nomStation", nameStation.textContent.split(" : ")[1]);
			if('time' in sessionStorage) {
  				bouttonCancel.style.display = "none";
  				timer.style.display = "none";
  			}
		} else {
  			alert("sessionStorage n'est pas supporté");
		}

	canvas.style.display = "flex";
	buttonNewReservation.style.display = "none";
	bouttonCancel.style.display = "none";
	timer.style.display = "none";
})
// CREATION DE L'ESPACE SIGNATURE AVEC L'OBJET CANVAS
var espaceSignature = Object.create(Canvas);
espaceSignature.initCanvas(canvas);

canvas.addEventListener("mousedown", function (e) {
	painting = true;
	cursorX = (e.pageX - this.offsetLeft) ;
	cursorY = (e.pageY - this.offsetTop);
	espaceSignature.startDraw();
});

canvas.addEventListener("mousemove", function (e) {
	if (painting === true) {
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
		espaceSignature.draw();
	}
});

canvas.addEventListener("mouseup", function () {
	espaceSignature.stopDraw();
	buttonReserve.style.display = "flex"; 
	buttonErase.style.display = "flex";
});

buttonErase.addEventListener("click", function () {
	espaceSignature.erase();
	buttonReserve.style.display = "none";
	buttonErase.style.display = "none";
});

buttonReserve.addEventListener("click", function () {
	// CREATION D'UNE NOUVELLE RESERVATION
	newReservation = Object.create(Reservation);
    newReservation.initReservatation("20:00", sessionStorage.getItem("nomStation"));
    // ON SUPPRIME L'ESPACE SIGNATURE, LE CANVAS ET LE BOUTON
    espaceSignature.erase();
    buttonReserve.style.display = "none";
    buttonErase.style.display = "none";
    canvas.style.display = "none";
    rebours.textContent = "20:00"; 	

	buttonConfirme.style.display = "none";
	canvas.style.display = "none";
	bouttonCancel.style.display = "flex";
	timer.style.display = "flex";

});

bouttonCancel.addEventListener("click", function() {
	newReservation.stopReservation();
	bouttonCancel.style.display = "none";
	timer.style.display = "none";
});

if(typeof sessionStorage!='undefined') {
	if('time' in sessionStorage) {
		buttonConfirme.style.display = "none";
		timer.style.display = "flex";
		bouttonCancel.style.display = "flex";
		newReservation = Object.create(Reservation);
    	newReservation.initReservatation(sessionStorage.getItem("time"), sessionStorage.getItem("nomStation"));

    } else {
		timer.style.display = "none";
    }
} else {
	alert("sessionStorage n'est pas supporté");
};