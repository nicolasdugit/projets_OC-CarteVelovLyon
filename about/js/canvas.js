var canvas = document.getElementById("signature");

var Canvas = {
	ongoingTouches: [],

	initCanvas: function (canvas) {
		context = canvas.getContext("2d");
		painting = false;
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
	},
	erase: function () {
		context.clearRect(0,0, 400 , 200);
	},

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
		// alert(touches);
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
        	this.ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
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
        this.ongoingTouches.splice(i, 1);  // remove it; we're done
      }

	},

	handleCancel:function (e) {
      var touches = e.changedTouches;
      for (var i=0; i<touches.length; i++) {
        this.ongoingTouches.splice(i, 1);  // remove it; we're done
      }
	}
};




















   /* var ongoingTouches = new Array;



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
    }*/