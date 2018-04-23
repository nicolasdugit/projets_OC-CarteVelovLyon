var carteVelov = document.getElementById("map");
var stationTitle = document.getElementById("station-titre");
var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var availableBike = document.getElementById("station-velo-dispo");
var availableStand = document.getElementById("station-emplacement-dispo");
var divInformation = document.getElementById("information");


var nameStationReserved = document.getElementById("station-reserve");

var Carte = {
	lyon: {lat: 45.76, lng: 4.85},
	markers : [],
	// Initialisela carte
	initCarte: function() {
		map = new google.maps.Map(carteVelov, {
    	zoom: 13,
    	center: this.lyon
    	});
	},

	initMarker: function(station) {
		if (station.status === "OPEN" && station.available_bikes > 0) {
			this.icon = "about/images/pin-open.png";
		} else if (station.status === "OPEN" && station.available_bikes === 0) {
			this.icon = "about/images/pin-close.png";
		} else {
			this.icon = "about/images/pin-work.png";
		}
		marker = new google.maps.Marker({
			position: station.position,
			status: station.status,
			icon: this.icon,
			map: map,
			idStation: station.number,
			
		});
		marker.addListener("click", function() { 
			// map.setCenter(this.position);
			ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + this.idStation + "?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
				oneStation = JSON.parse(reponse);
				Station.initStation(oneStation);
				Station.decrireStation();
			})
		});
		this.markers.push(marker);
	},

	initClustering: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	}
};

var Station = {
	initStation: function(station) {
		this.name = station.name.split(" - ")[1];
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
};

// var Storage = {
// 	initStorage: function (station) {
// 		sessionStorage.stationName = station.name.split(" - ")[1];
// 		console.log(sessionStorage.stationName)
// 	}
// };






/*
var Marqueur = {
	icon: null,

	initMarker: function (infoStation) {
		var idStation = infoStation.number;

		if (infoStation.available_bikes>0) {	    
			this.icon = "about/images/pin-open.png"; 
		} else if (infoStation.status != "OPEN") {
			this.icon = "about/images/pin-work.png";
		} else {
			this.icon = "about/images/pin-close.png";
		}
		var marker = new google.maps.Marker({
			    position: infoStation.position,
			    icon: this.icon,
			    map: map
		});
		var stationNom ;
		
		marker.addListener("click", function() {
			if (rebours.textContent !== "") {
				buttonActiveCanvas.textContent = "Annuler reservation en cours";
			} 





			ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + idStation + "?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
				infoSta = JSON.parse(reponse);
				if (infoSta.status === "OPEN") {
					closedStation.style.display = "";
					


					if(typeof sessionStorage!='undefined') {
  						if('time' in sessionStorage) {
  							nameStationReserved.textContent = sessionStorage.stationNom;
  						} else {
					nameStationReserved.textContent = infoSta.name;
					nameStationReserved.textContent = nameStationReserved.textContent.split("-")[1];
					this.stationNom = nameStationReserved.textContent;
					sessionStorage.setItem("stationNom", this.stationNom);
				} }
				
					buttonActiveCanvas.style.display = "flex";
					divInformation.style.display = "flex";
					stationTitle.textContent = infoSta.name;
					stationTitle.textContent = stationTitle.textContent.split("-")[1];
					nameStation.textContent = infoSta.name;
					nameStation.textContent = nameStation.textContent.split("-")[1];
					addressStation.textContent = infoSta.address;
					bikeStation.textContent = infoSta.available_bikes;
				    statusStation.textContent = "ouverte";
				    statusStation.style.color = "green";
				}  
				if (infoSta.status === "CLOSED") {
					closedStation.style.display = "none";	
					divInformation.style.display = "flex";
					stationTitle.textContent = infoSta.name;
					stationTitle.textContent = stationTitle.textContent.split("-")[1];
					nameStation.textContent = infoSta.name;
					nameStation.textContent = nameStation.textContent.split("-")[1];
					addressStation.textContent = infoSta.address;
					bikeStation.textContent = infoSta.available_bikes;
					statusStation.textContent = "fermée";
					statusStation.style.color = "red";
				}
				else if (infoSta.available_bikes === 0) {
					closedStation.style.display = "";
					buttonActiveCanvas.style.display = "none";
				}
				emptyStation.textContent = infoSta.available_bike_stands;
				canvas.style.display = "none";
			});
		
		});
		markers.push(marker);
	}


};

var clusteringMarker = {
	initClustering: function () {
		markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'about/images/m'});
	}
};

*/


