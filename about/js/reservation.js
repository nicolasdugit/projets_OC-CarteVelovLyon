var Reservation = {
    // PASSER EN PARAMETRE TIMER ET STATION
    initReservatation: function(time, station) {
        this.time = time;
        this.station = station;
        this.newTimer = Object.create(Timer);
        this.newTimer.initTimer(this.time);
        nameStationReserved.textContent = this.station;
    },
    stopReservation: function() {
        this.newTimer.resetTimer();
    }
};