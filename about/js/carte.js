var Carte = {
	markers: [],
	// Initialisela carte
	initCarte: function() {
		var lyon = {lat: 45.75, lng: 4.85};
		map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 13,
    	center: lyon
    	});

	},
	initMarker: function (location) {
		var marker = new google.maps.Marker({
	        position: location,
	        map: map
	    });
		this.markers.push(marker);
	},

	clusteringMarker: function () {
		markerCluster = new MarkerClusterer(map, this.markers,
        {imagePath: 'about/images/m'});
	}
};


ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
		stationsVelov = JSON.parse(reponse)
		// CREATION DE LA CARTE VELOV AVEC L'OBJET CARTE
		// var carteVelov = Object.create(Carte);
		// carteVelov.initCarte();
    	stationsVelov.forEach( function(station) {
    		var map;
    		Carte.initMarker(station.position);

		});
		// 	marker.addListener("click", function() {
		// 		stationInfoElt = document.getElementById("info-station");
		// 		stationInfoElt.textContent = station.name + " est " +station.status +" nombre emplacements : "+ station.available_bike_stands + " velo dispo : " + station.available_bikes;
		// 	});
    Carte.clusteringMarker();
});

