var slider =document.getElementById("slider");
var widthSlider = parseFloat(getComputedStyle(slider).width)

var move = document.getElementById("move");
var widthMove = parseFloat(getComputedStyle(move).width);

var widthSliderPourcent = (parseFloat(getComputedStyle(slider).width)/widthMove)*100;

var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");

var xMove = 0;

buttonBack.addEventListener("click", function () {
	if (xMove<0) {
	move.style.left = xMove + 100 + "%";
	xMove = xMove + widthSlider/widthMove*diapositives.length*100
	}
})

buttonForward.addEventListener("click", function () {
	// var xMove = (parseFloat(getComputedStyle(move).left));
	console.log(xMove);
	if (Math.abs(xMove) != diapositives.length*100 - 100 ) {
	move.style.left = xMove - 100 + "%";
	xMove = xMove - widthSlider/widthMove*diapositives.length*100;
console.log(xMove);
	}
})