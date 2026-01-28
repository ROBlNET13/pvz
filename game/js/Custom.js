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

// Web Audio API-based audio engine
const audioContext = globalThis.audioContext || new (window.AudioContext || window.webkitAudioContext)();
globalThis.audioContext = audioContext;

// Master gain node for volume control
const masterGain = globalThis.masterGain || audioContext.createGain();
if (!globalThis.masterGain) {
	masterGain.connect(audioContext.destination);
	globalThis.masterGain = masterGain;
}

// Audio buffer cache
const audioBuffers = globalThis.audioBuffers || new Map();
globalThis.audioBuffers = audioBuffers;

// Playing sounds tracking
window.playingSounds = [];

// Configuration
const MAX_TOTAL_SOUNDS = 64; // Increased since Web Audio API is more efficient
const MAX_SOUNDS_PER_KEY = 8;
const CLEANUP_INTERVAL_MS = 3000;
const MIN_INTERVAL_MS_PER_KEY = 30;
const PLAY_RATE_WINDOW_MS = 250;
const MAX_PLAYS_PER_WINDOW = 20;

// Rate limiting
const lastPlayAt = globalThis.audioLastPlayAt || new Map();
globalThis.audioLastPlayAt = lastPlayAt;
const recentPlayTimes = globalThis.audioRecentPlayTimes || [];
globalThis.audioRecentPlayTimes = recentPlayTimes;

// Helper to generate unique keys
function getAudioKey(path, name, tag) {
	return `${path}|${name || path}|${tag || "default"}`;
}

// Load and decode audio file
async function loadAudioBuffer(url) {
	if (audioBuffers.has(url)) {
		return audioBuffers.get(url);
	}

	try {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		audioBuffers.set(url, audioBuffer);
		return audioBuffer;
	} catch (error) {
		console.warn(`Failed to load audio: ${url}`, error);
		return null;
	}
}

// Cleanup finished sounds
function cleanupPlayingSounds() {
	for (let i = playingSounds.length - 1; i >= 0; i -= 1) {
		const sound = playingSounds[i];
		if (!sound || !sound.source || sound.stopped) {
			playingSounds.splice(i, 1);
		}
	}
}

// Rate limiting check
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

// Main play function
async function PlaySound2(path, loop, name, tag) {
	// Resume audio context if suspended (browser autoplay policy)
	if (audioContext.state === "suspended") {
		await audioContext.resume();
	}

	name = name || path;
	const tagName = tag || "default";
	const audioPath = `audio/${path}.mp3`;
	const key = getAudioKey(audioPath, name, tagName);

	if (!canPlayNow(key)) {
		return null;
	}

	cleanupPlayingSounds();

	// Enforce total sound limit
	if (playingSounds.length >= MAX_TOTAL_SOUNDS) {
		const oldest = playingSounds.shift();
		if (oldest && oldest.source) {
			oldest.source.stop();
			oldest.stopped = true;
		}
	}

	// Check per-key limits
	let playingForKeyCount = 0;
	for (const sound of playingSounds) {
		if (sound.name === name && sound.tag === tagName) {
			playingForKeyCount += 1;
			if (playingForKeyCount >= MAX_SOUNDS_PER_KEY) {
				return null;
			}
		}
	}

	// Load audio buffer
	const buffer = await loadAudioBuffer(audioPath);
	if (!buffer) {
		return null;
	}

	// Create source node
	const source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.loop = Boolean(loop);

	// Create gain node for this sound
	const gainNode = audioContext.createGain();
	gainNode.gain.value = oS.Silence ? 0 : 1;

	// Connect: source -> gain -> master -> destination
	source.connect(gainNode);
	gainNode.connect(masterGain);

	// Track the sound
	const soundObj = {
		source,
		gainNode,
		name,
		tag: tagName,
		path: audioPath,
		stopped: false,
		startTime: audioContext.currentTime,
	};

	// Auto-cleanup when sound ends
	source.onended = () => {
		soundObj.stopped = true;
		const idx = playingSounds.indexOf(soundObj);
		if (idx !== -1) {
			playingSounds.splice(idx, 1);
		}
	};

	source.start(0);
	playingSounds.push(soundObj);

	return soundObj;
}

// Stop sounds by name
function StopSound2(name) {
	playingSounds.forEach((sound) => {
		if (sound.name && sound.name.includes(name)) {
			if (sound.source && !sound.stopped) {
				try {
					sound.source.stop();
					sound.stopped = true;
				} catch (e) {
					// Already stopped
				}
			}
		}
	});
	cleanupPlayingSounds();
}

// Stop sounds by tag
function StopSoundTag2(tag) {
	playingSounds.forEach((sound) => {
		if (sound.tag === tag) {
			if (sound.source && !sound.stopped) {
				try {
					sound.source.stop();
					sound.stopped = true;
				} catch (e) {
					// Already stopped
				}
			}
		}
	});
	cleanupPlayingSounds();
}

// Edit sound properties (loop)
function EditSound2(name, loop = false) {
	playingSounds.forEach((sound) => {
		if (sound.path && sound.path.includes(name) && sound.source) {
			sound.source.loop = Boolean(loop);
		}
	});
}

// Update master volume based on oS.Silence
setInterval(() => {
	if (typeof oS !== "undefined" && masterGain) {
		masterGain.gain.value = oS.Silence ? 0 : 1;
	}
}, 100);

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
