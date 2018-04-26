var timer = document.getElementById("timer");
var rebours = document.getElementById("rebours");
var bouttonCancel = document.getElementById("bouton-annuler");

var Timer = {
    timerId: "",

    initTimer: function (time) {
        this.time = time;
        timerId = setInterval(this.onTimer, 1000);
        sec = Number(time.split(':')[1]);
        min = Number(time.split(':')[0]);
    },
    onTimer: function () {
        if (min === 0 && sec === 0 ) {
            clearInterval(timerId);
            sessionStorage.clear();
            timer.style.display = "none";
            bouttonCancel.style.display = "none";
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
    return sessionStorage.time;
        } 
    },
    resetTimer: function () {
        clearInterval(timerId);
        sessionStorage.clear();
    },
};