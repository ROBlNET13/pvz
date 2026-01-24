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
						} else if (typeof StorageUtil.getItem("level") === "undefined") {
							$("dAdventure").onclick = function () {
								console.log("Starting adventure with level: " + StorageUtil.getItem("level") + " (from localStorage)");
								StartAdventure(StorageUtil.getItem("level"));
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
						StorageUtil.setItem("level", oS.Lvl);
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
		if ($("dAdventure") && StorageUtil.getItem("level") && saveWhitelist.includes(StorageUtil.getItem("level"))) {
			console.log("dAdventure is defined and level is valid, setting onclick...");
			$("dAdventure").onclick = function () {
				console.log(`Starting adventure with level from localStorage: ${StorageUtil.getItem("level")}`);
				StartAdventure(StorageUtil.getItem("level"));
			};
			clearInterval(checkInterval2);
		}
	}, 100);
}

startInterval2();

var playingSounds = globalThis.playingSounds;
if (!Array.isArray(playingSounds)) {
	playingSounds = [];
}
globalThis.playingSounds = playingSounds;
const audioPools = globalThis.audioPools || new Map();
globalThis.audioPools = audioPools;
const MAX_TOTAL_SOUNDS = 32;
const MAX_SOUNDS_PER_KEY = 4;
const AUDIO_POOL_SIZE = 6;
const CLEANUP_INTERVAL_MS = 5000;
const MIN_INTERVAL_MS_PER_KEY = 50;
const PLAY_RATE_WINDOW_MS = 250;
const MAX_PLAYS_PER_WINDOW = 12;
const lastPlayAt = globalThis.audioLastPlayAt || new Map();
globalThis.audioLastPlayAt = lastPlayAt;
const recentPlayTimes = globalThis.audioRecentPlayTimes || [];
globalThis.audioRecentPlayTimes = recentPlayTimes;

function getAudioKey(path, name, tag) {
	return `${path}|${name || path}|${tag || "default"}`;
}

function getPool(key) {
	if (!audioPools.has(key)) {
		audioPools.set(key, []);
	}
	return audioPools.get(key);
}

function cleanupPlayingSounds() {
	for (let i = playingSounds.length - 1; i >= 0; i -= 1) {
		const audio = playingSounds[i];
		if (!audio || audio.ended || audio.paused) {
			playingSounds.splice(i, 1);
		}
	}
}

function canPlayNow(key) {
	const now = Date.now();
	const last = lastPlayAt.get(key) || 0;
	if (now - last < MIN_INTERVAL_MS_PER_KEY) {
		return false;
	}
	while (recentPlayTimes.length && now - recentPlayTimes[0] > PLAY_RATE_WINDOW_MS) {
		recentPlayTimes.shift();
	}
	if (recentPlayTimes.length >= MAX_PLAYS_PER_WINDOW) {
		return false;
	}
	recentPlayTimes.push(now);
	lastPlayAt.set(key, now);
	return true;
}

setInterval(cleanupPlayingSounds, CLEANUP_INTERVAL_MS);
function PlaySound2(path, loop, name, tag) {
	// console.log(`Playing sound: path=${path}, loop=${loop}, name=${name}, tag=${tag}`);
	name = name || path;
	const tagName = tag || "default";
	const audioPath = `audio/${path}.mp3`;
	const key = getAudioKey(audioPath, name, tagName);
	const pool = getPool(key);

	if (!canPlayNow(key)) {
		return null;
	}

	cleanupPlayingSounds();
	if (playingSounds.length >= MAX_TOTAL_SOUNDS) {
		const oldest = playingSounds.shift();
		if (oldest) {
			oldest.pause();
			oldest.currentTime = 0;
		}
	}

	let playingForKeyCount = 0;
	for (let i = 0; i < playingSounds.length; i += 1) {
		const a = playingSounds[i];
		if (a && a.dataset && a.dataset.name === name && a.dataset.tag === tagName) {
			playingForKeyCount += 1;
			if (playingForKeyCount >= MAX_SOUNDS_PER_KEY) {
				return null;
			}
		}
	}

	let audio = pool.find((a) => a.paused || a.ended);
	if (!audio) {
		if (pool.length >= AUDIO_POOL_SIZE) {
			return null;
		} else {
			audio = new Audio(audioPath);
			audio.preload = "auto";
			pool.push(audio);
		}
	}

	audio.loop = Boolean(loop);
	audio.muted = Boolean(oS.Silence);
	audio.dataset.tag = tagName;
	audio.dataset.name = name;
	audio.currentTime = 0;

	const playPromise = audio.play();
	if (playPromise && typeof playPromise.catch === "function") {
		playPromise.catch(() => {});
	}

	if (!playingSounds.includes(audio)) {
		playingSounds.push(audio);
	}
	return audio;
}
function StopSound2(name) {
	// console.log(`Stopping sound: ${name}`);
	playingSounds.forEach((audio) => {
		if (audio.dataset.name.includes(name)) {
			audio.pause();
			audio.currentTime = 0;
		}
	});
}
function StopSoundTag2(tag) {
	// console.log(`Stopping sound tag: ${tag}`);
	playingSounds.forEach((audio) => {
		if (audio.dataset.tag === tag) {
			audio.pause();
			audio.currentTime = 0;
		}
	});
}
function EditSound2(name, loop = false) {
	// console.log(`Editing sound: ${name}`);
	playingSounds.forEach((audio) => {
		if (audio.src.includes(name)) {
			audio.loop = Boolean(loop);
		}
	});
}

// new save system

$User.Visitor.SaveLvl = 1;
$User.Visitor.SaveLvlCallBack = function (o) {
	/*
		o is an object with these properties:
		  - Lvl: level name (number for adventure mode, text for others)
		  - SunNum: remaining sun after completing the level
		  - UserName: player's name
		  - T: time taken to complete the level (divide by 100 to get seconds)
	*/
	// check if o.Lvl is valid and is in the whitelist
	if (!o.Lvl || !saveWhitelist.includes(o.Lvl)) {
		return;
	}
	// save logic
	let levels = {};
	// check if "levels" exists in localStorage
	if (StorageUtil.getItem("levels")) {
		levels = JSON.parse(StorageUtil.getItem("levels"));
	}
	// add the level to the levels object if it doesn't exist
	if (!levels[o.Lvl]) {
		levels[o.Lvl] = o;
	}
};
