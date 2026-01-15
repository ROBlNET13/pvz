let keySequence = "";
let sequenceTimeout = null;

// oxlint-disable-next-line complexity
document.addEventListener("keydown", (event) => {
	// Ignore if typing in input fields
	if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
		return;
	}

	// Add key to sequence
	keySequence += event.key.toLowerCase();

	// Clear sequence after 2 seconds of inactivity
	clearTimeout(sequenceTimeout);
	sequenceTimeout = setTimeout(() => {
		keySequence = "";
	}, 2000);

	// Check for cheat codes
	// super fast (sf)
	if (keySequence.includes("sf")) {
		CSpeed(1000, 10, 1000);
		keySequence = "";
	}
	// balloon (bln)
	else if (keySequence.includes("bln")) {
		oP.Balloon();
		keySequence = "";
	}
	// restart (r)
	/*else if (keySequence.includes("r")) {
		SelectModal(oS.Lvl);
		keySequence = "";
	}*/
	// almanac (k)
	else if (keySequence.includes("k")) {
		ViewHandBook();
		keySequence = "";
	}
	// sun (j)
	else if (keySequence.includes("j")) {
		const sunId = AppearSun($User.Mouse.x - 45, $User.Mouse.y + 45, 25, false);
		if (!oS.AutoSun) {
			oSym.addTask(Math.round(1000 / oSym.TimeStep), ClickSun, [sunId]);
		}
		keySequence = "";
	}
	// oneko (cat)
	/*else if (keySequence.includes("cat")) {
		// remove .hidden from #oneko
		document.getElementById("oneko").classList.remove("hidden");
		keySequence = "";
	}*/

	// Prevent sequence from getting too long
	if (keySequence.length > 20) {
		keySequence = keySequence.slice(-10);
	}
});
