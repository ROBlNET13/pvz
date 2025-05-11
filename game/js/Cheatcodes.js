let keysPressed = {};

document.addEventListener("keydown", (event) => {
	keysPressed[event.key] = true;
	// super fast
	if (keysPressed.s && keysPressed.f && document.activeElement.nodeName !== "TEXTAREA" && document.activeElement.nodeName !== "INPUT") {
		CSpeed(1000, 10, 1000);
	}
	// balloon
	if (keysPressed.b && keysPressed.l && keysPressed.n && document.activeElement.nodeName !== "TEXTAREA" && document.activeElement.nodeName !== "INPUT") {
		oP.Balloon();
	}
	// restart
	/*if (keysPressed["r"] && document.activeElement.nodeName != 'TEXTAREA' && document.activeElement.nodeName != 'INPUT') {
		SelectModal(oS.Lvl);
	}*/
	// almanac (handbook)
	if (keysPressed.k && document.activeElement.nodeName !== "TEXTAREA" && document.activeElement.nodeName !== "INPUT") {
		ViewHandBook();
	}
	// sun
	if (keysPressed.j && document.activeElement.nodeName !== "TEXTAREA" && document.activeElement.nodeName !== "INPUT") {
		AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), 25, 1);
	}
	// oneko
	if (keysPressed.c && keysPressed.a && keysPressed.t && document.activeElement.nodeName !== "TEXTAREA" && document.activeElement.nodeName !== "INPUT") {
		// remove .hidden from #oneko
		document.getElementById("oneko").classList.remove("hidden");
	}
});

document.addEventListener("keyup", (event) => {
	keysPressed[event.key] = false;
});
