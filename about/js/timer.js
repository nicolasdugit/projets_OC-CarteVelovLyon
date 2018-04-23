var timer = document.getElementById("timer");
var rebours = document.getElementById("rebours");
var bouttonCancel = document.getElementById("bouton-annuler");

var Timer = {
    isOn: false,
    initTimer: function (tempsRestant) {
        this.tempsRestant = tempsRestant;
        sec = Number(tempsRestant.split(':')[1]);
        min = Number(tempsRestant.split(':')[0]);
        intervalId = setInterval(this.onTimer, 1000);
        this.isOn = true;
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
        this.isOn = false;
    },
};

var Reservation = {
    initReservatation: function() {
        buttonReserve.style.display = "none";
        canvas.style.display = "none";
        nameStationReserved.style.display = "inline";
        nameStationReserved.textContent = Station.name;
        sessionStorage.setItem("stationNom", Station.name);
        bouttonCancel.style.display = "flex";
        timer.style.display = "flex";
        rebours.textContent = "20:00";
        Timer.initTimer(tempsRestant);
        Signature.erase();
    },

    stopReservation: function() {
        sessionStorage.clear();
        Timer.resetTimer();
        bouttonCancel.style.display = "none";
    }
};

if(typeof sessionStorage!='undefined') {
  if('time' in sessionStorage) {
    var tempsRestant = sessionStorage.time;
    Timer.initTimer(tempsRestant);
    bouttonCancel.style.display = "flex";
    timer.style.display = "flex";
  } else {
    tempsRestant = "20:00";
  }
} else {
  alert("sessionStorage n'est pas supporté");
};
