var nameStation = document.getElementById("station-nom");
var statusStation = document.getElementById("station-ouverture");
var addressStation = document.getElementById("station-adresse");
var bikeStation = document.getElementById("station-velo-dispo");
var emptyStation = document.getElementById("station-emplacement-dispo");

var Carte = {
	markers: [],
	// Initialisela carte
	initCarte: function() {
		var lyon = {lat: 45.75, lng: 4.85};
		map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 12,
    	center: lyon
    	});

	},
	initMarker: function (location, info) {
		var marker = new google.maps.Marker({
	        position: location,
	        map: map,
	        info: info
	    });
	    marker.addListener("click", function() {
	    	nameStation.textContent = this.info.name;
	    	addressStation.textContent = this.info.address;
	    	bikeStation.textContent = this.info.available_bikes;
	    	if (this.info.status === "OPEN") {
	    		statusStation.textContent = "ouverte";
	    		statusStation.style.color = "green";
	    	} else {
	    		statusStation.textContent = "fermée";
	    		statusStation.style.color = "red";
	    	}
	    	emptyStation.textContent = this.info.available_bike_stands;

	    });
		this.markers.push(marker);
	},
	clusteringMarker: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	},
};
