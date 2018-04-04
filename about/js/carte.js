

var Carte = {
	// Initialisela carte
	initCarte: function(tabStations) {
		// this.tabStations = tabStations;
		var map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 13,
    	center: {lat: 45.75, lng: 4.85}
    	});

    	tabStations.forEach( function(station) {
			var marker = new google.maps.Marker ({
    			position : station.position,
    			map: map,
    			clickable: true,
			});
			marker.addListener("click", function() {
				stationInfoElt = document.getElementById("info-station");
				stationInfoElt.textContent = station.name + " est " +station.status +" nombre emplacements : "+ station.available_bike_stands + " velo dispo : " + station.available_bikes;
			});
		});
	},
};

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f4d8791a3e0b2c54428fadd020a78f37aa695a47", function(reponse) {
		stationsVelov = JSON.parse(reponse)
		// CREATION DE LA CARTE VELOV AVEC L'OBJET CARTE
		var carteVelov = Object.create(Carte);
		//INITIALISATION DE LA CARTE VELOV AVEC LE TABLEAU STATIONSVELOV EN PARAMETRE
		carteVelov.initCarte(stationsVelov);
});

