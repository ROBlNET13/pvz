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
	eleWidth: 14,
	eleHeight: 15,
};
const REVERSE_TINYIFIER_MAP = Object.fromEntries(Object.entries(TINYIFIER_MAP).map(([key, value]) => [value, key]));

function packArray(arr) {
	if (arr.length < 6 || arr.length > 7) {
		throw new Error("Array must contain 6 or 7 elements, got " + arr.length);
	}

	let packed = 0;
	for (let i = 0; i < arr.length; i++) {
		const value = arr[i];
		if (value < 0 || value > 3) {
			throw new Error(`Value at index ${i} must be between 0 and 3, got ${value}`);
		}
		// Shift the value to its position and OR it with the packed result
		packed |= value << (i * 2);
	}

	// Store the length in the highest bits (bits 14-15 for 6 or 7 elements)
	// 6 elements = 0, 7 elements = 1
	const lengthBits = (arr.length - 6) << 14;
	packed |= lengthBits;

	return packed;
}

function unpackToArray(packed) {
	// Extract the length from bits 14-15
	const lengthBits = (packed >> 14) & 3;
	const length = lengthBits + 6; // 0 -> 6, 1 -> 7

	const arr = [];
	for (let i = 0; i < length; i++) {
		// Extract 2 bits at position i*2 using mask 0b11 (3 in decimal)
		const value = (packed >> (i * 2)) & 3;
		arr.push(value);
	}
	return arr;
}

function addHeaderToUint8Array(data, header) {
	// Handle both string and Uint8Array headers
	const headerBytes = header instanceof Uint8Array ? header : new TextEncoder().encode(header);

	// Create new array with space for header + original data
	const result = new Uint8Array(headerBytes.length + data.length);

	// Copy header bytes to the beginning
	result.set(headerBytes, 0);

	// Copy original data after the header
	result.set(data, headerBytes.length);

	return result;
}

// the compression stuff assumes that pako is loaded
function compressString(input) {
	const inputUTF8 = new TextEncoder().encode(input);
	const compressed = pako.deflate(inputUTF8, { level: 9 });
	const compressedBase64 = btoa(String.fromCharCode(...compressed));
	return compressedBase64.replaceAll("=", "");
}

function compressStringAsBytes(input) {
	const inputUTF8 = new TextEncoder().encode(input);
	const compressed = pako.deflate(inputUTF8, { level: 9 });
	return compressed;
}

function compressBytes(input) {
	const compressed = pako.deflate(input, { level: 9 });
	const compressedBase64 = btoa(String.fromCharCode(...compressed));
	return compressedBase64.replaceAll("=", "");
}

function compressBytesAsBytes(input, header = null) {
	const compressed = pako.deflate(input, { level: 9 });
	return compressed;
}

function decompressString(compressedBase64) {
	const compressed = Uint8Array.from(atob(compressedBase64), (c) => c.charCodeAt(0));
	const decompressed = pako.inflate(compressed);
	const decompressedString = new TextDecoder().decode(decompressed);
	return decompressedString;
}

