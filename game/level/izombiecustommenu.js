var customplants;
var customtitle = "I, Zombie Level Editor";
var customcolumns = 4;
var customsun = 150;
oS.Init({
	PicArr: (function () {
		a = "images/interface/";
		return [ShadowPNG];
	})(),
	LevelName: "I, Zombie Menu",
	LevelEName: 150,
	ShowScroll: 1,
	LoadMusic: "Cerebrawl",
	StartGameMusic: "Cerebrawl",
	AudioArr: ["Cerebrawl", "pvzs"],
	backgroundImage: "images/interface/IZombie_Background.png",
	LoadAccess(a) {
		NewImg("imgSF", "images/interface/BackButton.png", "left:785px;top:530px", EDAll, {
			onclick() {
				SelectModal(0);
				SetBlock($("dSurface"), $("iSurfaceBackground"));
			},
		});
		// native code from now on
		let inputDataElement = document.createElement("input");
		inputDataElement.type = "search"; // just for a clear button
		inputDataElement.placeholder = "Level data here...";
		inputDataElement.style.position = "absolute";
		inputDataElement.style.left = "50%";
		inputDataElement.style.top = "50%";
		inputDataElement.style.transform = "translate(-50%, -50%)";
		inputDataElement.style.width = "50%";
		inputDataElement.style.padding = "7px";
		inputDataElement.style.borderStyle = "solid";
		inputDataElement.style.borderRadius = "10px";
		inputDataElement.style.fontSize = "large";
		$("dAll").appendChild(inputDataElement);
		// now the button
		let buttonElement = document.createElement("input");
		buttonElement.setAttribute("type", "button");
		buttonElement.setAttribute("value", "LOAD LEVEL");
		buttonElement.id = "btnNextLevel"; // not actually a next level button, but it's the same style
		buttonElement.style.top = "60%";
		buttonElement.style.left = "calc(50% - 120px)";
		let buttonElementUpload = document.createElement("input");
		buttonElementUpload.setAttribute("type", "button");
		buttonElementUpload.setAttribute("value", "SELECT FILE");
		buttonElementUpload.id = "btnNextLevel"; // not actually a next level button, but it's the same style
		buttonElementUpload.style.top = "60%";
		buttonElementUpload.style.left = "calc(50% + 5px)";
		buttonElementUpload.onclick = async function () {
			let levelData = await fileToLevelData();
			inputDataElement.value = levelData;
			buttonElement.click();
		};
		$("dAll").appendChild(buttonElementUpload);
		buttonElement.onclick = function () {
			// store the input value and disable it, then make it say "Loading..."
			let levelData = inputDataElement.value;
			inputDataElement.disabled = true;
			inputDataElement.value = "Loading...";
			// decode the input value
			try {
				levelDataToLoad = levelData[0] === "=" ? parseCloneTiny(levelData) : parseClone(levelData);
			} catch (e) {
				inputDataElement.value = "Invalid level data!";
				inputDataElement.disabled = false;
				return;
			}
			// load the izombiecustomlevel level
			if (levelDataToLoad.lfValue[3] === 2) {
				SelectModal("izombiecustomlevelwater");
			} else {
				SelectModal("izombiecustomlevelnormal");
			}
		};
		// put in #dAll
		$("dAll").appendChild(buttonElement);
	},
});

// clear all query parameters from the url without reloadng
window.history.pushState({}, document.title, window.location.pathname);
