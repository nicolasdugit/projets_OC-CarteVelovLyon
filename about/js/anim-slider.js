var slider =document.getElementById("slider");
var widthSlider = parseFloat(getComputedStyle(slider).width);

var move = document.getElementById("move");
var widthMove = parseFloat(getComputedStyle(move).width);

var widthSliderPourcent = (parseFloat(getComputedStyle(slider).width)/widthMove)*100;

var buttonBack = document.getElementById("button-back");
var buttonForward = document.getElementById("button-forward");

var xMove = 0;

buttonBack.addEventListener("click", function () {
	if (xMove<0) {
	move.style.left = xMove + 100 + "%";
	xMove = xMove + widthSlider/widthMove*images.length*100;
	}
});

buttonForward.addEventListener("click", function () {
	// var xMove = (parseFloat(getComputedStyle(move).left));
	if (Math.abs(xMove) != images.length*100 - 100) {
	move.style.left = xMove - 100 + "%";
	xMove = xMove - widthSlider/widthMove*images.length*100;
	}
});


document.onkeydown = function handleKeyDown(e){
		var key = e.keyCode;
		var Direction;
		switch (key){
			case 37:
				Direction = "left";
				break;

			case 39:
				Direction = "right";
				break;
				return;
			default:
				return;
		};
		if (xMove<0 && Direction === "left") {
		move.style.left = xMove + 100 + "%";
		xMove = xMove + widthSlider/widthMove*images.length*100
		}
		if (Math.abs(xMove) != images.length*100 - 100 && Direction === "right" ) {
		move.style.left = xMove - 100 + "%";
		xMove = xMove - widthSlider/widthMove*images.length*100;
		}
};