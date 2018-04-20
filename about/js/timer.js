var timer = document.getElementById("timer");
var rebours = document.getElementById("rebours");

var Timer = {
    initTimer: function () {
        sec = Number(rebours.textContent.split(':')[1]);
        min = Number(rebours.textContent.split(':')[0]);
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
                rebours.textContent = min + ":0" + sec;

            } else {
                rebours.textContent = min + ":" + sec;
            }
        } else {
            resetTimer();
            divInformation.style.display = "none";
        }  
    },
    resetTimer: function () {
        clearInterval(intervalId);
        timer.style.display = "none";
        rebours.textContent = "20:00";
        buttonActiveCanvas.textContent = "Reserver";
    },
};