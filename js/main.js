// RECUPERATION DES ELEMENT DU DOM NECESSAIRES
var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");
var imageDiapo = document.getElementById("image-diapo");
var figcationDiapo = document.getElementById("figcaption-diapo")
var carteVelov = document.getElementById("map");
var stationTitle = document.getElementById("station-titre");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var availableBike = document.getElementById("station-velo-dispo");
var availableStand = document.getElementById("station-emplacement-dispo");
var divInformation = document.getElementById("information");
var nameStationReserved = document.getElementById("station-reserve");
var buttonReserve = document.getElementById("bouton-confirme"); 
var buttonConfirme = document.getElementById("bouton-valider");
var buttonErase = document.getElementById("bouton-efface");
var rebours = document.getElementById("rebours");
var timer = document.getElementById("timer");
var bouttonCancel = document.getElementById("bouton-annuler");
var canvas = document.getElementById("signature");
var toHome = document.getElementById("to-home");
var toReservation = document.getElementById("to-reservation");
var reservation = document.getElementById("reservation");
// ------------------------------- //
// ----------- HEADER ----------- //
// ----------------------------- //
// MENU NAVIGATON
toHome.addEventListener("click", function () {
	window.scrollTo(0,0);
});
toReservation.addEventListener("click", function () {
	reservation.scrollIntoView({behavior: "smooth"});
});
// ------------------------------ //
// ----------- SLIDER ---------- //
// ---------------------------- //
// CREATION DU TABLEAU DES IMAGES
var imagesDiaporama = [];
// CREATION DES IMAGES A L'AIDE DE L'OBJET IMAGE
var image1 = Object.create(ImageDiaporama);
image1.initImage("images/diapo1.png","diapo 1", "Bienvenue sur le site de RésaVélo'V, service de location de velo sur la ville de Lyon. Première visite ? Suivez le guide pas à pas. Utilisez les fleches directionnelles pour actionner le diaporama");
var image2 = Object.create(ImageDiaporama);
image2.initImage("images/diapo2.png","diapo 2", "Selectionnez votre station Vélo'V. Les marqueurs verts indiquent une station ouverte avec vélo diponible, les rouges une station ouverte mais sans vélo disponible. Les stations fermées sont repérées par une icone travaux. Une fois la station selectionnée, cliquez sur réserver.");
var image3 = Object.create(ImageDiaporama);
image3.initImage("images/diapo3.png","diapo 3", "Vous devez maintenant signer dans la zone de signature pour valider votre réservation."); 
var image4 = Object.create(ImageDiaporama);
image4.initImage("images/diapo4.png","diapo 4", "Votre vélo est maintenant reservé pour une durée de 20 min. Si cette reservation ne vous convient plus, vous pouvez l'annuler. Bonne promenade ! "); 
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
// ------------------------------ //
// ----------- CARTE ----------- //
// ---------------------------- //
// CREATION DE LA CARTE VELOV AVEC L'OBJET CARTE
var mapVelov = Object.create(Carte);  //mapVelov.initCarte est appelée dans index.html
// APPEL DE L'API JCDECAUX POUR MISE EN PLACE DES MARKERS DES STATIONS
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
	allStation = JSON.parse(reponse);
    allStation.forEach( function(station) {
    	// Mise en place de tous les markers sur la carte
    	mapVelov.initMarker(station);
	});
	//Regroupement des markers
    mapVelov.initClustering();
});
// ----------------------------------- //
// -------------  CANVAS ------------ //
// --------------------------------- //
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
	buttonConfirme.style.display = "flex"; 
	buttonErase.style.display = "flex";
});
canvas.addEventListener("touchstart", function(e) {
	e.preventDefault();
	espaceSignature.handleStart(e);
});
canvas.addEventListener("touchend", function(e) {
	e.preventDefault();
	espaceSignature.handleEnd(e);
    buttonConfirme.style.display = "flex";
    buttonErase.style.display = "flex";
    buttonConfirme.scrollIntoView({behavior: "smooth"});
});
canvas.addEventListener("touchcancel", function(e) {
	e.preventDefault();
	espaceSignature.handleCancel(e);
});
canvas.addEventListener("touchleave", function(e) {
	e.preventDefault();
	espaceSignature.handleEnd(e);
});
canvas.addEventListener("touchmove", function(e) {
	e.preventDefault();
	espaceSignature.handleMove(e);
});
// BOUTON QUI EFFACE LA SIGNATURE
buttonErase.addEventListener("click", function () {
	espaceSignature.erase();
	buttonConfirme.style.display = "none";
	buttonErase.style.display = "none";
});
// --------------------------------------- //
// ------------ RESA STATION ------------ //
// ------------------------------------- //
// PRE CONFIRMATION RESERVATION AVANT SIGNATURE
buttonReserve.addEventListener("click", function () {
	 // Si reservation active
	if(typeof sessionStorage!='undefined') {
		if('time' in sessionStorage) {
  			newReservation.stopReservation(); // annulaion reservation en cours
  		} else {
    		buttonReserve.style.display = "none"; // Disparition bouton confirmation
  			}
 	} else {
  		alert("sessionStorage n'est pas supporté");
	}
    sessionStorage.setItem("nomStation", stationTitle.textContent.split(" : ")[1]); //Stockage nom de la station
	canvas.style.display = "flex"; //Espace signature apparait
    canvas.scrollIntoView({behavior: "smooth"}); // Déplacement de l'ecran sur l'espace signature
});
// BOUTON VALIDATION DE LA RESERVATION
buttonConfirme.addEventListener("click", function () {
	// CREATION D'UNE NOUVELLE RESERVATION
	newReservation = Object.create(Reservation);
    newReservation.initReservation("01:00", sessionStorage.getItem("nomStation"));
    rebours.textContent = newReservation.time; // Affichage du temps initial
    espaceSignature.erase(); // Effacement signature
});
// BOUTON ANNULATION DE LA RESERVATION EN COURS
bouttonCancel.addEventListener("click", function() {
	newReservation.stopReservation();
	reservation.scrollIntoView({behavior: "smooth"});
});
// AU RAFFRAICHISSEMENT DE LA PAGE SI RESERVATION ACTIVE
if(typeof sessionStorage!='undefined') {
	if('time' in sessionStorage) {
		newReservation = Object.create(Reservation);
    	newReservation.initReservation(sessionStorage.getItem("time"), sessionStorage.getItem("nomStation"));
    }  
} else {
	alert("sessionStorage n'est pas supporté");
};