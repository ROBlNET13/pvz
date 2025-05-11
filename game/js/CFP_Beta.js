// hai
// - clay

let levelDataToLoad; // global variable to store the level data to load
let pNameValue = []; // for loading plants
let backgroundImage; // for loading the background image
const TINYIFIER_MAP = {
	// main
	lfValue: 1,
	music: 2,
	name: 3,
	plants: 4,
	screenshot: 5,
	stripeCol: 6,
	sun: 7,
	// plants
	plantCol: 8,
	plantName: 9,
	plantRow: 10,
	zIndex: 11,
	eleLeft: 12,
	eleTop: 13,
};

// the compression stuff assumes that pako is loaded
function compressString(input) {
	const inputUTF8 = new TextEncoder().encode(input);
	const compressed = pako.deflate(inputUTF8);
	const compressedBase64 = btoa(String.fromCharCode.apply(null, compressed));
	return compressedBase64.replaceAll("=", "");
}

function compressStringAsBytes(input) {
	const inputUTF8 = new TextEncoder().encode(input);
	const compressed = pako.deflate(inputUTF8);
	return compressed;
}

function compressBytes(input) {
	const compressed = pako.deflate(input);
	const compressedBase64 = btoa(String.fromCharCode.apply(null, compressed));
	return compressedBase64.replaceAll("=", "");
}

function decompressString(compressedBase64) {
	const compressed = Uint8Array.from(atob(compressedBase64), (c) => c.charCodeAt(0));
	const decompressed = pako.inflate(compressed);
	const decompressedString = new TextDecoder().decode(decompressed);
	return decompressedString;
}

function decompressStringNoBase64(compressed) {
	compressed = Uint8Array.from(compressed, (c) => c.charCodeAt(0));
	const decompressed = pako.inflate(compressed);
	const decompressedString = new TextDecoder().decode(decompressed);
	return decompressedString;
}

function decompressStringFromBytes(compressed) {
	const decompressed = pako.inflate(compressed);
	const decompressedString = new TextDecoder().decode(decompressed);
	return decompressedString;
}

function downloadBytesAsFile(bytes, filename) {
	// bytes is a Uint8Array
	const blob = new Blob([bytes], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

async function openAndLoadFileAsBytes() {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		// accept izl and izl2
		input.accept = ".izl,.izl2";
		input.onchange = () => {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				const bytes = new Uint8Array(reader.result);
				resolve(bytes); // resolve the promise with the byte array
			};
			reader.onerror = () => {
				reject(new Error("Failed to read file"));
			};
			reader.readAsArrayBuffer(file);
		};
		input.click();
	});
}

async function fileToLevelData() {
	return "=" + compressString(decompressStringFromBytes(await openAndLoadFileAsBytes())); // i hate this and want to fix it but its 4 am and i need to sleep. fuck text encoding
}

function cloneFromPlants(name, sun, includeXY, screenshot) {
	name = name
		.replaceAll(/\uE000/g, "")
		.replaceAll(/\uE001/g, "")
		.replaceAll(/\uE002/g, "")
		.replaceAll(/\uE003/g, "")
		.replaceAll(/\uE004/g, "")
		.replaceAll(/\uE005/g, "")
		.replaceAll(/\uE006/g, "")
		.replaceAll(/\uE007/g, "");
	let keyedDict = Object.keys($P);
	let plantDict = {};
	// for every object in $P, save the following data:
	// $P[keyedDict[i]].R // save as plantRow
	// $P[keyedDict[i]].C // save as plantCol
	// Object.getPrototypeOf($P[keyedDict[6]]).EName // save as plantName

	for (let i = 0; i < keyedDict.length; i++) {
		let plantRow = $P[keyedDict[i]].R;
		let plantCol = $P[keyedDict[i]].C;
		let plantName = Object.getPrototypeOf($P[keyedDict[i]]).EName;
		let { zIndex } = $P[keyedDict[i]];

		plantDict[keyedDict[i]] = {
			zIndex,
			plantRow,
			plantCol,
			plantName,
		};

		if (includeXY) {
			plantDict[keyedDict[i]].eleLeft = parseInt($P[keyedDict[i]].ele.style.left);
			plantDict[keyedDict[i]].eleTop = parseInt($P[keyedDict[i]].ele.style.top);
		}
	}
	// now turn it into an array of dictionaries
	let plantArray = Object.values(plantDict);
	// now put that array into another array with the background
	let levelData = {
		plants: plantArray,
		music: oS.LoadMusic,
		sun,
		name,
		lfValue: oGd.$LF,
		screenshot,
		/*
		 * not sure what lf stands for but its for where u can place plants/zombies
		 * 0 is for nothing
		 * 1 is for normal
		 * 2 is for water
		 * 3 is for oxygen/pots
		 * the first value should always be 0
		 */
	};

	if (oS.ArP && oS.ArP.ArC && oS.ArP.ArC[1] !== undefined) {
		levelData.stripeCol = oS.ArP.ArC[1];
	}

	return levelData;
}
function tinyifyClone(clone) {
	// iterate through every key
	let tinyifiedClone = {};
	for (const [key, value] of Object.entries(clone)) {
		// check if its lf or plants
		let val = "";
		if (Array.isArray(value)) {
			if (typeof value[0] === "object" && Array.isArray(value)) {
				let innerValArr = [];
				for (const obj of value) {
					let innerVal = "\uE001"; // marker for object start/end
					let innerArr = [];
					for (const [innerKey, innerValue] of Object.entries(obj)) {
						innerArr.push(TINYIFIER_MAP[innerKey] + "\uE004" + innerValue);
					}
					innerVal += innerArr.join("\uE002");
					innerVal += "\uE001"; // marker for object start/end
					innerValArr.push(innerVal);
				}
				val = innerValArr.join("\uE003");
			} else {
				val = value.join("\uE000");
			}
		} else if (typeof value !== "undefined") {
			val = value.toString();
		}
		tinyifiedClone[TINYIFIER_MAP[key]] = val;
	}
	// merge into a string
	let arr = [];
	for (const [key, value] of Object.entries(tinyifiedClone)) {
		arr.push(key + "\uE005" + value);
	}
	return arr.join("\uE006");
}

