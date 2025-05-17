(function () {
	/*
		ChoseMode: 选关界面
		NGrass: 黑夜草地
		NPool: 黑夜泳池
		DReversal: 水路反转
	*/
	var IZMode = oS.NowLevel != null ? oS.NowLevel : "ChoseMode"; // 读取当前关卡模式
	var Change_Level = function (ModeName) {
		(oS.NowLevel = ModeName), SelectModal(oS.Lvl), (oS.NowLevel = ModeName);
	}; // 以特定模式重新载入本关
	var $FJ = function (a, b) {
		// 覆盖数组
		var ret = {};
		for (var i in a) {
			ret[i] = a[i];
		}
		for (var i in b) {
			ret[i] = b[i];
		}
		return ret;
	};

	// 三种创建的模板
	var oSys = {
		MapKind: "0",
		Coord: 1,
		LF: [0, 1, 1, 1, 1, 1],
		// PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oScaredyShroom, oSquash, oThreepeater, oSpikeweed, oTorchwood, oTallNut, oCactus, oSplitPea, oStarfruit, oGarlic],
		PName: [
			oPeashooter,
			oSunFlower,
			oWallNut,
			oPotatoMine,
			oSnowPea,
			oChomper,
			oRepeater,
			oPuffShroom,
			oFumeShroom,
			oHypnoShroom,
			oScaredyShroom,
			oSquash,
			oThreepeater,
			oSpikeweed,
			oTorchwood,
			oTallNut,
			oCactus,
			oSplitPea,
			oStarfruit,
			oPumpkinHead,
			oFlowerPot,
			oGarlic,
			oGatlingPea,
			oGloomShroom,
			oSpikerock,
		],
		ZName: [oZombie],
		PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png"],
		backgroundImage: "images/interface/background2.jpg",
		BrainsNum: 5,
		ProduceSun: false,
		SunNum: 9990,
		DKind: 0,
		LevelName: "I, Zombie Level Editor - Night",
		LvlEName: "ImZombieCreateGame",
		LoadMusic: "Cerebrawl",
		StartGameMusic: "Cerebrawl",
		LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
		InitLawnMower() {
			var a = oS.R + 1;
			while (--a) {
				CustomSpecial(oBrains, a, -1);
			}
		},
		LvlClearFunc() {
			oS.ScrollScreen = oS.LvlVar.ScrollScreen;
			delete oS.LvlVar.ScrollScreen;
			delete oS.NowLevel; // 清除关卡阶段数据
		},
		ArP: { ArC: [1, 4], ArR: [1, 5] },
		LoadAccess(a) {
			!oS.LvlVar ? (oS.LvlVar = { ScrollScreen: oS.ScrollScreen }) : (oS.LvlVar.ScrollScreen = oS.ScrollScreen); // 关卡数据
			$("tGround").style.left = "-115px";
			oS.ScrollScreen = function () {
				// 移动重写
				$("tGround").style.left = 0;
				ClearChild($("dButton1"), $("dButton2"));
				(function () {
					(EDAll.scrollLeft += 25) < 500 ? oSym.addTask(2, arguments.callee, []) : SetVisible($("dMenu"), $("dSelectCard"), $("dCardList"));
				})();
			};
			a(0);
		},
		StartGame() {
			oP.Monitor({
				ar: [],
				f() {
					var a = NewEle("DivTeach", "div", "line-height:40px;font-size:14px;top:380px", 0, EDAll); // 选择阵型列数
					var b = function (c) {
						ClearChild($("DivTeach")), ImmediatelyCool(); // 取消冻结全部植物
						SetVisible($("tdShovel"), $("dFlagMeter")); // 显示铲子
						NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(c)[0] - 11) + "px;top:65px", EDAll); // 生成线
						NewEle(
							"btnClickSave",
							"button",
							"position:absolute;left:750px;top:250px;height:50px;width:100px;font-family:幼圆;font-size:18px;z-index:100",
							{
								// 保存按钮
								innerHTML: "Save Level",
								onclick() {
									var g = oGd.$;
									var k;
									var m = "";
									var i;
									var l;
									var f;
									var d = oS.ArP.ArC[1] - 1;
									var h = oS.ArP.ArR[1];
									var r = 0;
									var z = "";
									var j = {
										// 植物数据
										default: "01", // 默认
										oPeashooter: "01", // 普通植物 1 ~ 40
										oSunFlower: "02",
										oCherryBomb: "03",
										oWallNut: "04",
										oPotatoMine: "05",
										oSnowPea: "06",
										oChomper: "07",
										oRepeater: "08",
										oPuffShroom: "09",
										oSunShroom: "10",
										oFumeShroom: "11",
										oGraveBuster: "12",
										oHypnoShroom: "13",
										oScaredyShroom: "14",
										oIceShroom: "15",
										oDoomShroom: "16",
										oLilyPad: "17",
										oSquash: "18",
										oThreepeater: "19",
										oTangleKlep: "20",
										oJalapeno: "21",
										oSpikeweed: "22",
										oTorchwood: "23",
										oTallNut: "24",
										oSeaShroom: "25",
										oPlantern: "26",
										oCactus: "27",
										oBlover: "28",
										oSplitPea: "29",
										oStarfruit: "30",
										oPumpkinHead: "31",
										oFlowerPot: "34",
										oCoffeeBean: "36",
										oGarlic: "37",
										oGatlingPea: "41", // 紫卡: 41 ~ 48
										oTwinSunflower: "42",
										oGloomShroom: "43",
										oSpikerock: "47",
										oBrains: "51", // 其他植物: 50 ~ 70
										oLawnCleaner: "52",
										oPoolCleaner: "53",
										oNutBowling: "54",
										oHugeNutBowling: "55",
										oBoomNutBowling: "56",
									};

									for (k in g) {
										if (g.hasOwnProperty(k)) {
											(z = (i = k.split("_"))[0] + i[1] + $SEql(g[k].EName, j)), (m = z + m), (r = Math.max(r, i[1]));
										}
									} // 生成植物数据，采用倒叙生成

									if ($P.length < h * d * (4 / 5)) {
										if (!confirm("The amount of plants is less than 80% of the set range. Do you want to continue?")) {
											return;
										}
									}

									if ((f = prompt("Please enter the amount of sunlight, range 50-9990.", "150")) == null) {
										return;
									} // 用户未输入, 返回
									if (isNaN((f = Number(f))) || f < 50 || f > 9990) {
										return alert("Please enter a number in the range 50-9990!");
									} // 输入阳光

									if (
										(l = prompt(
											"Please enter a title for your custom level (within 50 characters)\nIf not entered, the default title will be used.",
											""
										)) != null &&
										l.length <= 50
									) {
										if (l.length === 0) {
											l = "My I, Zombie Level";
										}
										($("btnClickSave").innerHTML = "Saving.."), ($("btnClickSave").disabled = "disabled"); // 按钮样式
										// ajax("asp/ImZombieCreateGame.asp", "post", "mapkind=" + oS.MapKind + "&SNum=" + f + "&T=" + escape(l) + "&C=" + escape(m), function(c){eval(c)}); // 发送请求
										$("btnClickSave").innerHTML = "Saved!";
										let levelDataElement = document.createElement("input");
										levelDataElement.type = "search"; // just for a clear button
										levelDataElement.placeholder = "Level data here...";
										levelDataElement.readOnly = true;
										levelDataElement.style.position = "absolute";
										levelDataElement.style.left = "50%";
										levelDataElement.style.top = "50%";
										levelDataElement.style.transform = "translate(-50%, -50%)";
										levelDataElement.style.width = "50%";
										levelDataElement.style.padding = "7px";
										levelDataElement.style.borderStyle = "solid";
										levelDataElement.style.borderRadius = "10px";
										levelDataElement.style.fontSize = "large";
										levelDataElement.style.zIndex = "1000";
										levelDataElement.value = stringifyCloneTiny(cloneFromPlants(l, f));
										$("dAll").appendChild(levelDataElement);
										const copyButtonElement = document.createElement("button");
										copyButtonElement.style.position = "absolute";
										copyButtonElement.style.left = "calc(75% - 19.5px)";
										copyButtonElement.style.top = "50%";
										copyButtonElement.style.transform = "translate(-50%, -50%)";
										copyButtonElement.style.width = "35px";
										copyButtonElement.style.height = "34px";
										copyButtonElement.style.cursor = "url(images/interface/Pointer.cur),pointer";
										copyButtonElement.style.backgroundColor = "#fff";
										copyButtonElement.style.borderStyle = "hidden";
										copyButtonElement.style.borderRadius = "0px 10px 10px 0px";
										copyButtonElement.style.zIndex = "1000";
										copyButtonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></svg>`;
										copyButtonElement.onclick = function () {
											levelDataElement.select();
											levelDataElement.setSelectionRange(0, 99999); // for mobile
											navigator.clipboard.writeText(levelDataElement.value);
										};
										$("dAll").appendChild(copyButtonElement);
										let closeButton = document.createElement("input");
										closeButton.setAttribute("type", "button");
										closeButton.setAttribute("value", "EXIT");
										closeButton.id = "btnNextLevel"; // not actually a next level button, but it's the same style
										closeButton.style.top = "60%";
										closeButton.style.left = "calc(33.333% - 56.5px)"; // "calc(50% - 120px)";
										closeButton.onclick = function () {
											$("dAll").style.zIndex = "";
											let oldLv = oS.Lvl;
											SelectModal(0);
											SetBlock($("dSurface"), $("iSurfaceBackground"));
											oS.Lvl = oldLv;
										};
										closeButton.style.zIndex = "1000";

										let coverElement = document.createElement("div");
										coverElement.style.position = "absolute";
										coverElement.style.left = "0";
										coverElement.style.top = "0";
										coverElement.style.width = "100%";
										coverElement.style.height = "100%";
										coverElement.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
										coverElement.style.zIndex = "999";
										$("dAll").appendChild(coverElement);
										let titleElement = document.createElement("div");
										titleElement.style.position = "absolute";
										titleElement.style.left = "50%";
										titleElement.style.top = "30%";
										titleElement.style.transform = "translate(-50%, -50%)";
										titleElement.style.width = "40%";
										titleElement.style.height = "40px";
										titleElement.innerText = "Here's your level data - keep this somewhere safe!";
										titleElement.style.fontSize = "xx-large";
										titleElement.style.textAlign = "center";
										titleElement.style.color = "white";
										titleElement.style.zIndex = "1000";
										$("dAll").appendChild(titleElement);
										$("dAll").style.zIndex = "10000";

										let uploadButton = document.createElement("input");
										uploadButton.setAttribute("type", "button");
										uploadButton.setAttribute("value", "UPLOAD");
										uploadButton.id = "btnNextLevel"; // not actually a next level button, but it's the same style
										uploadButton.style.top = "60%";
										uploadButton.style.left = "calc(50% - 56.5px)";
										uploadButton.style.display = "none";
										uploadButton.onclick = function () {
											closeButton.style.display = "none";
											uploadButton.style.display = "none";
											downloadButton.style.display = "none";
											levelDataElement.style.display = "none";
											copyButtonElement.style.display = "none";
											titleElement.innerText = "Saving...";
											const author = prompt("Author name:");
											const newLevelData = compressStringAsBytes(tinyifyClone(cloneFromPlants(l, f, true)));
											titleElement.innerText = "Configuring...";
											let serverConfig;
											fetch("http://localhost:3000/api/config")
												.then((response) => {
													if (!response.ok) {
														throw new Error("Failed to get server configuration");
													}
													return response.json();
												})
												.then((config) => {
													serverConfig = config;
													let turnstileToken;
													let container;
													if (serverConfig.turnstileEnabled) {
														container = document.createElement("div");
														container.style.position = "absolute";
														container.style.left = "50%";
														container.style.top = "50%";
														container.style.transform = "translate(-50%, -50%)";
														container.style.zIndex = "1000";
														container.id = "turnstile-container";

														window.turnstile.render(container, {
															sitekey: config.turnstileSiteKey,
															callback(token) {
																turnstileToken = token;
															},
														});
													}
													titleElement.innerText = "Please complete the verification";
													$("dAll").appendChild(container);

													// function to wait for turnstile token if enabled
													function waitForTurnstileToken() {
														return new Promise((resolve) => {
															if (!serverConfig.turnstileEnabled) {
																resolve(null);
																return;
															}

															const checkToken = () => {
																if (turnstileToken) {
																	resolve(turnstileToken);
																} else {
																	setTimeout(checkToken, 500);
																}
															};
															checkToken();
														});
													}

													// wait for turnstile token or proceed immediately if disabled
													waitForTurnstileToken().then((token) => {
														titleElement.innerText = "Uploading...";

														// prepare query parameters
														const queryParams = new URLSearchParams();
														queryParams.append("author", author || "Anonymous");
														if (token) {
															queryParams.append("turnstileResponse", token);
														}

														// upload level data as octet-stream
														fetch(`http://localhost:3000/api/levels?${queryParams.toString()}`, {
															method: "POST",
															headers: {
																"Content-Type": "application/octet-stream",
															},
															body: newLevelData,
														})
															.then((response) => {
																if (!response.ok) {
																	return response.json().then((data) => {
																		throw new Error(data.error || "Failed to upload level");
																	});
																}
																return response.json();
															})
															.then((data) => {
																console.log("Level uploaded successfully:", data);
																titleElement.innerText = `Level uploaded successfully! ID: ${data.id}`;

																// show close button again
																closeButton.style.display = "";
																closeButton.style.top = "75%";
																closeButton.style.top = "50%";
																closeButton.style.left = "50%";
																closeButton.style.transform = "translate(-50%, -50%)";
															})
															.catch((error) => {
																console.error("Error uploading level:", error);
																titleElement.innerText = `Upload failed: ${error.message}`;

																// show close button again
																closeButton.style.display = "";
															})
															.finally(() => {
																// remove turnstile container if it exists
																const turnstileContainer = document.getElementById("turnstile-container");
																if (turnstileContainer) {
																	turnstileContainer.remove();
																}
															});
													});
												})
												.catch((error) => {
													console.error("Error fetching server configuration:", error);
													titleElement.innerText = "Failed to load server configuration";

													setTimeout(() => {
														closeButton.style.display = "";
														uploadButton.style.display = "";
														downloadButton.style.display = "";
														levelDataElement.style.display = "";
														copyButtonElement.style.display = "";
														titleElement.innerText = "Here's your level data - keep this somewhere safe!";
													}, 3000);
												});
										};
										uploadButton.style.zIndex = "1000";
										// uploadButton.style.display = "none"; // hide for now

										let downloadButton = document.createElement("input");
										downloadButton.setAttribute("type", "button");
										downloadButton.setAttribute("value", "DOWNLOAD");
										downloadButton.id = "btnNextLevel"; // not actually a next level button, but it's the same style
										downloadButton.style.top = "60%";
										downloadButton.style.left = "calc(66.666% - 56.5px)"; // "calc(50% + 5px)";
										downloadButton.onclick = function () {
											downloadBytesAsFile(compressStringAsBytes(tinyifyClone(cloneFromPlants(l, f))), l + ".izl2");
										};
										downloadButton.style.zIndex = "1000";

										// put in #dAll
										$("dAll").appendChild(closeButton);
										$("dAll").appendChild(uploadButton);
										$("dAll").appendChild(downloadButton);
									}
								},
							},
							EDAll
						);
						oS.ArP.ArC = [1, c]; // 规定种植范围
						oS.ArP.ArR = [1, oS.R]; // 行
					};
					innerText(
						NewEle(
							"spanT",
							"span",
							"position:absolute;left:-30px;width:620px;text-align:left;font-family:briannetodd;font-size:large;line-height:50px;color: #fff",
							0,
							a
						),
						"How many columns to place your plants in: "
					); // 选列

					// 选择按钮
					innerText(
						NewEle(
							"btnClick3",
							"button",
							"position:absolute;left:280px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(3);
								},
							},
							a
						),
						"2"
					);
					innerText(
						NewEle(
							"btnClick4",
							"button",
							"position:absolute;left:330px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(4);
								},
							},
							a
						),
						"3"
					);
					innerText(
						NewEle(
							"btnClick5",
							"button",
							"position:absolute;left:380px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(5);
								},
							},
							a
						),
						"4"
					);
					innerText(
						NewEle(
							"btnClick6",
							"button",
							"position:absolute;left:430px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(6);
								},
							},
							a
						),
						"5"
					);
					innerText(
						NewEle(
							"btnClick7",
							"button",
							"position:absolute;left:480px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(7);
								},
							},
							a
						),
						"6"
					);
					innerText(
						NewEle(
							"btnClick8",
							"button",
							"position:absolute;left:530px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(8);
								},
							},
							a
						),
						"7"
					);
					innerText(
						NewEle(
							"btnClick9",
							"button",
							"position:absolute;left:580px;top:10px;height:30px;width:40px;font-family:briannetodd;font-size:large;border-radius:10px;border-style:solid",
							{
								onclick() {
									b(9);
								},
							},
							a
						),
						"8"
					);
				},
			});
		},
	};
	var oPlt = {
		AZ: [[oZombie, 4, 1]],
		FlagNum: 20,
		FlagToSumNum: { a1: [19], a2: [1, 2] },
		FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(0);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:198px;left:269px", EDAll);
		},
	};
	var oWin = {
		// 全局函数覆盖
		GrowPlant(k, d, c, e, b) {
			var i = oS.ChoseCard;
			var f = ArCard[i];
			var g = f.PName;
			var j = g.prototype;
			var h = j.coolTime;
			var a;
			j.CanGrow(k, e, b) &&
				(CustomSpecial(g, e, b, 1),
				oSym.addTask(20, SetHidden, [
					SetStyle($("imgGrowSoil"), {
						left: d - 30 + "px",
						top: c - 40 + "px",
						zIndex: 3 * e,
						visibility: "visible",
					}),
				]));
			CancelPlant(); // 无冷却
		},
		ViewPlantTitle(a) {
			var c = $("dTitle");
			var b = ArCard[a].PName.prototype;
			c.innerHTML = b.CName + "<br>" + b.Tooltip;
			SetStyle(c, {
				top: 60 * a + "px",
				left: EDAlloffsetLeft + 100 + "px",
			});
		},
	};

	// 根据不同模式开始不同关卡

	$SEql(IZMode, {
		// 每个阶段函数
		ChoseMode() {
			// 选择模式
			oS.Init(
				$FJ(oSys, {
					PicArr: [],
					LoadAccess() {
						!oS.LvlVar ? (oS.LvlVar = { ScrollScreen: oS.ScrollScreen }) : (oS.LvlVar.ScrollScreen = oS.ScrollScreen); // 关卡数据

						NewEle("dChosePanel", "div", "display:block;position:absolute;left:0px;top:0px", 0, EDAll, { class: "Almanac_ZombieBack" });
						NewEle(
							"dChoseTitle",
							"div",
							"position:relative;text-align:center;line-height:88px;height:88px;width:100%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff",
							{ innerHTML: "Select mode" },
							$("dChosePanel"),
							{ class: "dRiddleTitle" }
						);

						NewEle(
							"dBack",
							"div",
							"position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:url(images/interface/Pointer.cur),pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;",
							{
								onmouseover() {
									this.style.backgroundPosition = "bottom";
								},
								onmouseout() {
									this.style.backgroundPosition = "top";
								},
								onclick() {
									Return_Block();
								},
								innerText: "Back",
							},
							EDAll,
							{ class: "button" }
						);

						NewEle(
							"dGrassDiv",
							"div",
							"left:100px;top:100px;background-image:url(images/interface/background2.jpg);display:block;position:absolute;z-index:100;cursor:url(images/interface/Pointer.cur),pointer;background-position:-25px,0px;background-size:324px,139px;background-repeat:no-repeat;width:275px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;",
							{
								onclick() {
									Change_Level("NGrass");
								},
							},
							EDAll
						);
						NewEle(
							"dGrassTXT",
							"div",
							"text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;",
							{
								innerHTML: 'Night<br><font style="font-size:20px">Click here to select this mode</font>',
							},
							$("dGrassDiv")
						);

						NewEle(
							"dPoolDiv",
							"div",
							"left:100px;top:250px;background-image:url(images/interface/background4.jpg);display:block;position:absolute;z-index:100;cursor:url(images/interface/Pointer.cur),pointer;background-position:-25px,0px;background-size:324px,139px;background-repeat:no-repeat;width:275px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;",
							{
								onclick() {
									Change_Level("NPool");
								},
							},
							EDAll
						);
						NewEle(
							"dPoolTXT",
							"div",
							"text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;",
							{
								innerHTML: 'Night Pool<br><font style="font-size:20px">Click here to select this mode</font>',
							},
							$("dPoolDiv")
						);

						SetVisible($("dMenu")); // 显示菜单按钮
					},
					LvlClearFunc() {
						oS.ScrollScreen = oS.LvlVar.ScrollScreen;
						delete oS.LvlVar.ScrollScreen;
					},
				}),
				$FJ(oPlt, {}),
				$FJ(oWin, {
					Return_Block() {
						SelectModal(0), HiddenOptions();
						SetBlock($("dSurface"), $("iSurfaceBackground"));
						ShowRiddleGame();
					},
				})
			);
		},
		NGrass() {
			// 黑夜草地 NGrass
			oS.Init($FJ(oSys, { MapKind: "0" }), $FJ(oPlt, {}), $FJ(oWin, {}));
		},
		NPool() {
			// 黑夜泳池 NPool
			oS.Init(
				$FJ(oSys, {
					MapKind: "1",
					// PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oScaredyShroom, oLilyPad, oSquash, oThreepeater, oTangleKlep, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oCactus, oSplitPea, oStarfruit, oGarlic],
					PName: [
						oPeashooter,
						oSunFlower,
						oWallNut,
						oPotatoMine,
						oSnowPea,
						oChomper,
						oRepeater,
						oPuffShroom,
						oFumeShroom,
						oHypnoShroom,
						oScaredyShroom,
						oLilyPad,
						oSquash,
						oThreepeater,
						oTangleKlep,
						oSpikeweed,
						oTorchwood,
						oTallNut,
						oSeaShroom,
						oCactus,
						oSplitPea,
						oStarfruit,
						oPumpkinHead,
						oFlowerPot,
						oGarlic,
						oGatlingPea,
						oGloomShroom,
						oSpikerock,
					],
					Coord: 2,
					LF: [0, 1, 1, 2, 2, 1, 1], // 泳池样式
					PicArr: ["images/interface/background4.jpg", "images/interface/trophy.png"],
					backgroundImage: "images/interface/background4.jpg",
					LevelName: "I, Zombie Level Editor - Night Pool",
					BrainsNum: 6,
					ArP: { ArC: [1, 4], ArR: [1, 6] },
				}),
				$FJ(oPlt, {}),
				$FJ(oWin, {})
			);
		},
		default() {
			// 未知模式
			oS.Init({ LvlClearFunc: oSys.LvlClearFunc }, {}, {});
			SelectModal(0);
		},
	})();
})();
