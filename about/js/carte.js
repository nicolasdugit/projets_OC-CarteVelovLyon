var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var bikeStation = document.getElementById("station-velo-dispo");
var emptyStation = document.getElementById("station-emplacement-dispo");
var carteVelov = document.getElementById("map");

var Carte = {
	markers: [],
	// Initialisela carte
	initCarte: function() {
		var lyon = {lat: 45.75, lng: 4.85};
		map = new google.maps.Map(carteVelov, {
    	zoom: 12,
    	center: lyon
    	});

	},
	initMarker: function (infoStation) {
		var marker = new google.maps.Marker({
	        position: infoStation.position,
	        map: map
	    });
	    marker.addListener("click", function() {
	    	nameStation.textContent = infoStation.name;
	    	addressStation.textContent = infoStation.address;
	    	bikeStation.textContent = infoStation.available_bikes;
	    	if (infoStation.status === "OPEN") {
	    		statusStation.textContent = "ouverte";
	    		statusStation.style.color = "green";
	    	} else {
	    		statusStation.textContent = "fermée";
	    		statusStation.style.color = "red";
	    	}
	    	emptyStation.textContent = infoStation.available_bike_stands;
	    });
		this.markers.push(marker);
	},
	clusteringMarker: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	},
};
