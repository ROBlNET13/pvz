oS.Init(
	{
		PName: [
			oPeashooter,
			oSunFlower,
			oCherryBomb,
			oWallNut,
			oPotatoMine,
			oSnowPea,
			oChomper,
			oRepeater,
			oPuffShroom,
			oSunShroom,
			oFumeShroom,
			oGraveBuster,
			oHypnoShroom,
			oScaredyShroom,
			oIceShroom,
			oDoomShroom,
			oLilyPad,
			oSquash,
			oThreepeater,
			oTangleKlep,
			oJalapeno,
			oSpikeweed,
			oTorchwood,
			oTallNut,
			oOxygen,
			ostar,
			oTTS,
			oGun,
			oTenManNut,
			oSeaAnemone,
			oCactus,
			oGatlingPea,
			oTwinSunflower,
			oSnowRepeater,
			oSeaShroom,
		],
		ZName: [oDuckyTubeZombie2, oDuckyTubeZombie3, oDuckyTubeZombie4, oDuckyTubeZombie1, oSnorkelZombie],
		PicArr: (function () {
			var a = oCattail.prototype;
			var b = a.PicArr;
			return [
				"images/interface/background5.jpg",
				"images/interface/Dave.gif",
				"images/interface/Dave2.gif",
				"images/interface/Dave3.gif",
				b[a.CardGif],
				b[a.NormalGif],
			];
		})(),
		SunNum: 500,
		LF: [0, 2, 2, 2, 2, 2],
		backgroundImage: "images/interface/background5.jpg",
		CanSelectCard: 1,
		LevelName: "Level 5-2",
		LvlEName: 22,
		LargeWaveFlag: {},
		InitLawnMower() {
			CustomSpecial(oPoolCleaner, 1, -1);
			CustomSpecial(oPoolCleaner, 2, -1);
			CustomSpecial(oPoolCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oPoolCleaner, 5, -1);
		},
		UserDefinedFlagFunc(a) {
			oP.FlagNum === oP.FlagZombies && oP.SetTimeoutWaterZombie(8, 9, 1, [oWarshipsZombie]);
		},
		StartGameMusic: "jiaxing",
	},
	{
		AZ: [
			[oDuckyTubeZombie2, 1, 6],
			[oDuckyTubeZombie3, 1, 7],
			[oDuckyTubeZombie1, 6, 2, [2]],
			[oDuckyTubeZombie4, 1, 10],
			[oSnorkelZombie, 1, 1, [1]],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 20],
			a2: [1, 2, 3, 10, 4, 5, 9, 15],
		},
		FlagToMonitor: {},
		FlagToEnd() {
			NewImg("imgSF", "images/Card/Plants/Ling.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oCattail, 43);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
		},
	}
);
