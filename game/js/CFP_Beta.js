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

function decompressString(compressedBase64) {
    const compressed = Uint8Array.from(atob(compressedBase64), (c) =>
        c.charCodeAt(0)
    );
    const decompressed = pako.inflate(compressed);
    const decompressedString = new TextDecoder().decode(decompressed);
    return decompressedString;
}

function cloneFromPlants(name, sun) {
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
        let zIndex = $P[keyedDict[i]].zIndex;
        plantDict[keyedDict[i]] = { zIndex, pos1, pos2, plantName };
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
        stripeCol: oS.ArP.ArC[1],
        /*
         * not sure what lf stands for but its for where u can place plants/zombies
         * 0 is for nothing
         * 1 is for normal
         * 2 is for water
         * 3 is for oxygen/pots
         * the first value should always be 0
         */
    };
    return levelData;
}
function stringifyClone(levelData) {
    return compressString(JSON.stringify(levelData));
}
function parseClone(stringifiedData) {
    return JSON.parse(decompressString(stringifiedData));
}
function restoreToPlants(levelData) {
    let plantArray = levelData.plants;
    plantArray.sort((a, b) => a.zIndex - b.zIndex);

    for (let i = 0; i < plantArray.length; i++) {
        let plant = plantArray[i];
        let plantName = plant.plantName;
        let pos1 = plant.pos1;
        let pos2 = plant.pos2;
        CustomSpecial(window[plantName], pos1, pos2);
    }
}
