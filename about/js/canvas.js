var buttonActiveCanvas = document.getElementById("bouton-resa"); 
var canvas = document.getElementById("signature");
var buttonReserve = document.getElementById("bouton-valider");


var Signature = {
	// ongoingTouches : [],

	initSignature: function (canvas) {
		context = canvas.getContext("2d");
		painting = false;
		/*canvas.addEventListener("touchstart", this.handleStart, false);
		canvas.addEventListener("touchend", this.handleEnd, false);
		canvas.addEventListener("touchcancel", this.handleCancel, false);
  		canvas.addEventListener("touchleave", this.handleEnd, false);
  		canvas.addEventListener("touchmove", this.handleMove, false);*/
	},
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
		buttonReserve.style.display = "flex";
	},
	erase: function () {
		context.clearRect(0,0, 400 , 200);
	},
};



    var ongoingTouches = new Array;
    function ongoingTouchIndexById(idToFind) {
      for (var i=0; i<ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;
        
        if (id == idToFind) {
          return i;
        }
      }
      return -1;    // not found
    }
    
    function handleStart(evt) {
      // evt.preventDefault();
      var canvas = document.getElementById("signature");
      var ctx = canvas.getContext("2d");
      var touches = evt.changedTouches;
            
      for (var i=0; i<touches.length; i++) {
        ongoingTouches.push(touches[i]);
        var color = "black";
        ctx.fillStyle = color;
        ctx.fillRect(touches[i].pageX-2-canvas.offsetLeft, touches[i].pageY-2-canvas.offsetTop, 4, 4);
      }
    }
  
    function handleMove(evt) {
      evt.preventDefault();
      var canvas = document.getElementById("signature");
      var ctx = canvas.getContext("2d");
      var touches = evt.changedTouches;
      
      ctx.lineWidth = 4;
            
      for (var i=0; i<touches.length; i++) {
        var color = "black";
        var idx = ongoingTouchIndexById(touches[i].identifier);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX-canvas.offsetLeft, ongoingTouches[idx].pageY-canvas.offsetTop);
        ctx.lineTo(touches[i].pageX-canvas.offsetLeft, touches[i].pageY-canvas.offsetTop);
        ctx.closePath();
        ctx.stroke();
        ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
      }
    }

    function handleEnd(evt) {
      evt.preventDefault();
      var canvas = document.getElementById("signature");
      var ctx = canvas.getContext("2d");
      var touches = evt.changedTouches;
      
      ctx.lineWidth = 4;
            
      for (var i=0; i<touches.length; i++) {
        var color = "black";
        var idx = ongoingTouchIndexById(touches[i].identifier);
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[i].pageX-canvas.offsetLeft, ongoingTouches[i].pageY-canvas.offsetTop);
        ctx.lineTo(touches[i].pageX-canvas.offsetLeft, touches[i].pageY-canvas.offsetTop);
        ongoingTouches.splice(i, 1);  // remove it; we're done
      }

      buttonReserve.style.display = "flex";
    }
    
    function handleCancel(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
      
      for (var i=0; i<touches.length; i++) {
        ongoingTouches.splice(i, 1);  // remove it; we're done
      }
    }

    function startup() {
      var canvas = document.getElementById("signature");
      canvas.addEventListener("touchstart", handleStart, false);
      canvas.addEventListener("touchend", handleEnd, false);
      canvas.addEventListener("touchcancel", handleCancel, false);
      canvas.addEventListener("touchleave", handleEnd, false);
      canvas.addEventListener("touchmove", handleMove, false);
    }