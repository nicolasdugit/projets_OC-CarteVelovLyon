var slider = Object.create(Diaporama);
slider.initDiaporama(images);

buttonForward.addEventListener("click", function () {
	slider.moveForward();
});

buttonBack.addEventListener("click", function () {
	slider.moveBack();
});

document.onkeydown = function handleKeyDown(e){
		var key = e.keyCode;
		var Direction;
		switch (key){
			case 37:
				slider.moveBack()
				break;
			case 39:
				slider.moveForward();
				break;
				return;
		};
};