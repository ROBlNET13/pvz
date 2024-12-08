oS.Init({
	PName: [
		oPeashooter,
		oSunFlower,
		oIPotatoMine,
		oSnowPea,
		oChomper,
		oFumeShroom,
		oScaredyShroom,
		oSquash,
		oThreepeater,
		oTorchwood,
		oTallNut,
		oSplitPea,
		oStarfruit,
		oHypnoShroom,
	],
	ZName: [
		oIImp,
		oIConeheadZombie,
		oIPoleVaultingZombie,
		oIBucketheadZombie,
		oIFootballZombie,
		oIDiggerZombie,
		oIScreenDoorZombie,
	],
	PicArr: [
		"images/interface/background2.jpg",
		"images/interface/trophy.png",
		"images/interface/Stripe.png",
	],
	backgroundImage: "images/interface/background2.jpg",
	ShowScroll: false,
	DKind: 0,
	SunNum: 150,
	BrainsNum: 5,
	ProduceSun: false,
	CardKind: 1,
	LevelName: "All your brainz r belong to us",
	StartGameMusic: "Cerebrawl",
	InitLawnMower: function () {
		var a = 6;
		while (--a) {
			CustomSpecial(oBrains, a, -1);
		}
	},
	ArP: {
		ArC: [1, 6],
		ArR: [1, 5],
		Auto: 1,
		P: [
			0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 4, 4, 4, 4, 5, 6,
			7, 8, 9, 10, 11, 11, 12, 13,
		],
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
				for (a = g; a <= b; a++) {
					CustomSpecial(
						d[e[(c = Math.floor(Math.random() * e.length))]],
						i,
						a
					);
					e.splice(c, 1);
				}
				++i;
			}
		}
		NewImg(
			"iStripe",
			"images/interface/Stripe.png",
			"left:" + (GetX1X2(7)[0] - 11) + "px;top:65px",
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
