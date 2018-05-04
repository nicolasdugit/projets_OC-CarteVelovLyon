// CREATION DE L'OBJET CANVAS
var Canvas = {
	// INITIALISATION DU CANVAS
	initCanvas: function (canvas) {
		context = canvas.getContext("2d");
		context.fillText("Signez ici", 20, 20);
		painting = false;
	},
	// FONCTIONS CONCERNANT LA SIGNATURE A LA SOURIS
	startDraw: function () {
		context.beginPath();
		context.moveTo(cursorX, cursorY);
	},
	draw: function () {
		context.lineTo(cursorX, cursorY);
		context.strokeStyle = "black";
		context.lineWidth = 3;
		context.stroke();
	},
	stopDraw: function () {
		painting = false;
	},
	erase: function () {
		context.clearRect(0,0, 350 , 200);
	},
	// FONCTIONS CONCERNANT LA SIGNATURE AU TOUCHÉ
	ongoingTouches: [], // tableau qui regroupe les touch
	ongoingTouchIndexById: function (idToFind) {
		for (var i=0; i<this.ongoingTouches.length; i++) {
        	var id = this.ongoingTouches[i].identifier;
        	if (id == idToFind) {
          		return i;
          	}
        }
      	return -1;    // not found
	},
	handleStart: function(e) {
		e.preventDefault();
		var touches = e.changedTouches;
		for (var i=0; i<touches.length; i++) {
			this.ongoingTouches.push(touches[i]);
		    var color = "black";
		    context.fillStyle = color;
		    context.fillRect(touches[i].pageX-2-canvas.offsetLeft, touches[i].pageY-2-canvas.offsetTop, 4, 4);
		}		
	},
	handleMove:function(e) {
		e.preventDefault();
		var touches = e.changedTouches;
		context.lineWidth = 4;
    	for (var i=0; i<touches.length; i++) {
        	var color = "black";
        	var idx = this.ongoingTouchIndexById(touches[i].identifier);
        	context.fillStyle = color;
        	context.beginPath();
       		context.moveTo(this.ongoingTouches[idx].pageX-canvas.offsetLeft, this.ongoingTouches[idx].pageY-canvas.offsetTop);
       		context.lineTo(touches[i].pageX-canvas.offsetLeft, touches[i].pageY-canvas.offsetTop);
        	context.closePath();
        	context.stroke();
        	this.ongoingTouches.splice(idx, 1, touches[i]);
      }
	},
	handleEnd: function (e) {
		e.preventDefault();
		var touches = e.changedTouches;
      	context.lineWidth = 4;
      	for (var i=0; i<touches.length; i++) {
        	var color = "black";
        	var idx = this.ongoingTouchIndexById(touches[i].identifier);
        	context.fillStyle = color;
        	context.beginPath();
        	context.moveTo(this.ongoingTouches[i].pageX-canvas.offsetLeft, this.ongoingTouches[i].pageY-canvas.offsetTop);
        	context.lineTo(touches[i].pageX-canvas.offsetLeft, touches[i].pageY-canvas.offsetTop);
        	this.ongoingTouches.splice(i, 1);
      	}
	},
	handleCancel:function (e) {
   		var touches = e.changedTouches;
      	for (var i=0; i<touches.length; i++) {
        	this.ongoingTouches.splice(i, 1);
      	}
	}
};