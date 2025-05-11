/*
	CardRain.js
	关于函数请见另一个 js 文件
*/

oS.Init(
	{
		PName: [
			oSeedLilyPad,
			oSeedLilyPad,
			oSeedLilyPad,
			oSeedPeashooter,
			oSeedCherryBomb,
			oSeedWallNut,
			oSeedPotatoMine,
			oSeedSnowPea,
			oSeedChomper,
			oSeedRepeater,
			oSeedPuffShroom,
			oSeedFumeShroom,
			oSeedHypnoShroom,
			oSeedScaredyShroom,
			oSeedIceShroom,
			oSeedDoomShroom,
			oSeedSquash,
			oSeedThreepeater,
			oSeedTangleKelp,
			oSeedJalapeno,
			oSeedSpikeweed,
			oSeedTorchwood,
			oSeedTallNut,
			oSeedSeaShroom,
			oSeedPlantern,
			oSeedCactus,
			oSeedBlover,
			oSplitPea,
			oSeedStarfruit,
			oSeedPumpkinHead,
			oSeedGarlic,
		],
		ZName: [
			oZombie,
			oZombie2,
			oZombie3,
			oConeheadZombie,
			oBucketheadZombie,
			oDuckyTubeZombie1,
			oDuckyTubeZombie2,
			oDuckyTubeZombie3,
			oJackinTheBoxZombie,
			oNewspaperZombie,
			oScreenDoorZombie,
			oFootballZombie,
			oZomboni,
			oDancingZombie,
			oBackupDancer,
		],
		PicArr: ["images/interface/background4.jpg", "images/interface/trophy.png", "images/interface/PointerDown.gif"],
		backgroundImage: "images/interface/background4.jpg",
		LF: [0, 1, 1, 2, 2, 1, 1],
		Coord: 2,
		DKind: 0,
		CanSelectCard: 0,
		LevelName: "It's Raining Seeds",
		LvlEName: "CardRain",
		HaveFog: 4,
		StartGameMusic: "RigorMormist",
		LargeWaveFlag: {
			10: $("imgFlag4"),
			20: $("imgFlag3"),
			30: $("imgFlag2"),
			40: $("imgFlag1"),
		},
		UserDefinedFlagFunc(a) {
			oP.FlagNum === oP.FlagZombies && oP.SetTimeoutWaterZombie(5, 9, 4, [oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3]);
		},
		StartGame() {
			StopMusic(), PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop")), SetHidden($("dSunNum")); // 隐藏阳光和卡槽

			(function () {
				// 隐藏原卡槽
				var c = $("dCardList");
				for (var a = 0, b; (b = c.childNodes.item(a)); ++a) {
					SetHidden(b);
				}
			})();

			oS.InitLawnMower(),
				PrepareGrowPlants(() => {
					oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
					oSym.addTask(
						1500,
						() => {
							oP.AddZombiesFlag(), SetVisible($("dFlagMeterContent"));
						},
						[]
					);
					(function () {
						var a = dRand(GetX(0), GetX(oS.C));
						var b = dRand(GetY(1), GetY(oS.R - 1));
						var d = oS.PName[dRand(1, oS.PName.length) - 1];
						AppearCard(a, b, d, 1, 1000), oSym.addTask(dRand(500, 900), arguments.callee, []);
					})();
				});
		},
	},
	{
		AZ: [
			[oZombie, 2, 1],
			[oZombie2, 2, 1],
			[oZombie3, 1, 1],
			[oConeheadZombie, 2, 1],
			[oBucketheadZombie, 1, 1],
			[oDuckyTubeZombie1, 1, 8, [8]],
			[oDuckyTubeZombie2, 1, 8],
			[oDuckyTubeZombie3, 1, 8],
			[oJackinTheBoxZombie, 1, 11, [11]],
			[oScreenDoorZombie, 1, 14, [14]],
			[oFootballZombie, 1, 19, [19]],
			[oNewspaperZombie, 1, 33],
			[oDancingZombie, 1, 25, [10, 20, 30, 40]],
		],
		FlagNum: 40,
		FlagToSumNum: {
			a1: [3, 6, 9, 10, 15, 18, 19, 20, 23, 26, 29, 30, 33, 37, 39],
			a2: [1, 2, 4, 10, 6, 8, 10, 25, 13, 16, 19, 40, 22, 25, 29, 54],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowLargeWave, 0],
			29: [ShowLargeWave, 0],
			39: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {
				onclick() {
					SelectModal(0), PlayAudio("winmusic");
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		},
	},
	{
		dRand(l, r) {
			return Math.floor(Math.random() * (r - l + 1) + l);
		},
		AppearCard(h, f, e, a, t) {
			// x, y, 植物id, 移动卡槽类型, 消失时间（默认 15s）
			var b;
			var d;
			var g = "dCard" + Math.random();
			var c =
				"opacity:1;width:100px;height:120px;cursor:url(images/interface/Pointer.cur),pointer;clip:rect(auto,auto,60px,auto);left:" + h + "px;top:-1000";
			var t = t || 1500;

			if (a) {
				(d = 0), oSym.addTask(1, MoveDropCard, [g, f, t]);
			}
			// 从天而降，反之抛物线掉落
			else {
				(d = f - 15 - 20),
					(c += ";top:" + d + "px"),
					oSym.addTask(1, DisappearCard, [g, t]),
					oSym.addTask(
						1,
						function (q, p, n, j, l, k, m, i) {
							if (ArCard[q] && $(q)) {
								SetStyle($(q), {
									left: (p += j * k) + "px",
									top: (n += Number(l[0])) + "px",
								});
								l.shift();
								--m;
								m > 0 && (l.length === 0 && (l = [8, 16, 24, 32]), oSym.addTask(i, arguments.callee, [q, p, n, j, l, k, m, ++i]));
							}
						},
						[g, h, d, Math.floor(Math.random() * 4), [-32, -24, -16, -8], [-1, 1][Math.floor(Math.random() * 2)], 8, 2]
					);
			} // 开始记时，确定抛物线，与阳光部分相似故压缩

			ArCard[g] = {
				DID: g,
				PName: e,
				PixelTop: 600,
				CDReady: 1,
				SunReady: 1,
				top: d,
				HasChosen: false,
				Kind: 1,
			}; // 生成卡片数据，是否被点击过
			NewImg(g, e.prototype.PicArr[e.prototype.CardGif], c, $("dCardList"), {
				// 生成卡片 ele
				onclick(g) {
					var self = this;
					var { style } = self;
					var { id } = self;
					ClearChild($("MovePlant"), $("MovePlantAlpha")),
						CancelPlant(),
						style && (style.opacity = 0.5),
						ChosePlant(g, id),
						ArCard[id] && (ArCard[id].HasChosen = true);
				},
			});
		},
		MoveDropCard(c, b, t) {
			// 掉落目标
			var a = ArCard[c];
			var ele = $(c);
			a &&
				ele &&
				(!a.HasChosen && a.top < b - 52 ? ((ele.style.top = (a.top += 2) + "px"), oSym.addTask(5, MoveDropCard, [c, b, t])) : DisappearCard(c, t));
		},
		DisappearCard(d, r) {
			var q = 5;
			var e = $(d);
			var f = function (t) {
				switch (true) {
					case !ArCard[d] || !e:
						return; // 卡片已经消失，不做处理
					case oS.Chose === 1 && oS.ChoseCard === d:
						break; // 选中
					case t > 500:
						e.style.opacity = 1;
						break; // 未到闪烁时间
					case t > 0:
						e.style.opacity = [1, 0.5][Math.ceil(t / 50) % 2];
						break; // 闪烁
					default:
						delete ArCard[d], ClearChild(e);
						return;
				}
				(e = $(d)), oSym.addTask(q, arguments.callee, [t - q]);
			};
			f(r);
		},
		GrowPlant(l, d, c, e, b) {
			var j = oS.ChoseCard;
			var f = ArCard[j];
			var h = f.PName;
			var k = h.prototype;
			var i = k.coolTime;
			var a;
			var g = oGd.$LF[e];
			var o = f.Kind;
			var s = k.name === "Plants";
			k.CanGrow(l, e, b) &&
				(PlayAudio(g !== 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"),
				s
					? new h().Birth(d, c, e, b, l)
					: asyncInnerHTML(
							(a = new h()).CustomBirth(e, b, 0, "auto"),
							(n, m) => {
								EDPZ.appendChild(n), m.Birth();
							},
							a
						),
				o ? (delete ArCard[j], ClearChild($(j))) : (innerText(ESSunNum, (oS.SunNum -= k.SunNum)), i && ((f.CDReady = 0), DoCoolTimer(j, k.coolTime))),
				oSym.addTask(20, SetHidden, [
					SetStyle(g !== 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
						left: d - 30 + "px",
						top: c - 30 + "px",
						zIndex: 3 * e + 1,
						visibility: "visible",
					}),
				]));
			CancelPlant();
		},
	}
);
