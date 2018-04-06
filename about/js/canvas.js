var buttonActiveCanvas = document.getElementById("bouton-resa"); 
var canvas = document.getElementById("signature");
// var context = canvas.getContext("2d");


var divContent = document.getElementById("content");
var divReservation = document.getElementById("reservation");


canvas.style.display = "none";
buttonActiveCanvas.addEventListener("click", function () {
				canvasSignature.erase();

	canvas.style.display = "flex";
	buttonActiveCanvas.style.display = "none";
})

var Paint = {

	initPaint: function (canvasName) {
		context = canvasName.getContext("2d");
		painting = false;	
	},

	draw: function () {
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.beginPath();
		context.moveTo(cursorX, cursorY);
		context.lineTo(cursorX, cursorY);
		context.strokeStyle = "black";
		context.lineWidth = 5;
		context.stroke();
	},

	drawVelol: function () {
	},
	erase: function () {
		context.clearRect(0,0, 300 , 200);
	 },
};
