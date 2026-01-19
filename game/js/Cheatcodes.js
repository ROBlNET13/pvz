let keySequence = "";
let sequenceTimeout = null;

let cheatCodes = {
	speed: () => {
		CSpeed(1000, 10, 1000);
	},
	balloon: () => {
		oBalloon.prototype.Birth();
	},
	restartlevel: () => {
		SelectModal(oS.Lvl);
	},
	handbook: () => {
		ViewHandBook();
	},
	j: () => {
		const sunId = AppearSun($User.Mouse.x - 45, $User.Mouse.y + 45, 25, false);
		if (!oS.AutoSun) {
			oSym.addTask(Math.round(1000 / oSym.TimeStep), ClickSun, [sunId]);
		}
	},
};

// oxlint-disable-next-line complexity
document.addEventListener("keydown", (event) => {
	// Ignore if typing in input fields
	if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
		return;
	}

	// Add key to sequence
	keySequence += event.key.toLowerCase();

	// Clear sequence after 5 seconds of inactivity
	clearTimeout(sequenceTimeout);
	sequenceTimeout = setTimeout(() => {
		keySequence = "";
	}, 5000);

	// Check for cheat codes
	for (i in cheatCodes) {
		if (keySequence.includes(i)) {
			cheatCodes[i]();
			keySequence = "";
		}
	}

	// Prevent sequence from getting too long
	if (keySequence.length > 20) {
		keySequence = keySequence.slice(-10);
	}
});
