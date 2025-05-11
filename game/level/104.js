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
			oBigChomper,
			oFlamesMushroom,
		],
		ZName: [
			oCZombie,
			oCZombie2,
			oCZombie3,
			oCConeheadZombie,
			oCBucketheadZombie,
			oDuckyTubeZombie1,
			oDuckyTubeZombie2,
			oDuckyTubeZombie3,
			oCPoleVaultingZombie,
			oCSnorkelZombie,
			oCDolphinRiderZombie,
		],
		PicArr: ["images/interface/backgroundX1.jpg"],
		LF: [0, 2, 3, 3, 2, 2, 0],
		backgroundImage: "images/interface/backgroundX1.jpg",
		CanSelectCard: 1,
		LevelName: "Ancient water village",
		LvlEName: 9,
		SunNum: 525,
		coord: 2,
		LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
		InitLawnMower() {
			CustomSpecial(oPoolCleaner, 1, -1);
			CustomSpecial(oCleaner, 2, -1);
			CustomSpecial(oCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oPoolCleaner, 5, -1);
		},
		AudioArr: ["crazydaveshort2", "crazydavelong1", "crazydavelong2", "crazydavelong3"],
		LoadMusic: "MyScrapbook",
		StartGameMusic: "The Great Wall",
		LoadAccess(a) {
			NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
			NewEle("DivTeach", "div", 0, 0, EDAll);
			(function (d) {
				var b = arguments.callee;
				var c = $("DivTeach");
				switch (d) {
					case 0:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">Welcome to the second stop of our trip to China, neighbors.</span>';
						break;
					case 1:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [2]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">请你放心</span>';
						break;
					case 2:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [3]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">This is definitely not the yard of a Chinese family, let alone the roof!</span>';
						break;
					case 3:
						PlayAudio("crazydaveshort2");
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [4]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">Listen up, here, fight the zombies.</span>';
						break;
					case 4:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [5]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">Remember to bring lotus leaves and flower pots at the same time. Good luck!</span>';
						break;
					case 5:
						$("dDave").src = "images/interface/Dave2.gif";
						ClearChild($("DivTeach"));
						oSym.addTask(
							5,
							() => {
								ClearChild($("dDave"));
								a(0);
								StopMusic();
								PlayMusic((oS.LoadMusic = "ChooseYourSeeds"));
							},
							[]
						);
				}
			})(0);
		},
	},
	{
		AZ: [
			[oCZombie, 1, 1],
			[oCZombie2, 1, 2],
			[oCZombie3, 2, 3],
			[oCConeheadZombie, 1, 3],
			[oCPoleVaultingZombie, 1, 9],
			[oCBucketheadZombie, 2, 5],
			[oDuckyTubeZombie1, 2, 5],
			[oCSnorkelZombie, 1, 9],
			[oCDolphinRiderZombie, 1, 10],
			[oDuckyTubeZombie2, 1, 7],
			[oDuckyTubeZombie3, 1, 10],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 7, 10, 13, 15, 19, 20, 23, 25, 29],
			a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25],
		},
		FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(105);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
