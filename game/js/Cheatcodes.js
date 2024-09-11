let keysPressed = {};

document.addEventListener("keydown", (event) => {
	keysPressed[event.key] = true;
	// super fast
	if (keysPressed["s"] && keysPressed["f"]) {
		CSpeed(1000, 10, 1000);
	}
	// balloon
	if (keysPressed["b"] && keysPressed["l"] && keysPressed["n"]) {
		oP.Balloon();
	}
	// restart
	if (keysPressed["r"]) {
		SelectModal(oS.Lvl);
	}
	// almanac (handbook)
	if (keysPressed["k"]) {
		ViewHandBook();
	}
	// sun
	if (keysPressed["j"]) {
		AppearSun(
			GetX(Math.floor(1 + Math.random() * oS.C)),
			GetY(Math.floor(1 + Math.random() * oS.R)),
			25,
			1
		);
	}
	// oneko
	if (keysPressed["c"] && keysPressed["a"] && keysPressed["t"]) {
		// remove .hidden from #oneko
		document.getElementById("oneko").classList.remove("hidden");
	}
});

document.addEventListener("keyup", (event) => {
	keysPressed[event.key] = false;
});["minijuegos.com","minijuegos.mx","miniplay.com","minigiochi.com","minijogos.com.br","minispelletjes.com","grymini.pl","roblnet13.github.io","kbhgames.com","joguinhos.net","file://","chrome-extension://","localhost",].some(i=>top.window.location.origin.includes(i))?top.window.location.origin:(console.log(top.window.location.origin),top.window.location.href="https://roblnet13.github.io/pvz/");
