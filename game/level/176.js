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
			oCactus,
			oPlantern,
			oSplitPea,
			oStarfruit,
			oPumpkinHead,
			oFlowerPot,
			oCoffeeBean,
			oGarlic,
			oSeaShroom,
			oOxygen,
			ostar,
			oTTS,
			oGun,
			oSeaAnemone,
			oGatlingPea,
			oGloomShroom,
			oTwinSunflower,
			oSpikerock,
			oTenManNut,
			oSnowRepeater,
			oCattail,
			oLotusRoot,
			oIceFumeShroom,
			oLaserBean,
		],
		ZName: [oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDuckyTubeZombie4, oDolphinRiderZombie, oSubZombie, oSnorkelZombie, oWarshipsZombie],
		PicArr: (function () {
			return ["images/interface/background5.jpg"];
		})(),
		backgroundImage: "images/interface/background5.jpg",
		CanSelectCard: 1,
		LevelName: "常青之塔 26层",
		LvlEName: 176,
		SunNum: 6e3,
		LF: [0, 2, 2, 2, 2, 2, 2],
		StartGameMusic: "jiaxing",
		LargeWaveFlag: {},
		InitLawnMower() {
			CustomSpecial(oPoolCleaner, 1, -1);
			CustomSpecial(oPoolCleaner, 2, -1);
			CustomSpecial(oPoolCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oPoolCleaner, 5, -1);
		},
		UserDefinedFlagFunc(a) {
			oP.FlagNum === oP.FlagZombies && oP.SetTimeoutWaterZombie(4, 9, 6, [oDuckyTubeZombie2]);
		},
	},
	{
		AZ: [
			[oDuckyTubeZombie1, 1, 1],
			[oDuckyTubeZombie2, 1, 1],
			[oDuckyTubeZombie3, 1, 1],
			[oDuckyTubeZombie4, 1, 1],
			[oDolphinRiderZombie, 1, 1],
			[oSubZombie, 1, 1],
			[oSnorkelZombie, 1, 1],
			[oWarshipsZombie, 1, 1],
		],
		FlagNum: 10,
		FlagToSumNum: { a1: [40, 74, 76, 92], a2: [40, 74, 76, 112] },
		FlagToMonitor: {},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(177);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
