oS.Init(
	{
		PName: [oSunFlower, oPotatoMine, oChomper],
		ZName: [oIZombie, oIPoleVaultingZombie, oIBucketheadZombie, oIDancingZombie, oBackupDancer],
		PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
		backgroundImage: "images/interface/background2.jpg",
		ShowScroll: false,
		SunNum: 150,
		DKind: 0,
		BrainsNum: 5,
		ProduceSun: false,
		CardKind: 1,
		LevelName: "Zomboogie",
		LvlEName: "IZombie7",
		LoadMusic: "Cerebrawl",
		StartGameMusic: "Cerebrawl",
		ArP: {
			ArC: [1, 5],
			ArR: [1, 5],
			Auto: 1,
			P: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
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
						let placed = CustomSpecial(d[e[(c = Math.floor(Math.random() * e.length))]], i, a, 1);
						console.log(placed);
						placed.plantImage.classList.add("cardboard");
						e.splice(c, 1);
					}
					++i;
				}
			}
			NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(6)[0] - 11) + "px;top:65px", EDAll);
		},
		StartGame() {
			oP.Monitor();
			BeginCool();
			SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
			oS.RiddleAutoGrow();
		},
	},
	0,
	{
		AutoSelectCard() {
			var c = oS.ArCard;
			var b = -1;
			var a = c.length - 1;
			while (++b < a) {
				SelectCard(c[b].prototype.EName);
			}
		},
	}
);
