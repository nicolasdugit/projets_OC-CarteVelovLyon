var diapo1 = Object.create(Diaporama);
diapo1.initDiaporama(images);

// Diaporama.initDiaporama();
buttonForward.addEventListener("click", function () {
	diapo1.moveForward();
});

buttonBack.addEventListener("click", function () {
	diapo1.moveBack();
});

document.onkeydown = function handleKeyDown(e){
		var key = e.keyCode;
		var Direction;
		switch (key){
			case 37:
				diapo1.moveBack()
				break;
			case 39:
				diapo1.moveForward();
				break;
				return;
		};
};






