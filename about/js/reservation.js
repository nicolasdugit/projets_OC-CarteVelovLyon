//CREATION D'UN OBJET RESERVATION
var Reservation = {
    // PASSER EN PARAMETRE TIME ET STATION
    initReservation: function(time, station) {
        this.time = time;
        this.station = station;
        newTimer = Object.create(Timer);
        newTimer.initTimer(this.time);
        timerId = setInterval(newTimer.onTimer, 1000);
        nameStationReserved.textContent = this.station;
        // modifications affichages bouton et canvas
        buttonConfirme.textContent = "Nouvelle réservation";
        bouttonCancel.style.display = "flex";
        timer.style.display = "flex";
        buttonReserve.style.display = "none"; 
        buttonErase.style.display = "none";
        canvas.style.display = "none";
    },
    stopReservation: function() {
        newTimer.resetTimer(timerId);
        // modifications affichages bouton et canvas
        buttonConfirme.style.display = "none";
        buttonConfirme.textContent = "Confirmer";
        bouttonCancel.style.display = "none";
        timer.style.display = "none";
    }
};