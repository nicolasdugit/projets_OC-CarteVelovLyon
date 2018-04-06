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
		// context.closePath();
		context.strokeStyle = "black";
		context.lineWidth = 5;
		context.stroke();
		// this.context.closePath();

		console.log(cursorX);
		console.log(cursorY);

		console.log(cursorX);
		console.log(cursorY);

	
	},

	drawVelol: function () {
	},
	erase: function () {
		context.clearRect(0,0, 300 , 200);
	 },
};


// canvas.addEventListener("mousedown", function(e) {
// 	painting = true;
	
// })

// canvas.addEventListener("mousemove", function (e) {
// 	if (painting === true) {
// 		cursorX = (e.pageX - canvas.offsetLeft);
// 		cursorY = (e.pageY - canvas.offsetTop);
// 		draw();
// 	}
// });

// canvas.addEventListener("mouseup", function () {
// 	painting = "false";
// 	// clear();
// })

// function draw () {

	

	
	

// 	context.beginPath();
// 	context.moveTo(cursorX, cursorY);
// 	context.lineTo(cursorX, cursorY);
// 	// context.closePath();
// 	context.strokeStyle = "black";
// 	context.lineWidth = 5;
// 	context.stroke();


// }

// function clear () {
// 	context.clearRect(0,0, 300 , 200);
// }