function decompressStringToBytes(compressedBase64) {
	const compressed = Uint8Array.from(atob(compressedBase64), (c) => c.charCodeAt(0));
	const decompressed = pako.inflate(compressed);
	return decompressed;
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

function downloadBytesAsFile(bytes, filename, header = null) {
	// bytes is a Uint8Array
	if (header) {
		bytes = addHeaderToUint8Array(bytes, header);
	}
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
		// accept izl files
		input.accept = ".izl2,.izl3";
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

async function fileToLevelData(rawBytes = null) {
	let fileBytes;
	if (rawBytes instanceof Uint8Array) {
		fileBytes = rawBytes;
	} else if (rawBytes instanceof ArrayBuffer) {
		fileBytes = new Uint8Array(rawBytes);
	} else if (rawBytes == null) {
		fileBytes = await openAndLoadFileAsBytes();
	} else {
		throw new TypeError("fileToLevelData(rawBytes): rawBytes must be a Uint8Array, ArrayBuffer, or null/undefined");
	}

	// check if first 4 bytes are "IZL3" (49 5A 4C 33)
	const izl3Header = new Uint8Array([0x49, 0x5a, 0x4c, 0x33]);
	const fileHeader = fileBytes.slice(0, 4);

	if (
		fileHeader.length >= 4 &&
		fileHeader[0] === izl3Header[0] &&
		fileHeader[1] === izl3Header[1] &&
		fileHeader[2] === izl3Header[2] &&
		fileHeader[3] === izl3Header[3]
	) {
		// IZL3 format - already compressed msgpack data
		const compressedData = fileBytes.slice(4); // remove the IZL3 header
		const compressedBase64 = btoa(String.fromCharCode(...compressedData));
		return "|" + compressedBase64.replaceAll("=", "");
	}

	// Check for deflate header (0x78 followed by various possible second bytes)
	if (fileBytes.length >= 2 && fileBytes[0] === 0x78) {
		// Deflate format detected - treat as old format (already compressed)
		return "=" + compressString(decompressStringFromBytes(fileBytes));
	}

	// Old format - treat as string data
	return compressString(decompressStringFromBytes(fileBytes));
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
			plantDict[keyedDict[i]].eleWidth = parseInt($P[keyedDict[i]].ele.querySelectorAll("img")[1].offsetWidth);
			plantDict[keyedDict[i]].eleHeight = parseInt($P[keyedDict[i]].ele.querySelectorAll("img")[1].offsetHeight);
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

// Tinyify function that maps keys recursively
function tinyifyClone(obj) {
	if (Array.isArray(obj)) {
		// If it's an array, recursively process each element
		return obj.map((item) => tinyifyClone(item));
	} else if (obj !== null && typeof obj === "object") {
		// If it's an object, process each key-value pair
		const result = {};
		for (const [key, value] of Object.entries(obj)) {
			const newKey = TINYIFIER_MAP[key] !== undefined ? TINYIFIER_MAP[key] : key;

			// If this is lfValue, pack it into a single number
			if (key === "lfValue" && Array.isArray(value)) {
				result[newKey] = packArray(value);
			}
			// If this is a plantName, convert to index
			else if (key === "plantName" && typeof value === "string") {
				const plantIndex = izombiePlantsMap.indexOf(value);
				result[newKey] = plantIndex !== -1 ? plantIndex : value; // fallback to original if not found
			} else {
				result[newKey] = tinyifyClone(value);
			}
		}
		return result;
	}
	// Return primitive values as-is
	return obj;
}

function reverseKeys(obj) {
	if (Array.isArray(obj)) {
		// If it's an array, recursively process each element
		return obj.map((item) => reverseKeys(item));
	} else if (obj !== null && typeof obj === "object") {
		// If it's an object, process each key-value pair
		const result = {};
		for (const [key, value] of Object.entries(obj)) {
			// Try to reverse the key if it exists in our map, otherwise keep the original key
			const newKey = REVERSE_TINYIFIER_MAP[key] !== undefined ? REVERSE_TINYIFIER_MAP[key] : key;

			// If this is a plantName and the value is a number, convert back to plant name
			if (newKey === "plantName" && typeof value === "number") {
				result[newKey] = izombiePlantsMap[value] || value; // fallback to original if index is invalid
			} else {
				result[newKey] = reverseKeys(value);
			}
		}
		return result;
	}
	return obj;
}

function stringifyCloneTiny(levelData) {
	// First tinyify the keys, then serialize with msgpack
	const tinyified = tinyifyClone(levelData);
	const packed = msgpack.serialize(tinyified);
	return "|" + compressBytes(packed);
}

function stringifyCloneTinyAsBytes(levelData) {
	// First tinyify the keys, then serialize with msgpack
	const tinyified = tinyifyClone(levelData);
	const packed = msgpack.serialize(tinyified);
	return addHeaderToUint8Array(pako.deflate(packed), "IZL3");
}

function untinyifyClone(tinyBytes) {
	// decompress the bytes back to msgpack binary data
	// const decompressed = pako.inflate(tinyBytes);
	// un-messagepack it
	const obj = msgpack.deserialize(tinyBytes);
	// reverse the keys
	const reversed = reverseKeys(obj);
	// unpack lfValue if it exists
	// if lfValue is packed, unpack it
	if (reversed.lfValue !== undefined && typeof reversed.lfValue === "number") {
		reversed.lfValue = unpackToArray(reversed.lfValue);
	}
	return reversed;
}

// OLD functions for backwards compatibility
function tinyifyClone_OLD(clone) {
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

function untinyifyClone_OLD(tinyString) {
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

function stringifyCloneTiny_OLD(levelData) {
	return "=" + compressString(tinyifyClone_OLD(levelData));
}

function parseClone(stringifiedData) {
	let levelData = JSON.parse(decompressString(stringifiedData.split(";")[0]));
	let screenshot = stringifiedData.split(";")[1];
	if (screenshot) {
		levelData.screenshot = "data:image/webp;base64," + screenshot;
	}
	return levelData;
}

function parseCloneTiny_OLD(stringifiedData) {
	if (stringifiedData[0] === "=") {
		return untinyifyClone_OLD(decompressString(stringifiedData.slice(1)));
	}
	throw new Error("Invalid data format");
}

function parseCloneTiny(stringifiedData) {
	if (stringifiedData[0] === "|") {
		// New format - decompress and deserialize msgpack
		return untinyifyClone(decompressStringToBytes(stringifiedData.slice(1)));
	} else if (stringifiedData[0] === "=") {
		// Backwards compatibility with old format
		return untinyifyClone_OLD(decompressString(stringifiedData.slice(1)));
	}
	return parseClone(stringifiedData);
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
