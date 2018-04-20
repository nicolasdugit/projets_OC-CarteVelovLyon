var stationTitle = document.getElementById("station-titre");
var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var bikeStation = document.getElementById("station-velo-dispo");
var emptyStation = document.getElementById("station-emplacement-dispo");
var carteVelov = document.getElementById("map");

var divInformation = document.getElementById("information");
divInformation.style.display = "none";

var closedStation = document.getElementById("station-ferme");

var nameStationReserved = document.getElementById("station-reserve");

var Carte = {
	lyon: {lat: 45.76, lng: 4.85},
	// Initialisela carte
	initCarte: function() {
		map = new google.maps.Map(carteVelov, {
    	zoom: 13,
    	center: this.lyon
    	});
	},
};

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
		
		marker.addListener("click", function() {
			if (rebours.textContent !== "") {
				buttonActiveCanvas.textContent = "Annuler reservation en cours";
			} 
			ajaxGet("https://api.jcdecaux.com/vls/v1/stations/" + idStation + "?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
				infoSta = JSON.parse(reponse);
				if (infoSta.status === "OPEN") {
					closedStation.style.display = "";
					
					nameStationReserved.textContent = infoSta.name;
					nameStationReserved.textContent = nameStationReserved.textContent.split("-")[1];
				
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




