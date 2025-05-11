// make sure everything in levelDataToLoad is defined
if (typeof levelDataToLoad === "undefined") {
	alert("Invalid level data!");
	SelectModal(0);
} else {
	// make sure its a table the one with {}
	if (typeof levelDataToLoad !== "object") {
		alert("Invalid level data!");
		SelectModal(0);
	}
	// make sure it has the right keys
	if (
		!levelDataToLoad.hasOwnProperty("plants") ||
		!levelDataToLoad.hasOwnProperty("music") ||
		!levelDataToLoad.hasOwnProperty("sun") ||
		!levelDataToLoad.hasOwnProperty("lfValue") ||
		!levelDataToLoad.hasOwnProperty("stripeCol")
	) {
		/* alert("Invalid level data!");
		SelectModal(0); */
		levelDataToLoad = {
			lfValue: [0, 1, 1, 1, 1, 1],
			music: "Cerebrawl",
			name: "lol",
			plants: [
				{
					zIndex: 6,
					plantRow: 2,
					plantCol: 1,
					plantName: "oWallNut",
				},
				{
					zIndex: 9,
					plantRow: 3,
					plantCol: 1,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 1,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 2,
					plantName: "oWallNut",
				},
				{
					zIndex: 6,
					plantRow: 2,
					plantCol: 4,
					plantName: "oWallNut",
				},
				{
					zIndex: 9,
					plantRow: 3,
					plantCol: 4,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 4,
					plantName: "oWallNut",
				},
				{
					zIndex: 6,
					plantRow: 2,
					plantCol: 5,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 5,
					plantName: "oWallNut",
				},
				{
					zIndex: 6,
					plantRow: 2,
					plantCol: 6,
					plantName: "oWallNut",
				},
				{
					zIndex: 9,
					plantRow: 3,
					plantCol: 6,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 6,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 8,
					plantName: "oWallNut",
				},
				{
					zIndex: 12,
					plantRow: 4,
					plantCol: 9,
					plantName: "oWallNut",
				},
				{
					zIndex: 9,
					plantRow: 3,
					plantCol: 8,
					plantName: "oWallNut",
				},
				{
					zIndex: 6,
					plantRow: 2,
					plantCol: 8,
					plantName: "oWallNut",
				},
			],
			screenshot: "",
			stripeCol: 49,
			sun: 49,
		};
	}
	// make sure the keys are the right types
	if (
		!Array.isArray(levelDataToLoad.plants) ||
		typeof levelDataToLoad.music !== "string" ||
		typeof levelDataToLoad.sun !== "number" ||
		typeof levelDataToLoad.name !== "string" ||
		!Array.isArray(levelDataToLoad.lfValue) ||
		typeof levelDataToLoad.stripeCol !== "number"
	) {
		alert("Invalid level data!");
		SelectModal(0);
	}
}
for (let i = 0; i < levelDataToLoad.plants.length; i++) {
	let plant = levelDataToLoad.plants[i];
	if (!pNameValue.includes(window[plant.plantName])) {
		pNameValue.push(window[plant.plantName]);
	}
}
// if lfValue is [0, 1, 1, 2, 2, 1, 1], then we use background4, otherwise background2
backgroundImage = levelDataToLoad.lfValue[3] === 2 ? "images/interface/background4.jpg" : "images/interface/background2.jpg";
// if its [0, 1, 1, 2, 2, 1, 1], then we use 6 brains, otherwise 5
brainsNum = levelDataToLoad.lfValue[3] === 2 ? 6 : 5;

oS.Init({
	PName: pNameValue,
	ZName: [oIImp, oIConeheadZombie, oIPoleVaultingZombie, oIBucketheadZombie, oIFootballZombie, oIJackinTheBoxZombie, oIScreenDoorZombie],
	PicArr: [backgroundImage, "images/interface/trophy.png", "images/interface/Stripe.png"],
	LF: levelDataToLoad.lfValue,
	backgroundImage,
	ShowScroll: false,
	SunNum: levelDataToLoad.sun,
	BrainsNum: 5,
	DKind: 0,
	ProduceSun: false,
	CardKind: 1,
	LevelName: levelDataToLoad.name,
	LevelEName: "izombiecustomlevelnormal",
	StartGameMusic: levelDataToLoad.music,
	InitLawnMower() {
		var a = 6;
		while (--a) {
			CustomSpecial(oBrains, a, -1);
		}
	},
	ArP: {
		ArC: [1, levelDataToLoad.stripeCol - 1],
		ArR: [1, 5],
		Auto: 1,
		P: [],
	},
	RiddleAutoGrow() {
		var k = oS.ArP;
		var f = k.ArC;
		var j = k.ArR;
		var e = k.P;
		var d = oS.PName;
		var c;
		var g = f[0];
		var b = f[1];
		var i = j[0];
		var h = j[1];
		var a;
		if (k.Auto) {
			while (i <= h) {
				CustomSpecial(oBrains, i, 0);
				/*for (a = g; a <= b; a++) {
                    CustomSpecial(
                        d[e[(c = Math.floor(Math.random() * e.length))]],
                        i,
                        a
                    );
                    e.splice(c, 1);
                }*/
				++i;
			}
		}
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(levelDataToLoad.stripeCol)[0] - 11) + "px;top:65px", EDAll);
	},
	StartGame() {
		restoreToPlants(levelDataToLoad); // load the plants
		// clear all query parameters from the url without reloadng
		window.history.pushState({}, document.title, window.location.pathname);
		SetVisible($("dSunNum"));
		SetBlock($("dTop"));
		oP.Monitor({
			ar: [0],
			f(d) {
				var b = oS.Chose;
				var a = arguments.callee;
				switch (d) {
					case 0:
						BeginCool();
						d.onclick = null;
						(function () {
							SetVisible($("dFlagMeter"), $("dFlagMeterContent"));
							ClearChild($("oEmbed"));
							StopMusic();
							PlayMusic((oS.LoadMusic = levelDataToLoad.music));
							BeginCool();
							oP.Monitor();
						})();
				}
			},
		});
		SetVisible($("dFlagMeter"));
		oS.RiddleAutoGrow();
	},
});
