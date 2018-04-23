var buttonActiveCanvas = document.getElementById("bouton-resa"); 
var canvas = document.getElementById("signature");
var buttonReserve = document.getElementById("bouton-valider");
buttonReserve.style.display = "none";

canvas.style.display = "none";

var Signature = {

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
		context.lineWidth = 3;
		context.stroke();
	},
	stopDraw: function () {
		painting = false;
		buttonReserve.style.display = "flex";
	},
	erase: function () {
		context.clearRect(0,0, 300 , 200);
	 },
};

