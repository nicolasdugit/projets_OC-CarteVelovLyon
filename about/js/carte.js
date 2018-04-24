var carteVelov = document.getElementById("map");
var stationTitle = document.getElementById("station-titre");
var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var availableBike = document.getElementById("station-velo-dispo");
var availableStand = document.getElementById("station-emplacement-dispo");
var divInformation = document.getElementById("information");
var nameStationReserved = document.getElementById("station-reserve");

//CREATION OBJET CARTE AVEC ZOOM SUR LYON ET MISE EN PLACE DES MARKERS DES STATIONS VELOV
var Carte = {
	lyon: {lat: 45.76, lng: 4.85},
	// tableau qui stocke tous les markers
	markers : [],
	// Initialise la carte
	initCarte: function() {
		map = new google.maps.Map(carteVelov, {
    	zoom: 13,
    	center: this.lyon
    	});
	},
	// Initl=ialise un marker
	initMarker: function(station) {
		// Icone en fonction de l'ouverture ou non de la station
		if (station.status === "OPEN" && station.available_bikes > 0) {
			this.icon = "about/images/pin-open.png";
		} else if (station.status === "OPEN" && station.available_bikes === 0) {
			this.icon = "about/images/pin-close.png";
		} else {
			this.icon = "about/images/pin-work.png";
		}
		// creation du marker googlemap 
		marker = new google.maps.Marker({
			position: station.position,
			status: station.status,
			icon: this.icon,
			map: map,
			idStation: station.number,
			
		});
		// ajout d'un evenement au cloicl sur le marker
		marker.addListener("click", function() { 
			window.scroll(0, 2000);
			// On interroge JCDecaux pour recuperer les infos d'un station en fonction de son numero
			ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + this.idStation + "?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
				oneStation = JSON.parse(reponse);
				Station.initStation(oneStation);
				Station.decrireStation();
    			if (Timer.isOn) {
    			buttonActiveCanvas.textContent = "Nouvelle Réservation";
    			} else {
    				canvas.style.display = "none";
    				buttonReserve.style.display = "none";
    				Signature.erase();
    			}

			})
		});
		// ajout du matrke dans le tableau des markers
		this.markers.push(marker);
	},
	// fontion qui regroupe les markers
	initClustering: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	}
};

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
		this.availableBike = station.available_bikes;
		this.availableStand = station.available_bike_stands;
		if (station.status === "CLOSED" || station.available_bikes === 0) {
			buttonActiveCanvas.style.display = "none";
		} else {
			buttonActiveCanvas.style.display = "flex";
		}
	},
	decrireStation: function() {
		stationTitle.textContent = "STATION " + this.name;
		addressStation.textContent = this.address;
		nameStation.textContent = "Vous avez choisi la Station : " + this.name;
		statusStation.textContent = "Cette Station est actuellement : " + this.status;
		availableBike.textContent = "Nombre de vélos disponibles : " + this.availableBike;
		availableStand.textContent = "Emplacements Vides : " + this.availableStand ;

	},
	reservedStation: function() {
		if(typeof sessionStorage!='undefined') {
  			if('stationNom' in sessionStorage) {
  				nameStationReserved.textContent = sessionStorage.stationNom;
  			} else {
				nameStationReserved.textContent = this.name;
				this.stationNom = nameStationReserved.textContent;
				sessionStorage.setItem("stationNom", this.stationNom);
			} 
		}
	}
};

