oS.Init({
	PName: [oPeashooter, oSunFlower, oSnowPea, oCactus],
	ZName: [oIZombie, oIBucketheadZombie, oIJackinTheBoxZombie, oIBalloonZombie],
	PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "images/interface/background2.jpg",
	ShowScroll: false,
	SunNum: 150,
	BrainsNum: 5,
	DKind: 0,
	ProduceSun: false,
	CardKind: 1,
	LevelName: "I, Zombie",
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
		P: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3],
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
				for (a = g; a <= b; a++) {
					let placed = CustomSpecial(d[e[(c = Math.floor(Math.random() * e.length))]], i, a);
					console.log(placed);
					placed.plantImage.classList.add("cardboard");
					e.splice(c, 1);
				}
				++i;
			}
		}
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(5)[0] - 11) + "px;top:65px", EDAll);
	},
	StartGame() {
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
						(function () {
							SetVisible($("dFlagMeter"), $("dFlagMeterContent"));
							ClearChild($("oEmbed"));
							StopMusic();
							PlayMusic((oS.LoadMusic = "Cerebrawl"));
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