function untinyifyClone(tinyString) {
	const REVERSE_TINYIFIER_MAP = Object.fromEntries(Object.entries(TINYIFIER_MAP).map(([key, value]) => [value, key]));
	let originalClone = {};
	const pairs = tinyString.split("\uE006");

	for (const pair of pairs) {
		const [tinyKey, tinyValue] = pair.split("\uE005");
		const originalKey = REVERSE_TINYIFIER_MAP[tinyKey];

		if (!originalKey) {
			continue;
		} // skip if key not found

		let originalValue;
		if (originalKey === "plants") {
			originalValue = [];
			const plantStrings = tinyValue.split("\uE003");
			for (const plantString of plantStrings) {
				if (!plantString) {
					continue;
				}
				const plantObj = {};
				const plantData = plantString
					.slice(1, -1) // remove start/end markers \uE001
					.split("\uE002");
				for (const plantPair of plantData) {
					const [plantTinyKey, plantValueStr] = plantPair.split("\uE004");
					const plantOriginalKey = REVERSE_TINYIFIER_MAP[plantTinyKey];
					if (plantOriginalKey) {
						// convert numeric values back to numbers
						if (["zIndex", "plantRow", "plantCol"].includes(plantOriginalKey)) {
							plantObj[plantOriginalKey] = parseInt(plantValueStr, 10);
						} else {
							plantObj[plantOriginalKey] = plantValueStr;
						}
					}
				}
				originalValue.push(plantObj);
			}
		} else if (originalKey === "lfValue") {
			originalValue = tinyValue.split("\uE000").map(Number);
		} else if (["sun", "stripeCol"].includes(originalKey)) {
			originalValue = parseInt(tinyValue, 10);
		} else {
			originalValue = tinyValue; // keep as string for name, music, screenshot
		}
		originalClone[originalKey] = originalValue;
	}
	return originalClone;
}

function stringifyClone(levelData) {
	if (levelData.screenshot) {
		let screenshot = levelData.screenshot.replace("data:image/webp;base64,", "");
		delete levelData.screenshot;
		return compressString(JSON.stringify(levelData)) + ";" + screenshot;
	}
	return compressString(JSON.stringify(levelData));
}
function stringifyCloneTiny(levelData) {
	return "=" + compressString(tinyifyClone(levelData));
}
function parseClone(stringifiedData) {
	let levelData = JSON.parse(decompressString(stringifiedData.split(";")[0]));
	let screenshot = stringifiedData.split(";")[1];
	if (screenshot) {
		levelData.screenshot = "data:image/webp;base64," + screenshot;
	}
	return levelData;
}
function parseCloneTiny(stringifiedData) {
	if (stringifiedData[0] === "=") {
		return untinyifyClone(decompressString(stringifiedData.slice(1)));
	}
	throw new Error("Invalid data format");
}

function restoreToPlants(levelData) {
	let plantArray = levelData.plants;
	plantArray.sort((a, b) => a.zIndex - b.zIndex);

	for (let i = 0; i < plantArray.length; i++) {
		let plant = plantArray[i];
		let { plantName } = plant;
		let { plantRow } = plant;
		let { plantCol } = plant;
		let placed = CustomSpecial(window[plantName], plantRow, plantCol, 1);
		placed.plantImage.classList.add("cardboard");
	}
}

async function captureScreenshot() {
	return new Promise((resolve, reject) => {
		const element = document.querySelector("#dAll");
		const cardList = document.querySelector("#dCardList");
		if (!element) {
			console.error("Element #dAll not found");
			reject("Element #dAll not found");
			return;
		}
		html2canvas(element, {
			ignoreElements: (el) => el === cardList, // Ignore #dCardList in the capture
		})
			.then((canvas) => {
				// Get the original dimensions of the canvas
				const originalWidth = canvas.width;
				const originalHeight = canvas.height;
				// Calculate the new height while maintaining the aspect ratio
				const newWidth = 215;
				const newHeight = (newWidth / originalWidth) * originalHeight;
				// Create an offscreen canvas to resize the screenshot
				const resizedCanvas = document.createElement("canvas");
				resizedCanvas.width = newWidth;
				resizedCanvas.height = newHeight;
				const ctx = resizedCanvas.getContext("2d");
				ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
				// Convert to WebP
				resizedCanvas.toBlob(
					(blob) => {
						const reader = new FileReader();
						reader.onloadend = function () {
							const base64data = reader.result;
							console.log("Screenshot captured:", base64data);
							resolve(base64data); // Resolve the Promise with the base64 data
						};
						reader.readAsDataURL(blob);
					},
					"image/webp",
					0.5 // quality, 0-1
				);
			})
			.catch((error) => {
				console.error("Screenshot capture failed:", error);
				reject(error); // Reject the Promise with the error
			});
	});
}
