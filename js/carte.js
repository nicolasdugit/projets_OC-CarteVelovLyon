//CREATION OBJET CARTE AVEC ZOOM SUR LYON ET MISE EN PLACE DES MARKERS DES STATIONS VELOV
var Carte = {
	// coordonnées gps ville de lyon
	city: {lat: 45.76, lng: 4.85},
	// tableau qui stocke tous les markers
	markers : [],
	// Initialise la carte
	initCarte: function() {
		map = new google.maps.Map(carteVelov, {
    	zoom: 13,
    	center: this.city
    	});
	},
	// Initialise un marker
	initMarker: function(station) {
		// Icone en fonction de l'ouverture ou non de la station
		if (station.status === "OPEN" && station.available_bikes > 0) {
			this.icon = "images/pin-open.png";
		} else if (station.status === "OPEN" && station.available_bikes === 0) {
			this.icon = "images/pin-close.png";
		} else {
			this.icon = "images/pin-work.png";
		}
		// creation du marker googleMap 
		marker = new google.maps.Marker({
			position: station.position,
			status: station.status,
			icon: this.icon,
			map: map,
			idStation: station.number
		});
		// ajout d'un evenement au click sur le marker
		marker.addListener("click", function() { 
			stationTitle.scrollIntoView({behavior: "smooth", block: "start"});
			// On interroge JCDecaux pour recuperer les infos d'une station en fonction de son numero
			ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + this.idStation + "?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
				// CREATION D'UNE STATION VELOV AVEC L'OBJET STATION
				infoStation = JSON.parse(reponse);
				var stationVelov = Object.create(Station);
				stationVelov.initStation(infoStation);
				stationVelov.decrireStation();
			})
		});
		// ajout du marker dans le tableau des markers
		this.markers.push(marker);
	},
	// fonction qui regroupe les markers
	initClustering: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'images/m'});
	}
};