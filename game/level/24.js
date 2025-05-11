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
		],
		ZName: [
			oZombie,
			oZombie2,
			oZombie3,
			oDuckyTubeZombie1,
			oDuckyTubeZombie2,
			oDuckyTubeZombie3,
			oConeheadZombie,
			oNewspaperZombie,
			oBucketheadZombie,
			oPoleVaultingZombie,
			oSnorkelZombie,
		],
		PicArr: (function () {
			var a = oJalapeno.prototype;
			var b = a.PicArr;
			return ["images/interface/background3.webp", "images/interface/trophy.png", b[a.CardGif], b[a.NormalGif]];
		})(),
		Coord: 2,
		SunNum: 50,
		LF: [0, 1, 1, 2, 2, 1, 1],
		backgroundImage: "images/interface/background3.webp",
		CanSelectCard: 1,
		LevelName: "Level 3-4",
		LvlEName: 24,
		LargeWaveFlag: {
			10: $("imgFlag3"),
			20: $("imgFlag2"),
			30: $("imgFlag1"),
		},
		UserDefinedFlagFunc(a) {
			oP.FlagNum === oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 3, [oDuckyTubeZombie1]);
		},
		StartGameMusic: "WateryGraves",
	},
	{
		AZ: [
			[oZombie, 2, 1],
			[oZombie2, 2, 1],
			[oZombie3, 1, 1],
			[oNewspaperZombie, 1, 1],
			[oPoleVaultingZombie, 1, 1],
			[oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10, 20, 29, 30]],
			[oDuckyTubeZombie2, 1, 6],
			[oDuckyTubeZombie3, 1, 6],
			[oConeheadZombie, 1, 1],
			[oBucketheadZombie, 1, 1],
			[oSnorkelZombie, 1, 7, [29, 30]],
		],
		FlagNum: 30,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
			a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowLargeWave, 0],
			29: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px;z-index:255", EDAll, {
				onclick() {
					SelectModal(25);
				},
			});
		},
	}
);
