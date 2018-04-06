var activeCanvas = document.getElementById("bouton-resa"); 
var canvas = document.getElementById("signature");
var context = canvas.getContext("2d");

canvas.style.display = "none";
activeCanvas.addEventListener("click", function () {
	canvas.style.display = "flex";
	activeCanvas.style.display = "none";
})



context.beginPath();
context.moveTo(131, 119);
context.bezierCurveTo(131, 126, 126, 131, 119, 131);
context.lineTo(30, 131);
context.bezierCurveTo(23, 131, 18, 126, 18, 119);
context.lineTo(18, 30);
context.bezierCurveTo(18, 23, 23, 18, 30, 18);
context.lineTo(119, 18);
context.bezierCurveTo(126, 18, 131, 23, 131, 30);
context.lineTo(131, 119);
context.closePath();
context.fillStyle = "rgb(23, 145, 167)";
context.fill();

context.font = "35px Calibri,Geneva,Arial";
context.fillStyle = "white";
context.fillText("velo'V", 25, 115);


