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
		],
		ZName: [
			oZombie,
			oZombie2,
			oZombie3,
			oConeheadZombie,
			oBucketheadZombie,
			oCXZombie,
			oJackinTheBoxZombie,
			oFootballZombie,
			oCConeheadZombie,
			oPoleVaultingZombie,
			oHeiFootballZombie,
			oXBZombie,
			oCZombie,
			oDuckyTubeZombie2,
			oDuckyTubeZombie3,
			oDuckyTubeZombie4,
			oDuckyTubeZombie1,
			oDolphinRiderZombie,
			oCBucketheadZombie,
			oMustacheZombie,
			oTrashZombie,
			oSubZombie,
		],
		PicArr: (function () {
			return ["images/interface/backgroundX1.jpg"];
		})(),
		backgroundImage: "images/interface/backgroundX1.jpg",
		CanSelectCard: 1,
		LevelName: "常青之塔 41层",
		LvlEName: 191,
		SunNum: 9900,
		LF: [0, 2, 3, 3, 2, 2, 0],
		StartGameMusic: "The Great Wall",
		LargeWaveFlag: {
			5: $("imgFlag3"),
			10: $("imgFlag2"),
			15: $("imgFlag1"),
		},
		InitLawnMower() {
			CustomSpecial(oPoolCleaner, 1, -1);
			CustomSpecial(oLawnCleaner, 2, -1);
			CustomSpecial(oLawnCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oPoolCleaner, 5, -1);
		},
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
							200,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						innerText(c, "伙计，欢迎来到常青之塔41层。");
						break;
					case 1:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							200,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [2]);
								};
							},
							[]
						);
						innerText(c, "这里是常青之塔的一个重要分水岭。");
						break;
					case 2:
						PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							200,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [3]);
								};
							},
							[]
						);
						innerText(c, "这里会出现各种地形限制，并且每隔五关为双boss");
						break;
					case 3:
						PlayAudio("crazydaveshort2");
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							100,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [4]);
								};
							},
							[]
						);
						innerText(c, "祝你好运!");
						break;
					case 4:
						$("dDave").src = "images/interface/Dave2.gif";
						ClearChild($("DivTeach"));
						oSym.addTask(
							50,
							() => {
								ClearChild($("dDave"));
								a(0);
							},
							[]
						);
				}
			})(0);
		},
	},
	{
		AZ: [
			[oZombie, 1, 1],
			[oZombie2, 1, 1],
			[oZombie3, 1, 1],
			[oConeheadZombie, 1, 1],
			[oBucketheadZombie, 1, 1],
			[oCXZombie, 1, 1],
			[oJackinTheBoxZombie, 1, 1],
			[oFootballZombie, 1, 1],
			[oDolphinRiderZombie, 1, 1],
			[oCConeheadZombie, 1, 1],
			[oPoleVaultingZombie, 1, 1],
			[oHeiFootballZombie, 1, 1],
			[oDuckyTubeZombie2, 1, 1],
			[oDuckyTubeZombie3, 1, 1],
			[oDuckyTubeZombie1, 1, 1],
			[oDuckyTubeZombie4, 1, 1],
			[oCZombie, 1, 1],
			[oXBZombie, 1, 1],
			[oCBucketheadZombie, 1, 1],
			[oMustacheZombie, 1, 1],
			[oTrashZombie, 1, 1],
			[oSubZombie, 1, 1],
		],
		FlagNum: 15,
		FlagToSumNum: {
			a1: [55, 78, 102, 131, 146, 174, 174],
			a2: [55, 78, 102, 131, 146, 174, 193],
		},
		FlagToMonitor: {
			4: [ShowLargeWave, 0],
			9: [ShowLargeWave, 0],
			14: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(192);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
