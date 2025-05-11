oS.Init({
	PName: [oPeashooter, oSunFlower, oFumeShroom, oWallNut, oSnowPea],
	ZName: [oIZombie, oIBucketheadZombie, oIJackinTheBoxZombie],
	PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "images/interface/background2.jpg",
	ShowScroll: false,
	SunNum: 150,
	DKind: 0,
	BrainsNum: 5,
	ProduceSun: false,
	CardKind: 1,
	LevelName: "Totally Nuts",
	StartGameMusic: "Cerebrawl",
	InitLawnMower() {
		var a = 6;
		while (--a) {
			CustomSpecial(oBrains, a, -1);
		}
	},
	ArP: {
		ArC: [1, 4],
		ArR: [1, 5],
		Auto: 1,
		P: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 4],
	},
	RiddleAutoGrow() {
		var k = oS.ArP;
		var f = k.ArC;
		var j = k.ArR;
		var e = k.P;
		var d = oS.PName;
		var c;
		var g = f[0];
		var b = f[1] - 1;
		var i = j[0];
		var h = j[1];
		var a;
		if (k.Auto) {
			while (i <= h) {
				CustomSpecial(oBrains, i, 0);
				let wallnutPlaced = CustomSpecial(oWallNut, i, 4);
				wallnutPlaced.plantImage.classList.add("cardboard");
				for (a = g; a <= b; a++) {
					let placed = CustomSpecial(d[e[(c = Math.floor(Math.random() * e.length))]], i, a);
					e.splice(c, 1);
					placed.plantImage.classList.add("cardboard");
				}
				++i;
			}
		}
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(5)[0] - 11) + "px;top:65px", EDAll);
	},
	StartGame() {
		oP.Monitor();
		BeginCool();
		SetVisible($("dFlagMeter"), $("dTop"));
		StopMusic();
		PlayMusic((oS.LoadMusic = "Cerebrawl"));
		oS.RiddleAutoGrow();
	},
});
