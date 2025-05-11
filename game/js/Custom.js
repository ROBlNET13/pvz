function waitForElm(selector) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((mutations) => {
			if (document.querySelector(selector)) {
				observer.disconnect();
				resolve(document.querySelector(selector));
			}
		});

		// If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
// wait for #commit to exist
waitForElm("#commit").then((elm) => {
	// set the innertext to that of the contents of v.txt
	fetch("images/Zombies/CX/v.html")
		.then((response) => response.text())
		.then((text) => (elm.innerText = text));
});

const saveWhitelist = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	26,
	27,
	28,
	29,
	30,
	31,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	39,
	40,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	49,
	50,
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"50",
];

console.log("Setting up intervals to monitor changes...");

let checkInterval = setInterval(() => {
	console.log("Checking if oS is defined...");
	if (typeof oS !== "undefined") {
		console.log("oS is defined.");
		let previousValue = oS.Lvl;
		console.log(`Initial oS.Lvl: ${previousValue}`);

		const checkForChange = () => {
			// console.log("Checking for change in oS.Lvl...");
			if (oS.Lvl !== previousValue) {
				if (String(oS.Lvl).startsWith("[object")) {
					console.log(`Change detected: ${previousValue} to ${oS.Lvl}`);
					console.log("Invalid oS.Lvl format detected, reverting...");
					oS.Lvl = previousValue;
				} else if (saveWhitelist.includes(oS.Lvl)) {
					console.log(`Change detected: ${previousValue} to ${oS.Lvl}`);
					previousValue = oS.Lvl;
					console.log(`New previousValue set to: ${previousValue}`);
					if ($ && $("dAdventure")) {
						let hLvl = oS.Lvl;
						console.log(`Setting onclick with level: ${hLvl}`);
						if (saveWhitelist.includes(hLvl)) {
							$("dAdventure").onclick = function () {
								console.log(`Starting adventure with level: ${hLvl}`);
								StartAdventure(hLvl);
							};
						} else if (typeof localStorage.getItem("level") === "undefined") {
							$("dAdventure").onclick = function () {
								console.log("Starting adventure with level: " + localStorage.getItem("level") + " (from localStorage)");
								StartAdventure(localStorage.getItem("level"));
							};
						} else {
							$("dAdventure").onclick = function () {
								console.log("Starting adventure with level: 1");
								StartAdventure(1);
							};
						}
					}
					if (saveWhitelist.includes(oS.Lvl)) {
						console.log(`Saving level ${oS.Lvl} to localStorage.`);
						localStorage.setItem("level", oS.Lvl);
					} else {
						console.log(`Level ${oS.Lvl} isn't whitelisted, not saving to localStorage.`);
					}
				}
			}
		};

		const changeInterval = setInterval(checkForChange, 1);
		clearInterval(checkInterval);
	}
}, 100);

function startInterval2() {
	let checkInterval2 = setInterval(() => {
		/*console.log(
            "Checking if dAdventure is defined and saved level exists & is not blacklisted..."
        );*/
		if ($("dAdventure") && localStorage.getItem("level") && saveWhitelist.includes(localStorage.getItem("level"))) {
			console.log("dAdventure is defined and level is valid, setting onclick...");
			$("dAdventure").onclick = function () {
				console.log(`Starting adventure with level from localStorage: ${localStorage.getItem("level")}`);
				StartAdventure(localStorage.getItem("level"));
			};
			clearInterval(checkInterval2);
		}
	}, 100);
}

checkInterval2;

let playingSounds = [];
function PlaySound2(path, name, loop = false) {
	path = `audio/${path}`;
	// console.log(`Playing sound: ${path}`);
	let audio = new Audio(path);
	audio.loop = loop;
	audio.play();
	playingSounds.push(audio);
	// remove it after it's done playing
	audio.onended = function () {
		playingSounds.splice(playingSounds.indexOf(audio), 1);
	};
}
function StopSound2(name) {
	// console.log(`Stopping sound: ${name}`);
	playingSounds.forEach((audio) => {
		if (audio.src.includes(name)) {
			audio.pause();
		}
	});
}
function EditSound2(name, loop = false) {
	// console.log(`Editing sound: ${name}`);
	playingSounds.forEach((audio) => {
		if (audio.src.includes(name)) {
			audio.loop = loop;
		}
	});
}
