function cloneFromPlants(music, background) {
	let keyedDict = Object.keys($P);
	let plantDict = {};
	// for every object in $P, save the following data:
	// $P[keyedDict[i]].R // save as pos1
	// $P[keyedDict[i]].C // save as pos2
	// Object.getPrototypeOf($P[keyedDict[6]]).EName // save as plantName

	for (let i = 0; i < keyedDict.length; i++) {
		let pos1 = $P[keyedDict[i]].R;
		let pos2 = $P[keyedDict[i]].C;
		let plantName = Object.getPrototypeOf($P[keyedDict[i]]).EName;
		plantDict[keyedDict[i]] = { pos1, pos2, plantName };
	}
	// now turn it into an array of dictionaries
	let plantArray = Object.values(plantDict);
	// now put that array into another array with the background
	let levelData = [plantArray, background];
	return levelData;
}
function stringifyClone(levelData) {
	return JSON.stringify(levelData);
}
function parseClone(stringifiedData) {
	return JSON.parse(stringifiedData);
}
function restoreToPlants(levelData) {
	// we'll use a function for the plants
	// CustomSpecial(window[planeName], pos1, pos2);
	// the background will just set oS.backgroundImage
	// bg functionality is for later
	let plantArray = levelData[0];
	// let background = levelData[1];
	// oS.backgroundImage = background;
	// in case that doesnt work set it manually too
	// document.querySelector("#tGround").style.backgroundImage = `url("${background}")`;
	for (let i = 0; i < plantArray.length; i++) {
		let plant = plantArray[i];
		let plantName = plant.plantName;
		let pos1 = plant.pos1;
		let pos2 = plant.pos2;
		CustomSpecial(window[plantName], pos1, pos2);
	}
}
