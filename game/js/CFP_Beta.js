// hai
// - clay

const TINYIFIER_MAP = {
	// main
	lfValue: 1,
	music: 2,
	name: 3,
	plants: 4,
	screenshot: 5, // deprecated
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

const IZL3_HEADER = new Uint8Array([0x49, 0x5a, 0x4c, 0x33]); // "IZL3"

// for level loading, not used in this script
let levelDataToLoad = null;
let pNameValue = [];

// ============================================================================
// VERSION DETECTION
// ============================================================================

function detectFileVersion(bytes) {
	if (bytes.length >= 4 && bytes[0] === IZL3_HEADER[0] && bytes[1] === IZL3_HEADER[1] && bytes[2] === IZL3_HEADER[2] && bytes[3] === IZL3_HEADER[3]) {
		return "izl3";
	}

	if (bytes.length >= 2 && bytes[0] === 0x78) {
		return "izl2";
	}

	return "izl";
}

function detectStringVersion(str) {
	if (str[0] === "|") {
		return "izl3";
	}
	if (str[0] === "=") {
		return "izl2";
	}
	return "izl";
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

async function openFile(extensions = [".izl3", ".izl2", ".izl"]) {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = extensions.join(",");
		input.onchange = () => {
			const file = input.files[0];
			if (!file) {
				reject(new Error("No file selected"));
				return;
			}
			const reader = new FileReader();
			reader.onload = () => {
				const bytes = new Uint8Array(reader.result);
				resolve(bytes);
			};
			reader.onerror = () => {
				reject(new Error("Failed to read file"));
			};
			reader.readAsArrayBuffer(file);
		};
		input.click();
	});
}

// ============================================================================
// IZL3 ENCODING/DECODING (CURRENT FORMAT)
// ============================================================================

function packArray(arr) {
	if (arr.length < 6 || arr.length > 9) {
		throw new Error(`Array must contain 6-9 elements, got ${arr.length}`);
	}

	let packed = 0;
	for (let i = 0; i < arr.length; i++) {
		const value = arr[i];
		if (value < 0 || value > 3) {
			throw new Error(`Value at index ${i} must be 0-3, got ${value}`);
		}
		packed |= value << (i * 2);
	}

	const lengthBits = (arr.length - 6) << 14;
	packed |= lengthBits;

	return packed;
}

function unpackArray(packed) {
	const lengthBits = (packed >> 14) & 3;
	const length = lengthBits + 6;

	const arr = [];
	for (let i = 0; i < length; i++) {
		const value = (packed >> (i * 2)) & 3;
		arr.push(value);
	}
	return arr;
}

function tinyifyClone(obj) {
	if (Array.isArray(obj)) {
		return obj.map((item) => tinyifyClone(item));
	}

	if (obj !== null && typeof obj === "object") {
		const result = {};
		for (const [key, value] of Object.entries(obj)) {
			const newKey = TINYIFIER_MAP[key] ?? key;

			if (key === "lfValue" && Array.isArray(value)) {
				result[newKey] = packArray(value);
			} else if (key === "plantName" && typeof value === "string") {
				const plantIndex = izombiePlantsMap.indexOf(value);
				result[newKey] = plantIndex !== -1 ? plantIndex : value;
			} else {
				result[newKey] = tinyifyClone(value);
			}
		}
		return result;
	}

	return obj;
}

function untinyifyClone(obj) {
	if (Array.isArray(obj)) {
		return obj.map((item) => untinyifyClone(item));
	}

	if (obj !== null && typeof obj === "object") {
		const result = {};
		for (const [key, value] of Object.entries(obj)) {
			const newKey = REVERSE_TINYIFIER_MAP[key] ?? key;

			if (newKey === "plantName" && typeof value === "number") {
				result[newKey] = izombiePlantsMap[value] || value;
			} else {
				result[newKey] = untinyifyClone(value);
			}
		}

		if (result.lfValue !== undefined && typeof result.lfValue === "number") {
			result.lfValue = unpackArray(result.lfValue);
		}

		return result;
	}

	return obj;
}

function encodeIZL3(levelData) {
	const tinyified = tinyifyClone(levelData);
	const packed = msgpack.serialize(tinyified);
	const compressed = pako.deflate(packed, { level: 9 });

	const result = new Uint8Array(4 + compressed.length);
	result.set(IZL3_HEADER, 0);
	result.set(compressed, 4);

	return result;
}

function decodeIZL3Bytes(bytes) {
	// Assumes IZL3 header has already been stripped
	const decompressed = pako.inflate(bytes);
	const obj = msgpack.deserialize(decompressed);
	return untinyifyClone(obj);
}

function bytesToBase64(bytes) {
	// Convert Uint8Array -> base64 without blowing the call stack.
	let binary = "";
	const chunkSize = 0x8000;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		const chunk = bytes.subarray(i, i + chunkSize);
		binary += String.fromCharCode(...chunk);
	}
	return btoa(binary);
}

function encodeStringIZL3(levelData) {
	const bytes = encodeIZL3(levelData);
	// Strip the "IZL3" header; strings store only the compressed payload.
	const compressed = bytes.slice(4);
	return "|" + bytesToBase64(compressed);
}

function stringToBytesIZL3(str) {
	// Remove "|" prefix if present
	const base64 = str[0] === "|" ? str.slice(1) : str;
	const compressed = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
	return compressed;
}

// ============================================================================
// IZL2 DECODING (LEGACY - DECODE ONLY)
// ============================================================================

