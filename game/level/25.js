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
		],
		ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oDuckyTubeZombie2, oConeheadZombie, oZomboni],
		PicArr: (function () {
			var a = oSpikeweed.prototype;
			var b = a.PicArr;
			return ["images/interface/background3.webp", b[a.CardGif], b[a.NormalGif]];
		})(),
		Coord: 2,
		SunNum: 375,
		LF: [0, 1, 1, 2, 2, 1, 1],
		backgroundImage: "images/interface/background3.webp",
		CanSelectCard: 1,
		LevelName: "3-5 Special Level: Zombie Run",
		LvlEName: 25,
		LvlClearFunc() {
			oSym.Clear();
		},
		LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
		LoadAccess(a) {
			NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
			NewEle("DivTeach", "div", 0, 0, EDAll);
			(function (d) {
				var b = arguments.callee;
				var c = $("DivTeach");
				switch (d) {
					case 0:
						PlayAudio("crazydaveshort1");
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						innerText(c, "Have you ever thought that zombies can also practice a pair of fast feet?");
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
						innerText(c, "What a terrible thing that is!");
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
						innerText(c, "Protect our house");
						break;
					case 3:
						$("dDave").src = "images/interface/Dave2.gif";
						ClearChild($("DivTeach"));
						oSym.addTask(
							5,
							() => {
								ClearChild($("dDave"));
								a(0);
							},
							[]
						);
				}
			})(0);
		},
		StartGameMusic: "LoonSkirmish",
		StartGame() {
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				oP.Monitor({
					ar: [],
					f() {
						oSym.TimeStep = 4;
					},
				});
				BeginCool();
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
	},
	{
		AZ: [
			[oZombie, 2, 1],
			[oZombie2, 3, 5],
			[oZombie3, 1, 9],
			[oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10, 20, 29, 30]],
			[oDuckyTubeZombie2, 1, 10],
			[oDuckyTubeZombie3, 1, 13],
			[oConeheadZombie, 1, 5],
			[oZomboni, 1, 15, [15, 20]],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19],
			a2: [1, 3, 5, 20, 10, 15, 20],
		},
		FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(26);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
		},
	}
);
