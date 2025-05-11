oS.Init(
	{
		PName: [oCherryBomb, oJalapeno, oPotatoMine, oGarlic, oWallNut, oSquash, oThreepeater],
		ZName: [oPoleVaultingZombie, oZombie],
		ShowScroll: true,
		SunNum: 325,
		LF: [0, 1, 1, 1, 1, 1],
		ZF: [0, 1, 0, 1, 0, 1],
		PicArr: (function () {
			return ["images/interface/background1.jpg"];
		})(),
		backgroundImage: "images/interface/background1.jpg",
		CanSelectCard: 0,
		LevelName: "Sun Power",
		LvlClearFunc() {
			oSym.TimeStep = 10;
		},
		LvlEName: "SunPower",
		LargeWaveFlag: { 10: $("imgFlag1") },
		StartGameMusic: "LoonSkirmish",
		StartGame() {
			oS.SunFlowerNum = 0;
			NewEle("DivTeach", "div", 0, { innerHTML: "Don't let the zombies eat your sunflowers!" }, EDAll);
			var a;
			for (a = 1; a < 7; a++) {
				CustomSpecial(oSunFlower, 1, a);
			}
			for (a = 1; a < 7; a++) {
				CustomSpecial(oSunFlower, 3, a);
			}
			for (a = 1; a < 7; a++) {
				CustomSpecial(oSunFlower, 5, a);
			}
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				oP.Monitor();
				(function () {
					var b = 0;
					for (v in $P) {
						$P[v].EName === "oSunFlower" && ++b;
					}
					b > 17 ? oSym.addTask(200, arguments.callee, []) : GameOver("Level Failed, <br>Please try again!");
				})();
				BeginCool();
				oS.DKind && AutoProduceSun(25);
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"));
				oSym.addTask(
					500,
					() => {
						ClearChild($("DivTeach"));
					},
					[]
				);
			});
		},
	},
	{
		AZ: [
			[oPoleVaultingZombie, 3, 3],
			[oZombie, 1, 1],
		],
		FlagNum: 10,
		FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
		FlagToMonitor: { 9: [ShowFinalWave, 0] },
		FlagToEnd() {
			(function () {
				var a = 0;
				for (v in $P) {
					$P[v].EName === "oSunFlower" && ++a;
				}
				a > 9
					? NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px;z-index:256", EDAll, {
							onclick() {
								PlayAudio("winmusic");
								SelectModal(0);
								HiddenOptions();
								SetBlock($("dSurface"), $("iSurfaceBackground"));
								ShowNameDiv();
							},
						})
					: GameOver("条件失败<br>请再接再厉!");
			})();
		},
	}
);