function untinyifyClone_IZL2(tinyString) {
	let originalClone = {};
	const pairs = tinyString.split("\uE006");

	for (const pair of pairs) {
		const [tinyKey, tinyValue] = pair.split("\uE005");
		const originalKey = REVERSE_TINYIFIER_MAP[tinyKey];

		if (!originalKey) {
			continue;
		}

		let originalValue;
		if (originalKey === "plants") {
			originalValue = [];
			const plantStrings = tinyValue.split("\uE003");
			for (const plantString of plantStrings) {
				if (!plantString) {
					continue;
				}

				const plantObj = {};
				const plantData = plantString.slice(1, -1).split("\uE002");

				for (const plantPair of plantData) {
					const [plantTinyKey, plantValueStr] = plantPair.split("\uE004");
					const plantOriginalKey = REVERSE_TINYIFIER_MAP[plantTinyKey];

					if (plantOriginalKey) {
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
			originalValue = tinyValue;
		}

		originalClone[originalKey] = originalValue;
	}

	return originalClone;
}

function decodeIZL2Bytes(bytes) {
	const decompressed = pako.inflate(bytes);
	const decompressedString = new TextDecoder().decode(decompressed);
	return untinyifyClone_IZL2(decompressedString);
}

function stringToBytesIZL2(str) {
	// Remove "=" prefix if present
	const base64 = str[0] === "=" ? str.slice(1) : str;
	const compressed = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
	return compressed;
}

// ============================================================================
// IZL DECODING (LEGACY - DECODE ONLY)
// ============================================================================

function decodeIZLBytes(bytes) {
	const decompressed = pako.inflate(bytes);
	const decompressedString = new TextDecoder().decode(decompressed);
	const data = decompressedString.split(";");

	let levelData = JSON.parse(data[0]);
	const screenshot = data[1];

	if (screenshot) {
		levelData.screenshot = "data:image/webp;base64," + screenshot;
	}

	return levelData;
}

function stringToBytesIZL(str) {
	const compressed = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
	return compressed;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function decodeBytes(bytes) {
	const version = detectFileVersion(bytes);

	if (version === "izl3") {
		return decodeIZL3Bytes(bytes.slice(4)); // Remove header
	} else if (version === "izl2") {
		return decodeIZL2Bytes(bytes);
	}
	return decodeIZLBytes(bytes);
}

async function decodeFile() {
	const bytes = await openFile();
	return decodeBytes(bytes);
}

function decodeString(str) {
	const version = detectStringVersion(str);

	let bytes;
	if (version === "izl3") {
		bytes = stringToBytesIZL3(str);
		return decodeIZL3Bytes(bytes);
	} else if (version === "izl2") {
		bytes = stringToBytesIZL2(str);
		return decodeIZL2Bytes(bytes);
	}
	bytes = stringToBytesIZL(str);
	return decodeIZLBytes(bytes);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function downloadBytesAsFile(bytes, filename) {
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

function cloneFromPlants(name, sun, includeXY, screenshot) {
	name = name.replaceAll(/[\uE000-\uE007]/g, "");

	let plantArray = [];
	let keyedDict = Object.keys($P);

	for (let i = 0; i < keyedDict.length; i++) {
		let plant = $P[keyedDict[i]];
		let plantData = {
			zIndex: plant.zIndex,
			plantRow: plant.R,
			plantCol: plant.C,
			plantName: Object.getPrototypeOf(plant).EName,
		};

		if (includeXY) {
			plantData.eleLeft = parseInt(plant.ele.style.left);
			plantData.eleTop = parseInt(plant.ele.style.top);
			plantData.eleWidth = parseInt(plant.ele.querySelectorAll("img")[1].offsetWidth);
			plantData.eleHeight = parseInt(plant.ele.querySelectorAll("img")[1].offsetHeight);
		}

		plantArray.push(plantData);
	}

	let levelData = {
		plants: plantArray,
		music: oS.LoadMusic,
		sun,
		name,
		lfValue: oGd.$LF,
		screenshot,
	};

	if (oS.ArP?.ArC?.[1] !== undefined) {
		levelData.stripeCol = oS.ArP.ArC[1];
	}

	return levelData;
}

function restoreToPlants(levelData) {
	let plantArray = [...levelData.plants];
	plantArray.sort((a, b) => a.zIndex - b.zIndex);

	for (let plant of plantArray) {
		let placed = CustomSpecial(window[plant.plantName], plant.plantRow, plant.plantCol, 1);
		placed.plantImage.classList.add("cardboard");
	}
}

async function captureScreenshot() {
	return new Promise((resolve, reject) => {
		const element = document.querySelector("#dAll");
		const cardList = document.querySelector("#dCardList");

		if (!element) {
			reject("Element #dAll not found");
			return;
		}

		html2canvas(element, {
			ignoreElements: (el) => el === cardList,
		})
			.then((canvas) => {
				const originalWidth = canvas.width;
				const originalHeight = canvas.height;
				const newWidth = 215;
				const newHeight = (newWidth / originalWidth) * originalHeight;

				const resizedCanvas = document.createElement("canvas");
				resizedCanvas.width = newWidth;
				resizedCanvas.height = newHeight;
				const ctx = resizedCanvas.getContext("2d");
				ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

				resizedCanvas.toBlob(
					(blob) => {
						const reader = new FileReader();
						reader.onloadend = function () {
							resolve(reader.result);
						};
						reader.readAsDataURL(blob);
					},
					"image/webp",
					0.5
				);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
