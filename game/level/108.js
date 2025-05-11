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
		ZName: [oCZombie, oCZombie2, oCZombie3, oCConeheadZombie, oBalloonZombie, oCFootballZombie, oCPoleVaultingZombie, othugZombie],
		PicArr: ["images/interface/backgroundX3.jpg"],
		LF: [0, 3, 3, 0, 3, 3, 0],
		ZF: [0, 3, 3, 0, 3, 3, 0],
		backgroundImage: "images/interface/backgroundX3.jpg",
		CanSelectCard: 1,
		LevelName: "Foot of volcano",
		LvlEName: 1,
		SunNum: 350,
		LargeWaveFlag: { 10: $("imgFlag2"), 20: $("imgFlag1") },
		InitLawnMower() {
			CustomSpecial(oCleaner, 1, -1);
			CustomSpecial(oCleaner, 2, -1);
			CustomSpecial(oCleaner, 4, -1);
			CustomSpecial(oCleaner, 5, -1);
		},
		AudioArr: ["crazydaveshort2", "crazydavelong1", "crazydavelong2", "crazydavelong3"],
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
						c.innerHTML = '<span style="font-size:22px">We are getting closer and closer to King Qins lair, arent we?</span>';
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
						c.innerHTML = '<span style="font-size:22px">We have encountered the level of the stone ground in the middle before.,</span>';
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
						c.innerHTML = '<span style="font-size:22px">CanWhat kind of crooked way is this!t even grow on it!</span>';
						break;
					case 3:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [4]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">What kind of crooked way is this!</span>';
						break;
					case 4:
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
			[oCZombie2, 3, 2],
			[oCZombie3, 3, 3],
			[oCConeheadZombie, 1, 5],
			[oBalloonZombie, 1, 6],
			[oCFootballZombie, 1, 5],
			[oCPoleVaultingZombie, 1, 15],
			[othugZombie, 1, 10],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 7, 10, 13, 15, 19, 20, 23, 25, 29],
			a2: [1, 2, 3, 8, 4, 5, 6, 15, 7, 8, 9, 25, 48, 60],
		},
		FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(109);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
