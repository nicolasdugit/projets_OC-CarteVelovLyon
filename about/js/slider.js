var diapositives = [
    {
        "url": "images/diapo1.png",
        "titre": "diapo 1",
        "alt": "diapo 1",
        "id": "diapo1"
    },
    {
    	"url": "images/diapo2.png",
        "titre": "diapo 2",
        "alt": "diapo 2",
        "id": "diapo2"
    },
    {
        "url": "images/diapo3.png",
        "titre": "diapo 3",
        "alt": "diapo 3",
        "id": "diapo3"
    },
    {
        "url": "images/diapo4.png",
        "titre": "diapo 4",
        "alt": "diapo 4",
        "id": "diapo4"
    }
]

var slider =document.getElementById("slider");
var widthSlider = parseFloat(getComputedStyle(slider).width);

var move = document.getElementById("move");
var widthMove = parseFloat(getComputedStyle(move).width);

var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");

buttonBack.addEventListener("click", function () {
	var xMove = parseFloat(getComputedStyle(move).left);
	if (xMove<0) {
	move.style.left = xMove + widthSlider + "px";
}
})

buttonForward.addEventListener("click", function () {
	var xMove = parseFloat(getComputedStyle(move).left);
	if (Math.abs(parseFloat(getComputedStyle(move).left)) !== (widthMove-widthSlider) ) {
	move.style.left = xMove - widthSlider + "px";
}
})