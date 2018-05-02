var Button = {
	openButton: function () {
		buttonConfirme.textContent = "Nouvelle réservation";
		bouttonCancel.style.display = "flex";
		timer.style.display = "flex";
	},
	closeButton: function () {
		buttonConfirme.style.display = "none";
		buttonConfirme.textContent = "Confirmer";
		bouttonCancel.style.display = "none";
		timer.style.display = "none";
	}
}