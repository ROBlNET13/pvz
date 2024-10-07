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
		alert("Invalid level data!");
		SelectModal(0);
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
backgroundImage =
	levelDataToLoad.lfValue[3] === 2
		? "images/interface/background4.jpg"
		: "images/interface/background2.jpg";
// if its [0, 1, 1, 2, 2, 1, 1], then we use 6 brains, otherwise 5
brainsNum = levelDataToLoad.lfValue[3] === 2 ? 6 : 5;

oS.Init({
	PName: pNameValue,
	ZName: [
		oIImp,
		oIConeheadZombie,
		oIPoleVaultingZombie,
		oIBucketheadZombie,
		oIFootballZombie,
		oIJackinTheBoxZombie,
		oIScreenDoorZombie,
	],
	PicArr: [
		backgroundImage,
		"images/interface/trophy.png",
		"images/interface/Stripe.png",
	],
	LF: levelDataToLoad.lfValue,
	backgroundImage: backgroundImage,
	ShowScroll: false,
	SunNum: levelDataToLoad.sun,
	BrainsNum: 5,
	DKind: 0,
	ProduceSun: false,
	CardKind: 1,
	LevelName: levelDataToLoad.name,
	LevelEName: "izombiecustomlevelnormal",
	StartGameMusic: levelDataToLoad.music,
	InitLawnMower: function () {
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
	RiddleAutoGrow: function () {
		var k = oS.ArP,
			f = k.ArC,
			j = k.ArR,
			e = k.P,
			d = oS.PName,
			c,
			g = f[0],
			b = f[1],
			i = j[0],
			h = j[1],
			a;
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
		NewImg(
			"iStripe",
			"images/interface/Stripe.png",
			"left:" +
				(GetX1X2(levelDataToLoad.stripeCol)[0] - 11) +
				"px;top:65px",
			EDAll
		);
	},
	StartGame: function () {
		SetVisible($("dSunNum"));
		SetBlock($("dTop"));
		NewEle("DivTeach", "div", 0, 0, EDAll);
		oP.Monitor({
			ar: [0],
			f: function (d) {
				var b = oS.Chose,
					a = arguments.callee,
					c = $("DivTeach");
				switch (d) {
					case 0:
						BeginCool();
						c.onclick = null;
						oSym.addTask(
							500,
							function () {
								SetNone(c);
							},
							[]
						);
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

restoreToPlants(levelDataToLoad); // load the plants
// clear all query parameters from the url without reloadng
window.history.pushState({}, document.title, window.location.pathname);
