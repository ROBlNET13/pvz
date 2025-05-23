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
		],
		ZName: [oZombie, oConeheadZombie, oJackinTheBoxZombie, oXBZombie, oJY, oCXZombie, oJX],
		PicArr: (function () {
			return ["images/interface/backgroundLG.jpg"];
		})(),
		SunNum: 200,
		LF: [0, 3, 3, 3, 3, 3, 3],
		backgroundImage: "images/interface/backgroundLG.jpg",
		CanSelectCard: 1,
		DKind: 0,
		LevelName: "Level 4-9",
		LvlEName: 39,
		LargeWaveFlag: {
			10: $("imgFlag4"),
			20: $("imgFlag3"),
			30: $("imgFlag2"),
			50: $("imgFlag1"),
		},
		StartGameMusic: "Lg_pk",
	},
	{
		AZ: [
			[oZombie, 4, 1],
			[oConeheadZombie, 2, 1],
			[oXBZombie, 2, 5, [5, 10, 15, 20, 25, 30, 45, 50]],
			[oJackinTheBoxZombie, 1, 10, [10, 30, 45, 50]],
			[oJY, 2, 7, [7, 10, 15, 20, 25, 30, 45, 50]],
			[oCXZombie, 3, 20, [20, 25, 30, 45, 50]],
			[oJX, 1, 1],
		],
		FlagNum: 50,
		FlagToSumNum: {
			a1: [3, 4, 5, 9, 9, 13, 15, 19, 20, 23, 25, 30, 50],
			a2: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 10, 20, 30, 45],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowLargeWave, 0],
			29: [ShowLargeWave, 0],
			49: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/ZombieNoteSmall.png", "left:667px;top:220px", EDAll, {
				onclick() {
					PlayAudio("winmusic");
					SetHidden($("PointerUD"));
					SetStyle(this, {
						width: "613px",
						height: "399px",
						left: "193px",
						top: "100px",
					}).src = "images/interface/ZombieNoteLG.png";
					this.onclick = function () {
						SelectModal(40);
					};
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
