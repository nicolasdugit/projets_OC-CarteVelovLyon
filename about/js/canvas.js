var buttonActiveCanvas = document.getElementById("bouton-resa"); 
var canvas = document.getElementById("signature");
var buttonReserve = document.getElementById("bouton-valider");
buttonReserve.style.display = "none";


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

	startDraw: function () {
		context.beginPath();
		context.moveTo(cursorX, cursorY);
	},

	draw: function () {
		context.lineJoin = 'round';
		context.lineCap = 'round';
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

