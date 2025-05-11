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
			oTallNut,
			oSeaShroom,
			oPlantern,
			oCactus,
			oBlover,
			oSplitPea,
			oStarfruit,
			oPumpkinHead,
			oFlowerPot,
			oCoffeeBean,
			oGarlic,
			oTwinSunflower,
			oSpikerock,
			oCattail,
			oZombie,
			oPoleVaultingZombie,
			oConeheadZombie,
			oBucketheadZombie,
			oNewspaperZombie,
			oScreenDoorZombie,
			oFootballZombie,
			oDancingZombie,
			oZomboni,
			oJackinTheBoxZombie,
			oBalloonZombie,
			oImp,
			oDiggerZombie,
		],
		ZName: [
			oBackupDancer,
			oZombie,
			oZombie2,
			oZombie3,
			oPoleVaultingZombie,
			oConeheadZombie,
			oBucketheadZombie,
			oNewspaperZombie,
			oScreenDoorZombie,
			oFootballZombie,
			oDancingZombie,
			oDuckyTubeZombie1,
			oDuckyTubeZombie2,
			oDuckyTubeZombie3,
			oDolphinRiderZombie,
			oSnorkelZombie,
			oZomboni,
			oJackinTheBoxZombie,
			oBalloonZombie,
			oImp,
		],
		PicArr: ["images/interface/background5.jpg", "images/interface/ZombieNoteSmall.png", "images/interface/ZombieNote1.png"],
		backgroundImage: "images/interface/background5.jpg",
		CanSelectCard: 1,
		Coord: 3,
		SunNum: 114514,
		LevelName: "屋顶关测试",
		LvlEName: 9,
		Cheat_Mode: 1,
		StartGame() {
			StopMusic();
			!oS.MusicMode && PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				oS.MusicMode && PlayMusic((oS.LoadMusic = oS.StartGameMusic));

				oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
				for (let i in ArCard) {
					DoCoolTimer(i, 0);
				}

				AutoProduceSun(25);
				oSym.addTask(
					1500,
					() => {
						oP.AddZombiesFlag();
						SetVisible($("dFlagMeterContent"));
					},
					[]
				);
			});
		},
		LargeWaveFlag: {
			10: $("imgFlag3"),
			20: $("imgFlag2"),
			30: $("imgFlag1"),
		},
	},
	{
		AZ: [
			[oZombie, 2, 1],
			[oZombie2, 2, 1],
			[oZombie3, 2, 1],
			[oConeheadZombie, 2, 1],
			[oPoleVaultingZombie, 1, 1],
			[oBucketheadZombie, 1, 1],
		],
		FlagNum: 30,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
			a2: [1, 2, 3, 10, 4, 6, 8, 20, 10, 12, 15, 30],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowLargeWave, 0],
			29: [ShowFinalWave, 0],
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
					}).src = "images/interface/ZombieNote1.png";
					this.onclick = function () {
						SelectModal(10);
					};
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
