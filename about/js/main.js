Diaporama.initDiaporama();
buttonForward.addEventListener("click", Diaporama.moveForward);
buttonBack.addEventListener("click", Diaporama.moveBack);

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
		if (Direction === "left") {
		Diaporama.moveBack();
		}
		if (Direction === "right" ) {
		Diaporama.moveForward();
		}
};
