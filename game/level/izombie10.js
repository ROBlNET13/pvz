/*
	关卡设计者: 寒冰投手
	关卡植物: 5大喷 3南瓜 3魅惑 4土豆 8小向 4三线 3机枪 3仙人掌 10荷叶
*/
oS.Init({
	PName: [
		oFumeShroom,
		oPumpkinHead,
		oHypnoShroom,
		oPotatoMine,
		oSunFlower,
		oThreepeater,
		oGatlingPea,
		oCactus,
		oILilyPad,
	],
	ZName: [
		oIZombie,
		oIConeheadZombie,
		oIBucketheadZombie,
		oIDuckyTubeZombie1,
		oIDuckyTubeZombie2,
		oIDuckyTubeZombie3,
		oIScreenDoorZombie,
		oIPoleVaultingZombie,
		oIBalloonZombie,
	],
	PicArr: [
		"images/interface/background4.jpg",
		"images/interface/trophy.png",
		"images/interface/Stripe.png",
	],
	backgroundImage: "images/interface/background4.jpg",
	Coord: 2,
	DKind: 0,
	LF: [0, 1, 1, 2, 2, 1, 1],
	ShowScroll: false,
	ProduceSun: false,
	SunNum: 350,
	BrainsNum: 6,
	CardKind: 1,
	LevelName: "I, Zombie No Like Water",
	LvlEName: "izombie10",
	LoadMusic: "Cerebrawl",
	StartGameMusic: "Cerebrawl",
	ArP: {
		ArC: [1, 5],
		ArR: [1, 6],
		Auto: 1,
		P: {
			Arr: [
				7, 7, 7, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5,
				5, 5, 6, 6, 6,
			],
			Arr1: [3, 3, 3, 3],
			Arr2: [1, 1, 1],
		},
	},
	RandomGrow: function (Point, Arr) {
		Point.sort(function () {
			return Math.random() - 0.5;
		});
		Arr.sort(function () {
			return Math.random() - 0.5;
		});
		while (Point.length && Arr.length)
			CustomSpecial(
				oS.PName[Arr[Arr.length - 1]],
				Point[Point.length - 1][1],
				Point[Point.length - 1][0],
				1
			),
				Point.length--,
				Arr.length--;
	},
	RiddleAutoGrow: function () {
		var k = oS.ArP,
			f = k.ArC,
			j = k.ArR,
			e = k.P,
			d = oS.PName,
			Arr = [];
		var SummonRange = function (Arr, l, r) {
			for (; l <= r; ++l)
				for (var j = f[0]; j <= f[1]; ++j) Arr.push([j, l]);
		};
		for (var i = f[0]; i <= f[1]; ++i)
			CustomSpecial(oILilyPad, 3, i), CustomSpecial(oLilyPad, 4, i); // 荷叶
		SummonRange(Arr, 3, 4), oS.RandomGrow(Arr, e.Arr); // 处理泳池的植物
		SummonRange(Arr, 1, 2),
			SummonRange(Arr, 5, 6),
			oS.RandomGrow(Arr, e.Arr1),
			oS.RandomGrow(Arr, e.Arr); // 处理剩余的植物
		SummonRange(Arr, 1, 6), oS.RandomGrow(Arr, e.Arr2); // 处理南瓜头
		for (var i = j[0]; i <= j[1]; ++i) CustomSpecial(oBrains, i, 0); // 脑子
		NewImg(
			"iStripe",
			"images/interface/Stripe.png",
			"left:" + (GetX1X2(6)[0] - 11) + "px;top:65px",
			EDAll
		);
	},
	StartGame: function () {
		oP.Monitor(), BeginCool();
		SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
		oS.RiddleAutoGrow();
	},
});
