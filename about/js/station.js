var stationTitle = document.getElementById("station-titre");
var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var availableBike = document.getElementById("station-velo-dispo");
var availableStand = document.getElementById("station-emplacement-dispo");
var divInformation = document.getElementById("information");
var nameStationReserved = document.getElementById("station-reserve");
var buttonConfirme = document.getElementById("bouton-confirme"); 
var buttonReserve = document.getElementById("bouton-valider");
var buttonErase = document.getElementById("bouton-efface");
var buttonNewReservation = document.getElementById("bouton-nouvelle-resa");

// CREATION DE L'OBJET STATION QUI RECUPERE ET AFFICHE LES INFOS D'UNE STATION VELOV

var Station = {

	initStation: function(station) {
		this.name = station.name.split("- ")[1];
		this.address = station.address;
		if (station.status === "OPEN") {
			this.status = "ouverte";
		} else if (station.status === "CLOSED") {
			this.status = "fermée";
		}
		this.availableStand = station.available_bike_stands;
		this.availableBike = station.available_bikes;
	},
	//FONCTION QUI AFFICHE LES INFOS D'UNE STATION
	decrireStation: function() {
		// FAIRE ICI LES TEST SUR LES DISPO VELO
		if (this.status === "fermée") {
			buttonNewReservation.style.display = "none";
			buttonConfirme.style.display = "none";
			availableBike.style.display = "none";
			availableStand.style.display = "none";
			statusStation.style.color = "red";
		} else if (this.availableBike === 0) {
			buttonNewReservation.style.display = "none";
			buttonConfirme.style.display = "none";
			availableBike.style.display = "inline";
			availableBike.style.color = "red";
			availableStand.style.display = "inline";
			statusStation.style.color = "green";
		} else {
			if(typeof sessionStorage!='undefined') {
				if('time' in sessionStorage) {
					buttonConfirme.style.display = "none";
					buttonNewReservation.style.display = "flex";
			    } else {
					buttonConfirme.style.display = "flex";
			    }
			} else {
				alert("sessionStorage n'est pas supporté");
			};
			availableBike.style.display = "inline";
			availableStand.style.display = "inline";
			statusStation.style.color = "green";
			availableBike.style.color = "green";
		}

		canvas.style.display = "none";
		buttonReserve.style.display = "none";
		buttonErase.style.display = "none";
		stationTitle.textContent = "STATION : " + this.name;
		addressStation.textContent = this.address;
		// nameStation.textContent = "Vous avez choisi la Station : " + this.name;
		statusStation.textContent = "Cette Station est actuellement : " + this.status;
		availableBike.textContent = "Nombre de vélos disponibles : " + this.availableBike;
		availableStand.textContent = "Emplacements Vides : " + this.availableStand ;
	},
};