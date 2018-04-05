// Exécute un appel AjAX GET
// Prend en paramètres l'URL cible et la fonction callback appelé en cas de succès
function ajaxGet(url,callback) {
	// Création d'une requête HTTP
	var req = new XMLHttpRequest();
	// Requête HTTP GET asynchrone vers le fichier langages.txt publié localement
	req.open("GET", url);
	//Gestion de l'évènement indiquant la fin de la requete
	req.addEventListener("load", function () {
		if (req.status >= 200 && req.status < 400) { //Le serveur a réussi à traiter la demande
			// Appelle la fonction callback en lui passant la réponse de la requete
			callback(req.responseText);
		} else {
			// Affichage des inforamtions sur l'échec du traitement de la requete
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function () {
		// La requete n'a pas réussi à atteindre le serveur
		console.error("Erreur réseau avec l'URL " + url);
	});

	// Envoi de la requête
	req.send(null);
}