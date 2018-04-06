var timer = document.getElementById("timer");
timer.style.display = "none";

var rebours = document.getElementById("rebours");

var intervalId;
// Diminue le compteur jusqu'à 0
function diminuerCompteur() {
    // Conversion en nombre du texte du compteur
    var compteur = (rebours.textContent);
    if (compteur > 1) {
   		rebours.textContent = compteur -1 ;	
    } else {
    	clearInterval(intervalId);
    	timer.style.display = "none";
    	divInformation.style.display = "none";
    	rebours.textContent = 10;
    }       
}







