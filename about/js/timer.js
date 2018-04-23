var timer = document.getElementById("timer");
var rebours = document.getElementById("rebours");


var Timer = {
    initTimer: function (tempsRestant) {
        this.tempsRestant = tempsRestant;
        sec = Number(tempsRestant.split(':')[1]);
        min = Number(tempsRestant.split(':')[0]);
        intervalId = setInterval(this.onTimer, 1000);
    },
    onTimer: function () {
        if (min === 0 && sec === 0 ) {
            resetCompteur();
            divInformation.style.display = "none";
        } else if (min >= 0) {
            if (sec === 0 ) {
                sec = 59;
                min = min -1
            } else {
                sec = sec -1;
            }
            if (sec < 10) {
                this.tempsRestant = min + ":0" + sec;
            } else {
                this.tempsRestant = min + ":" + sec;
            }
        } else {
            resetTimer();
            divInformation.style.display = "none";
        }  
        rebours.textContent = this.tempsRestant;
        sessionStorage.setItem("time", this.tempsRestant);
    },
    resetTimer: function () {
        clearInterval(intervalId);
        sessionStorage.clear();
        timer.style.display = "none";
        tempsRestant = "20:00";
        buttonActiveCanvas.textContent = "Reserver";
    },
};


var Reservation = {

    initReservation: function(station) {
        sessionStorage.setItem("name", station.name)
        sessionStorage.setItem("time", timeLeft);
        
}