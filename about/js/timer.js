// CREATION D'UN OBJET TIMER
var Timer = {
    initTimer: function (time) {
        this.time = time;
        sec = Number(this.time.split(':')[1]);
        min = Number(this.time.split(':')[0]);
    },
    onTimer: function () {
        if (min === 0 && sec === 0 ) {
            timer.style.display = "none";
            bouttonCancel.style.display = "none";
            buttonConfirme.textContent = "Confirmer";
            clearInterval(this.timerId);
            sessionStorage.clear();
        } else if (min >= 0) {
            if (sec === 0 ) {
                sec = 59;
                min = min -1
            } else {
                sec = sec -1;
            }
            if (sec < 10) {
                this.time = min + ":0" + sec;

            } else {
                this.time = min + ":" + sec;
            }
        sessionStorage.setItem("time", this.time);
        rebours.textContent = sessionStorage.getItem("time");
        } 
    },
    resetTimer: function (id) {
        clearInterval(id);
        sessionStorage.clear();
    },
};