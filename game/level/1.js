oS.Init(
	{
		PName: [oPeashooter],
		ZName: [oZombie],
		PicArr: (function () {
			var a = oSunFlower.prototype,
				b = a.PicArr;
			return [
				"images/interface/SodRollCap.png",
				"images/interface/SodRoll.png",
				"images/interface/background1unsodded_1.jpg",
				"images/interface/background1unsodded.jpg",
				b[a.CardGif],
				b[a.NormalGif],
			];
		})(),
		SunNum: 250,
		backgroundImage: "images/interface/background1unsodded.jpg",
		LF: [0, 0, 0, 1, 0, 0],
		CanSelectCard: 0,
		LevelName: "Recruit training 1",
		LvlEName: 1,
		AudioArr: ["dirt_rise"],
		InitLawnMower: function () {
			CustomSpecial(oLawnCleaner, 3, -1);
		},
		LargeWaveFlag: { 5: $("imgFlag1") },
		LoadAccess: function (a) {
			NewImg(
				"imgSF",
				"images/interface/tiaoguo.png",
				"left:1px;top:75px",
				EDAll,
				{
					onclick: function () {
						SelectModal(3);
					},
				}
			);
			NewImg(
				"dDave",
				"images/interface/Dave.gif",
				"left:0;top:81px",
				EDAll
			);
			NewEle("DivTeach", "div", 0, 0, EDAll);
			(function (d) {
				var b = arguments.callee,
					c = $("DivTeach");
				switch (d) {
					case 0:
						PlayAudio("crazydaveshort1");
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							function () {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						innerText(c, "Hello my neighbor");
						break;
					case 1:
						PlayAudio(
							"crazydavelong" + Math.floor(1 + Math.random() * 3)
						);
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							function () {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [2]);
								};
							},
							[]
						);
						innerText(
							c,
							"My name is Crazy and my name is Dave. But everyone likes to call me Crazy Dave"
						);
						break;
					case 2:
						PlayAudio(
							"crazydavelong" + Math.floor(1 + Math.random() * 3)
						);
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							function () {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [3]);
								};
							},
							[]
						);
						innerText(
							c,
							"Listen, there's a bunch of zombies coming to town right now and they're surrounding us!"
						);
						break;
					case 3:
						PlayAudio(
							"crazydavelong" + Math.floor(1 + Math.random() * 3)
						);
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							function () {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [4]);
								};
							},
							[]
						);
						innerText(
							c,
							"You have to destroy them with \nthose humble plants in your garden."
						);
						break;
					case 4:
						PlayAudio(
							"crazydavelong" + Math.floor(1 + Math.random() * 3)
						);
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							function () {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [5]);
								};
							},
							[]
						);
						innerText(
							c,
							"Next, there will be tutorials to guide you on how to kill zombies, good luck!"
						);
						break;
					case 5:
						$("dDave").src = "images/interface/blank.png";
						ClearChild($("DivTeach"));
						oSym.addTask(
							1,
							function () {
								ClearChild($("dDave"));
								a(0);
							},
							[]
						);
				}
			})(0);
		},
		StartGame: function () {
			NewImg(
				"imgSF",
				"images/interface/tiaoguo.png",
				"left:1px;top:75px",
				EDAll,
				{
					onclick: function () {
						SelectModal(3);
					},
				}
			);
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			NewEle(
				"sod3row",
				"div",
				"position:absolute;left:-115px;top:0;height:600px;width:264px;z-index:0;background:url(images/interface/background1unsodded_1.jpg);over-flow:hidden",
				0,
				EDPZ
			);
			NewImg(
				"SodRoll_1",
				"images/interface/SodRoll.png",
				"left:112px;top:244px;z-index:1",
				EDPZ
			);
			NewImg(
				"SodRollCap_1",
				"images/interface/SodRollCap.png",
				"left:17px;top:322px;z-index:1",
				EDPZ
			);
			PlayAudio("dirt_rise");
			(function (e, h, b, d, c, g, a, f) {
				e += 15;
				h += 16;
				d += 16;
				$("sod3row").style.width = e + "px";
				SetStyle($("SodRoll_1"), {
					left: h + "px",
					width: --b + "px",
					height: "141px",
				});
				SetStyle($("SodRollCap_1"), {
					left: d + "px",
					width: --c + "px",
					height: --g + "px",
					top: ++a + "px",
				});
				e < 990
					? oSym.addTask(3, arguments.callee, [
							e,
							h,
							b,
							d,
							c,
							g,
							a,
							f,
						])
					: (ClearChild($("SodRoll_1"), $("SodRollCap_1")),
						(function () {
							NewEle("DivTeach", "div", 0, 0, EDAll);
							oS.InitLawnMower();
							oP.Monitor({
								ar: [0],
								f: function (k) {
									var l = oS.C + 1,
										i = oS.Chose;
									switch (k) {
										case 0:
											innerText(
												$("DivTeach"),
												"Please click to select a card!"
											);
											NewImg(
												"PointerUD",
												"images/interface/PointerUP.gif",
												"top:60px;left:50px",
												EDAll
											);
											oSym.addTask(10, arguments.callee, [
												++k,
											]);
											break;
										case 1:
											i > 0 &&
												(innerText(
													$("DivTeach"),
													"Click on the grass to plant your seeds!"
												),
												EditImg(
													$("PointerUD"),
													"",
													"images/interface/PointerDown.gif",
													{
														left: "170px",
														top: "270px",
													}
												),
												++k);
											oSym.addTask(10, arguments.callee, [
												k,
											]);
											break;
										case 2:
											var h = oGd.$;
											while (--l) {
												if (h["3_" + l + "_1"]) {
													SetHidden($("PointerUD"));
													innerText(
														$("DivTeach"),
														"Tap to collect falling sunlight!"
													);
													AutoProduceSun(25);
													oSym.addTask(
														10,
														arguments.callee,
														[++k]
													);
													return;
												}
											}
											!i &&
												(ClearChild($("PointerUD")),
												(k = 0));
											oSym.addTask(10, arguments.callee, [
												k,
											]);
											break;
										case 3:
											oS.SunNum > 99 &&
												(innerText(
													$("DivTeach"),
													"Click on the pea shooter to plant another!"
												),
												EditImg(
													$("PointerUD"),
													"",
													"images/interface/PointerUP.gif",
													{
														left: "50px",
														top: "60px",
														visibility: "visible",
													}
												),
												++k);
											oSym.addTask(10, arguments.callee, [
												k,
											]);
											break;
										default:
											var j = 0,
												h = oGd.$;
											while (--l) {
												h["3_" + l + "_1"] && ++j;
											}
											j > 0
												? (SetHidden($("PointerUD")),
													innerText(
														$("DivTeach"),
														"Don't let zombies near your house!"
													),
													oP.AddZombiesFlag(),
													oSym.addTask(500, SetNone, [
														$("DivTeach"),
													]))
												: oSym.addTask(
														10,
														arguments.callee,
														[4]
													);
									}
								},
							});
							BeginCool();
							SetVisible($("dFlagMeter"), $("dTop"));
						})());
			})(283, 122, 68, 117, 73, 71, 131, 511);
		},
	},
	{
		AZ: [[oZombie, 5, 1]],
		FlagNum: 5,
		FlagToSumNum: { a1: [3], a2: [1, 2] },
		FlagToMonitor: { 4: [ShowFinalWave, 0] },
		FlagToEnd: function () {
			NewImg(
				"imgSF",
				"images/Card/Plants/SunFlower.png",
				"left:667px;top:330px;clip:rect(auto,auto,60px,auto)",
				EDAll,
				{
					onclick: function () {
						GetNewCard(this, oSunFlower, 2);
					},
				}
			);
			EditImg($("PointerUD"), 0, "images/interface/PointerDown.gif", {
				left: "676px",
				top: "295px",
				visibility: "visible",
			});
		},
	}
);
