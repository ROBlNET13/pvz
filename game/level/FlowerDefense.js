oS.Init(
	{
		PName: [
			oPeashooter,
			oSunFlower,
			oCherryBomb,
			oWallNut,
			oSnowPea,
			oChomper,
			oRepeater,
			oPuffShroom,
			oFumeShroom,
			oGraveBuster,
			oHypnoShroom,
			oScaredyShroom,
			oIceShroom,
			oSquash,
			oThreepeater,
			oJalapeno,
			oTorchwood,
			oTallNut,
			oCactus,
			oSplitPea,
			oStarfruit,
			oPumpkinHead,
			oCoffeeBean,
			oGatlingPea,
			oGloomShroom,
			oTwinSunflower,
			oTenManNut,
			oSnowRepeater,
			oIceFumeShroom,
			oLaserBean,
			oBigChomper,
		],
		ZName: [
			oImp,
			oZombie,
			oZombie2,
			oTrashZombie,
			oConeheadZombie,
			oBucketheadZombie,
			oNewspaperZombie,
			oScreenDoorZombie,
			oFootballZombie,
			oJackinTheBoxZombie,
			oSmallZombie,
			oSmallConeheadZombie,
			oSmallFootballZombie,
		],
		PicArr: [
			"images/Zombies/Zombie/1.gif",
			"images/interface/background_TF.jpg",
			"images/interface/background2_TF.jpg",
			"images/interface/background1unsodded2.jpg",
		],
		backgroundImage: "images/interface/background_TF.jpg",
		CanSelectCard: 1,
		DKind: 1,
		LevelName: ["Flower Defense"],
		LvlEName: "Protect_Brain",
		SunNum: 400,
		ZF: [0, 0, 0, 0, 0, 1],
		AddSunNum: 15,
		LargeWaveFlag: {
			//      20: $("imgFlag3"),
			40: $("imgFlag2"),
			60: $("imgFlag1"),
		},
		UserDefinedFlagFunc() {
			if (oP.FlagZombies >= 25 && oP.FlagZombies <= 27) {
				oP.SetTimeoutTomZombie([oZombie, oConeheadZombie]);
			}
			if (oP.FlagZombies >= 37 && oP.FlagZombies <= 40) {
				oP.SetTimeoutTomZombie([oFootballZombie]);
			}
			if (oP.FlagZombies === oP.FlagNum) {
				oP.SetTimeoutTomZombie([oJackinTheBoxZombie, oFootballZombie]);
			}
			if (oP.FlagZombies === 21) {
				oS.ChangeBG($("Black_box"), $("BackGround_TF_night"), 1, () => {
					AppearTombstones(4, 9, 8);
					oP.SetTimeoutTomZombie([oZombie, oConeheadZombie]);
					(oS.DKind = 0), (oS.AddSunNum = 1);
				});
			}
			if (oP.FlagZombies === 41) {
				oS.ChangeBG($("White_box"), $("BackGround_Unsodded"), 1, () => {
					($("BackGround_TF_night").style.opacity = 0), (oS.AddSunNum = 5);
					dag.clear();
					oS.DKind = 1;
					for (let i in oGd.$Crater) {
						if (oGd.$Crater[i] === 100) {
							oGd.$Crater[i] = false;
						}
					}
					oGd.$LF = [0, 0, 1, 1, 1, 0];
					oGd.$ZF = [0, 1, 1, 1, 1, 1];
					for (let i = 1; i <= 9; i++) {
						for (let j = 0; j < 4; j++) {
							let p = oGd.$[1 + "_" + i + "_" + j];
							p && p.Die();
						}
						for (let j = 0; j < 4; j++) {
							let p = oGd.$[5 + "_" + i + "_" + j];
							p && p.Die();
						}
					}
					for (let i = 1; i <= 7; i++) {
						CustomSpecial(oFlowerPot, 1, i);
						CustomSpecial(oFlowerPot, 5, i);
					}
					for (let j = 11; j >= 1; j--) {
						for (let i = 1; i <= 5; i++) {
							dag.add_edge([i, j], [i, Math.max(0, j - 2)]);
						}
					}
					for (let i in oS.ZName) {
						let s = oS.ZName[i];
						let p = s.prototype;
						p.ArR = [];
						for (let j = 1; j <= 5; j++) {
							if (p.CanPass(j, oGd.$ZF[j])) {
								p.ArR.push(j);
							}
						}
					}
				});
			}
		},
		rewrite() {
			oP.MonPrgs = function () {
				innerText(ESSunNum, (oS.SunNum = Math.min(oS.SunNum + oS.AddSunNum, 9990))), MonitorCard();
				var u = oP;
				var j;
				var i = u.FlagZombies;
				var s;
				var t;
				var f = $User.Visitor;
				!--u.NumZombies &&
					(i < u.FlagNum
						? ((u.ReadyFlag = ++i), oSym.addTask(500, u.FlagPrgs, []))
						: (NewEle(
								"DivA",
								"div",
								"position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:255",
								0,
								EDAll
							),
							u.FlagToEnd(),
							$User.isAuthorWebsite &&
								$User.Visitor.UserName !== "游客" &&
								(ClearChild($("JSPVZAjax")),
								f.SaveLvl &&
									NewEle(
										"JSPVZAjax",
										"script",
										0,
										{
											src: "asp/UserSave.asp?Lvl=" + (s = oS.LvlEName) + "&T=" + (oSym.Now - oS.StartTime),
											type: "text/javascript",
										},
										document.body
									)),
							f.SaveLvlCallBack &&
								f.SaveLvlCallBack({
									UserName: f.UserName,
									SunNum: oS.SunNum,
									Lvl: s,
									T: oSym.Now - oS.StartTime,
								}),
							!isNaN(Math.floor(s)) &&
								((t = $("dAdventure")),
								($User.Visitor.Progress = ++s),
								(t.firstChild.innerHTML = Math.ceil(s / 10)),
								(t.childNodes[1].innerHTML = (s -= Math.floor(s / 10) * 10) ? s : s + 1)),
							PauseGame($("dMenu0"), 1)));
			};
		},
		LoadAccess(start_game) {
			NewImg("BackGround_TF_night", "https://s4.gifyu.com/images/background2_TF.jpg", "opacity:0;left:-115", EDAll);
			NewImg("BackGround_Unsodded", "images/interface/background1unsodded2.jpg", "opacity:0;left:-115", EDAll);
			NewEle("White_box", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:-255", 0, EDAll);
			NewEle("Black_box", "div", "position:absolute;width:900px;height:600px;background:#000;filter:alpha(opacity=0);opacity:0;z-index:-255", 0, EDAll);
			delete oAudio.LevelSong;
			NewURLAudio({
				url: "audio/Zombieboss.mp3",
				audioname: "LevelSong",
				loop: true,
			});
			init_dag();
			for (let i = 5; i >= 1; i--) {
				oGd.$Crater[i + "_" + 2] = oGd.$Crater[i + "_" + 8] = oGd.$Crater[i + "_" + 5] = 100;
				if (i === 5) {
					continue;
				}
				dag.add_edge([i + 1, 2], [i, 2]);
				dag.add_edge([i + 1, 8], [i, 8]);
				dag.add_edge([i, 5], [i + 1, 5]);
			}
			for (let i = 0; i <= 10; i++) {
				let j = 1 + 4 * !!Math.floor(((i + 1) / 3) % 2);
				oGd.$Crater[j + "_" + i] = 100;
				dag.add_edge([j, i + 1], [j, i]);
			}
			oS.rewrite();
			start_game();
		},
		ChangeBG(box, bg, opa, deffuc) {
			box.style["z-index"] = 250;
			oSym.addTask(
				1,
				function (index, kind, alpha) {
					box.style.opacity = Math.max(0, Math.min(1, index || 0));
					if (index <= 1 && kind === 0) {
						oSym.addTask(1, arguments.callee, [index + 0.01, kind, alpha]);
					} else if (index >= 0) {
						!kind && (bg.style.opacity = alpha);
						!kind && deffuc && deffuc();
						oSym.addTask(1, arguments.callee, [index - 0.01, 1, alpha]);
					} else {
						box.style.opacity = 0;
						box.style["z-index"] = -255;
					}
				},
				[0, 0, opa === undefined ? 1 : opa]
			);
		},
		StartGame() {
			StopMusic();
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				PlayMusic((oS.LoadMusic = oS.StartGameMusic = "LevelSong"));
				oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
				oSym.addTask(
					10,
					function () {
						oSym.addTask(10, arguments.callee, []);
						dag_traversal_of();
					},
					[]
				);
				BeginCool();
				oS.DKind && AutoProduceSun(25);
				oSym.addTask(
					1000,
					() => {
						oP.AddZombiesFlag();
						try {
							$("imgFlag2").style.left = "65px";
						} catch {}
						SetVisible($("dFlagMeterContent"));
					},
					[]
				);
			});
		},
	},
	{
		AZ: [
			[oZombie, 3, 1],
			[oZombie2, 3, 1],
			[oTrashZombie, 4, 1],
			[oConeheadZombie, 4, 1],
			[oBucketheadZombie, 2, 1],
			[oNewspaperZombie, 3, 21, [1]],
			[oScreenDoorZombie, 1, 21, [2]],
			[oFootballZombie, 2, 1],
			[oJackinTheBoxZombie, 2, 41, [3, 5, 7, 11, 20, 20]],
			[oSmallZombie, 1, 50, [1, 1, 1, 1, 1, 1]],
			[oSmallConeheadZombie, 1, 50, [1, 1]],
			[oSmallFootballZombie, 1, 50, [1]],
		],
		FlagNum: 60,
		FlagToSumNum: {
			a1: [3, 6, 9, 13, 15, 19, 20, 21, 23, 26, 28, 32, 34, 37, 39, 40, 41, 42, 43, 45, 48, 52, 58, 59],
			a2: [4, 8, 12, 20, 30, 50, 150, 160, 14, 20, 27, 36, 43, 50, 56, 200, 50, 10, 15, 25, 39, 50, 60, 70, 120],
		},
		FlagToMonitor: {
			19: [ShowLargeWave, 0],
			39: [ShowLargeWave, 0],
			59: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {
				onclick() {
					SelectModal(0);
					PlayAudio("winmusic");
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		},
	},
	{
		AutoProduceSun(a) {
			if (oS.DKind) {
				AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
			}
			oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [a]);
		},
		dag: [],
		redag: [],
		init_dag() {
			dag.add_edge = (u, v) => {
				(u = JSON.stringify(u) || u.toString()), (v = JSON.stringify(v) || v.toString());
				if (Array.isArray(dag[u])) {
					dag[u].push(v);
				} else {
					dag[u] = [v];
				}
				if (Array.isArray(redag[v])) {
					redag[v].push(u);
				} else {
					redag[v] = [u];
				}
			};
			dag.clear = () => {
				for (let i in dag) {
					if (Array.isArray(dag[i]) && Array.isArray(JSON.parse(i))) {
						delete dag[i];
					}
				}
				for (let i in redag) {
					if (Array.isArray(redag[i]) && Array.isArray(JSON.parse(i))) {
						delete redag[i];
					}
				}
			};
		},
		dag_zombie_init(b) {
			isNaN(b.AttackedLX) ? (b.AttackedLX = b.AttackedLX2) : (b.AttackedLX2 = b.AttackedLX);
			isNaN(b.AttackedRX) ? (b.AttackedRX = b.AttackedRX2) : (b.AttackedRX2 = b.AttackedRX);
			isNaN(b.X) ? (b.X = b.X2) : (b.X2 = b.X);
			isNaN(b.ZX) ? (b.ZX = b.ZX2) : (b.ZX2 = b.ZX);
			b.Speed2 !== b.OSpeed && (b.Speed2 = b.OSpeed);
			if (b.init) {
				return;
			}
			b.init = true;
		},
		ctk_arrive_grid(b, task, reduce, tp, x) {
			let point = (b.beAttackedPointR - b.beAttackedPointL) * 0.5;
			let twotrue = 0;
			let ty = GetY(task[0]);
			let tx = GetX(task[1]);
			let xS = b.Speed / Math.abs(b.Speed || 1);
			let yS = b.RSpeed / Math.abs(b.RSpeed || 1);
			tp = tp + b.height - b.GetDY();
			let finaly = (ty - tp) * yS;
			let finalx = (tx - x) * xS;
			if (finaly > 0) {
				(b.Reduce[0] = 0), (b.Ele.style.top = ty - b.height + b.GetDY() + "px"), (b.RSpeed = 0);
			}
			if (finalx > 0) {
				(b.Reduce[1] = 0), (b.AttackedLX -= b.X), (b.AttackedRX -= b.X);
				(b.X = tx - point - b.beAttackedPointL), (b.AttackedLX += b.X), (b.AttackedRX += b.X);
				(b.Ele.style.left = b.X + "px"), (b.Speed = 0);
			}
			if (b.Reduce[0] === b.Reduce[1] && b.Reduce[0] === 0) {
				delete b.Next_Edge;
				delete b.Reduce;
			}
		},
		ctk_change_r(b, tp) {
			let tp2 = tp + b.height - b.GetDY();
			let l = GetR(tp2);
			let r = !b.WalkDirection ? -5 : 5;
			if (b.R !== l) {
				b.ChangeR({
					R: b.R,
					ar: [l],
					CustomTop: tp,
				});
				(b.ZX -= r), (b.AttackedLX -= r), (b.AttackedRX -= r), (b.X -= r);
				b.Ele.style.left = b.X + "px";
			}
		},
		ctk_final_set(b) {
			b.WalkDirection && b.Speed < 0 && (b.Speed = -b.Speed);
			if (b.WalkDirection && b.Reduce && b.Reduce[1] > 0) {
				b.Speed > 0 && (b.Speed *= -b.Reduce[1] / Math.abs(b.Reduce[1] || 0));
			}
			isNaN(b.AttackedLX) ? (b.AttackedLX = b.AttackedLX2) : (b.AttackedLX2 = b.AttackedLX);
			isNaN(b.AttackedRX) ? (b.AttackedRX = b.AttackedRX2) : (b.AttackedRX2 = b.AttackedRX);
			isNaN(b.X) ? (b.X = b.X2) : (b.X2 = b.X);
			isNaN(b.ZX) ? (b.ZX = b.ZX2) : (b.ZX2 = b.ZX);
		},
		dag_traversal_of() {
			for (let _ in $Z) {
				let Eletop;
				let b = $Z[_];
				let r = b.R;
				let point = (b.beAttackedPointR - b.beAttackedPointL) * 0.5;
				let c = GetC(b.ZX + point);
				let to = b.Next_Edge;
				let now = "[" + r + "," + c + "]";
				let nowArr = [r, c];
				dag_zombie_init(b);
				if (b.EName === "oZomboni") {
					continue;
				}
				if (!to && (b.WalkDirection ? redag[now] : dag[now])) {
					if (b.WalkDirection) {
						b.Next_Edge = to = redag[now][Math.floor(Math.random() * redag[now].length)];
					} else {
						b.Next_Edge = to = dag[now][Math.floor(Math.random() * dag[now].length)];
					}
				}
				if (!to) {
					(b.RSpeed = 0), (b.Speed = b.Speed2);
					continue;
				}
				let toArr = JSON.parse(to);
				let Reduce = (b.Reduce = b.Reduce || [nowArr[0] - toArr[0], nowArr[1] - toArr[1]]);
				b.Speed = b.Speed2 * Reduce[1] * (!!b.FreeSlowTime * 0.5 || 1) * !b.FreeFreezeTime;
				b.RSpeed = b.Speed2 * Reduce[0] * (!!b.FreeSlowTime * 0.5 || 1) * !b.FreeFreezeTime;
				(Eletop = Number(b.Ele.style.top.split("px")[0]) - b.RSpeed), (b.Ele.style.top = Eletop + "px");
				ctk_arrive_grid(b, toArr, Reduce, Eletop, b.ZX + point);
				ctk_change_r(b, Eletop);
				ctk_final_set(b);
			}
		},
		dfs(x, up) {
			console.log(x);
			for (let i in dag[x]) {
				let to = dag[x][i];
				if (to === up) {
					continue;
				}
				dfs(to, x);
			}
		},
		NewURLAudio(b) {
			var a = b.url;
			var names = b.audioname || a;
			if (oAudio[names]) {
				return oAudio[names];
			}
			var f = document.createElement("audio");
			var c = b.autoplay;
			var g = b.loop;
			var m;
			var k = b.preload;
			var l = b.callback;
			var j = ["audio/mpeg", "audio/ogg"];
			var e = j.length;
			var d;
			while (e--) {
				(m = document.createElement("source")).type = j[e];
				(m.src = a), f.appendChild(m);
			}
			(f.autoplay = !!c), (f.preload = k === undefined ? "auto" : ["auto", "meta", "none"][k]), (f.muted = oS.Silence);
			g &&
				f.addEventListener(
					"ended",
					() => {
						f.play();
					},
					false
				);
			l && f.addEventListener("canplaythrough", l, false);
			return (oAudio[names] = f);
		},
	}
);
