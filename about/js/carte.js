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
	// Initialisela carte
	initCarte: function() {
		var lyon = {lat: 45.76, lng: 4.85};
		map = new google.maps.Map(carteVelov, {
    	zoom: 13,
    	center: lyon
    	});
	},
};

var Marqueur = {
	markers: [],
	icon: null,
	initMarker: function (infoStation) {
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
			if (infoStation.status === "OPEN") {
				nameStationReserved.textContent = infoStation.name;
				nameStationReserved.textContent = nameStationReserved.textContent.split("-")[1];
				nameStationReserved.style.display = "none";

				buttonActiveCanvas.style.display = "flex";
				divInformation.style.display = "flex";
				stationTitle.textContent = infoStation.name;
				stationTitle.textContent = stationTitle.textContent.split("-")[1];
				nameStation.textContent = infoStation.name;
				nameStation.textContent = nameStation.textContent.split("-")[1];
				addressStation.textContent = infoStation.address;
				bikeStation.textContent = infoStation.available_bikes;
			    statusStation.textContent = "ouverte";
			    statusStation.style.color = "green";
			} else {
				closedStation.style.display = "none";	
				statusStation.textContent = "fermée";
				statusStation.style.color = "red";
			}
			if (infoStation.available_bikes === 0) {
				buttonActiveCanvas.style.display = "none";
			}


			emptyStation.textContent = infoStation.available_bike_stands;
			canvas.style.display = "none";
		});
		this.markers.push(marker);
	},

	clusteringMarker: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	},
};