let levelDataToLoad; // global variable to store the level data to load
let pNameValue = []; // for loading plants
let backgroundImage; // for loading the background image
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

function decompressString(compressedBase64) {
	const compressed = Uint8Array.from(atob(compressedBase64), (c) =>
		c.charCodeAt(0)
	);
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
	const blob = new Blob([bytes], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

async function openAndLoadFileAsBytes() {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".izl";
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

function cloneFromPlants(name, sun, screenshot) {
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
		let zIndex = $P[keyedDict[i]].zIndex;
		plantDict[keyedDict[i]] = { zIndex, plantRow, plantCol, plantName };
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
function stringifyClone(levelData) {
	if (levelData.screenshot) {
		let screenshot = levelData.screenshot.replace(
			"data:image/webp;base64,",
			""
		);
		delete levelData.screenshot;
		return compressString(JSON.stringify(levelData)) + ";" + screenshot;
	} else {
		return compressString(JSON.stringify(levelData));
	}
}
function parseClone(stringifiedData) {
	let levelData = JSON.parse(decompressString(stringifiedData.split(";")[0]));
	let screenshot = stringifiedData.split(";")[1];
	if (screenshot) {
		levelData.screenshot = "data:image/webp;base64," + screenshot;
	}
	return levelData;
}
function restoreToPlants(levelData) {
	let plantArray = levelData.plants;
	plantArray.sort((a, b) => a.zIndex - b.zIndex);

	for (let i = 0; i < plantArray.length; i++) {
		let plant = plantArray[i];
		let plantName = plant.plantName;
		let plantRow = plant.plantRow;
		let plantCol = plant.plantCol;
		CustomSpecial(window[plantName], plantRow, plantCol);
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
