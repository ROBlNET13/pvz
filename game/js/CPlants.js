var CPlants = NewO({
	name: "Plants",
	HP: 300,
	PKind: 1,
	beAttackedPointL: 20,
	CardGif: 0,
	StaticGif: 1,
	NormalGif: 2,
	BookHandBack: 0,
	canEat: 1,
	zIndex: 0,
	AudioArr: [],
	coolTime: 7.5,
	CanSelect: 1,
	canTrigger: 1,
	Stature: 0,

	Sleep: 0,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	getHurt(e, c, b) {
		var d = this;
		var a = d.id;
		!(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
	},
	GetDY(b, c, a) {
		return a[0] ? -21 : -15;
	},
	GetDX() {
		return -Math.floor(this.width * 0.5);
	},
	GetDBottom() {
		return this.height;
	},
	Birth(d, c, h, a, m, n) {
		var e = this;
		var k = d + e.GetDX();
		var i = c + e.GetDY(h, a, m);
		var l = e.prototype;
		var g = i - e.height;
		var b = (e.id = "P_" + Math.random());
		var j = (e.zIndex += 3 * h);
		var f = NewEle(0, "div", "position:absolute");

		NewImg(0, ShadowPNG, e.getShadow(e), f);
		e.plantImage = NewImg(0, e.PicArr[e.NormalGif], "", f);

		e.ele = f;

		e.pixelLeft = k;
		e.pixelRight = k + e.width;
		e.pixelTop = g;
		e.pixelBottom = g + e.GetDBottom();
		e.opacity = 1;
		e.InitTrigger(e, b, (e.R = h), (e.C = a), (e.AttackedLX = k + e.beAttackedPointL), (e.AttackedRX = k + e.beAttackedPointR));
		$P[b] = e;
		$P.length += 1;
		e.BirthStyle(
			e,
			b,
			f,
			{
				left: k + "px",
				top: g + "px",
				zIndex: j,
			},
			n
		);
		oGd.add(e, h + "_" + a + "_" + e.PKind);
		e.PrivateBirth(e, n);
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px";
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(a) {},
	getTriggerRange(a, b, c) {
		return [[b, oS.W, 0]];
	},
	getTriggerR(a) {
		return [a, a];
	},
	InitTrigger(c, b, f, a, h, g) {
		var j = {};
		var i = c.getTriggerR(f);
		var e = i[0];
		var d = i[1];
		do {
			oT.add(e, (j[e] = c.getTriggerRange(e, h, g)), b);
		} while (e++ !== d);
		c.oTrigger = j;
	},
	TriggerCheck(b, a) {
		this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CheckLoop(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		oSym.addTask(
			140,
			(e, f, h) => {
				var g;
				(g = $P[e]) && g.AttackCheck1(f, h);
			},
			[a, b, c]
		);
	},
	AttackCheck1(g, f) {
		var b = this;
		var c = b.oTrigger;
		var a = $Z[g];
		var h;
		var e;
		var k;
		var j;
		if (a && a.PZ && (h = c[a.R])) {
			k = a.ZX;
			e = h.length;
			while (e--) {
				j = h[e];
				if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
					b.CheckLoop(g, j[2]);
					return;
				}
			}
		}
		b.canTrigger = 1;
	},
	AttackCheck2(a) {
		return a.Altitude > 0;
	},
	PrivateDie(a) {},
	BoomDie() {
		var a = this;
		var b = a.id;
		a.oTrigger && oT.delP(a);
		a.HP = 0;
		delete $P[b];
		delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
		$P.length -= 1;
		ClearChild($(b));
		a.PrivateDie(a);
	},
	Die(a) {
		var b = this;
		var c = b.id;
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
		$P.length -= 1;
		!a && ClearChild($(c));
		b.PrivateDie(b);
	},
});
var oGraveBuster = InheritO(CPlants, {
	EName: "oGraveBuster",
	CName: "Grave Buster",
	width: 99,
	height: 106,
	beAttackedPointR: 70,
	SunNum: 75,
	BookHandBack: 2.5,
	canEat: 0,
	PicArr: ["images/Card/Plants/GraveBuster.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],
	AudioArr: ["gravebusterchomp"],
	CanGrow(b, a, d) {
		var c = oS.ArP;
		return c ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1] : a + "_" + d in oGd.$Tombstones && !b[1];
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	GetDY(b, c, a) {
		return -30;
	},
	InitTrigger() {},
	Tooltip: "Plant it on a grave to remove the grave",
	Produce:
		'<font color="#28325A">Plant Grave Busters on graves to remove the graves.</font><p>Usage: <font color="#CC241D">single use, must be planted on graves</font><br>Special: <font color="#CC241D">removes graves</font></p>Despite Grave Buster\'s fearsome appearance, he wants everyone to know that he loves kittens and spends his off hours volunteering at a local zombie rehabilitation center. "It\'s just the right thing to do," he says.',
	PrivateBirth(a) {
		PlayAudio("gravebusterchomp");
		oSym.addTask(
			420,
			(b) => {
				var e = $P[b];
				var c;
				var d;
				var f;
				e &&
					((d = e.R),
					(f = e.C),
					delete oGd.$Tombstones[(c = d + "_" + f)],
					e.Die(),
					ClearChild($("dTombstones" + c)),
					oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 25, 0));
			},
			[a.id]
		);
	},
});
var oLawnCleaner = InheritO(CPlants, {
	EName: "oLawnCleaner",
	CName: "Lawn mower",
	width: 71,
	height: 57,
	beAttackedPointL: 0,
	beAttackedPointR: 71,
	SunNum: 0,
	PicArr: ["images/interface/LawnCleaner.png", "images/interface/LawnCleaner1.png"],
	AudioArr: ["lawnmower"],
	NormalGif: 0,
	canEat: 0,
	Stature: 1,
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 38) + "px;top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	TriggerCheck(b, a) {
		b.beAttacked && b.Altitude > 0 && ((this.canTrigger = 0), this.NormalAttack(this));
	},
	BoomDie() {},
	Tooltip: "Most common lawn mower",
	NormalAttack(a) {
		PlayAudio(a.AudioArr[0]);
		(function (b, c, k, j, e, g) {
			var d = oZ.getArZ(k, j, e);
			var f = d.length;
			var h;
			$(a.id).childNodes[1].src = "images/interface/LawnCleaner1.png";
			while (f--) {
				(h = d[f]).getCrushed(b) && h.CrushDie();
			}
			k > c
				? b.Die()
				: ((b.pixelRight += 10),
					(b.AttackedLX = k += 10),
					(b.AttackedRX = j += 10),
					(g.style.left = (b.pixelLeft += 10) + "px"),
					oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]),
					[this]);
		})(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
var oCleaner1 = InheritO(oLawnCleaner, {
	EName: "oCleaner",
	CName: "Cleaner",
	width: 80,
	height: 80,
	beAttackedPointL: 0,
	beAttackedPointR: 57,
	SunNum: 0,
	PicArr: ["images/interface/BZ.png", "images/Plants/Jalapeno/JalapenoAttack.gif"],
	Tooltip: "Firecrackers",
	AudioArr: ["jalapeno"],
});
var oCleaner = InheritO(oCleaner1, {
	EName: "oCleaner",
	NormalAttack(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlayAudio("jalapeno");
					var b = $(j);
					var f = h.R;
					var c = oZ.getArZ(100, oS.W, f);
					var e = c.length;
					var g = oGd.$Ice[f];
					var d = oGd.$Crater;
					while (e--) {
						c[e].getExplosion();
					}
					h.Die(1);
					EditEle(
						b.childNodes[1],
						{
							src: "images/Plants/Jalapeno/JalapenoAttack.gif",
						},
						{
							width: "755px",
							height: "131px",
							left: 120 - h.pixelLeft + "px",
							top: "-42px",
						}
					);
					oSym.addTask(135, ClearChild, [b]);
					ClearChild($("dIceCar" + f));
					if (g) {
						for (e = g[1]; e < 11; e++) {
							delete d[f + "_" + e];
						}
					}
				}
			},
			[a.id]
		);
	},
});
var oPoolCleaner = InheritO(oLawnCleaner, {
	EName: "oPoolCleaner",
	CName: "Pool Cleaner",
	width: 47,
	height: 64,
	beAttackedPointL: 0,
	beAttackedPointR: 47,
	SunNum: 0,
	PicArr: ["images/interface/PoolCleaner.png", "images/interface/PoolCleaner1.png"],
	Tooltip: "Pond Sweeper",
	AudioArr: ["pool_cleaner"],
	NormalAttack(a) {
		PlayAudio(a.AudioArr[0]);
		(function (b, c, k, j, e, g) {
			var d = oZ.getArZ(k, j, e);
			var f = d.length;
			var h;
			$(a.id).childNodes[1].src = "images/interface/PoolCleaner1.png";
			while (f--) {
				(h = d[f]).getCrushed(b) && h.CrushDie();
			}
			k > c
				? b.Die()
				: ((b.pixelRight += 10),
					(b.AttackedLX = k += 10),
					(b.AttackedRX = j += 10),
					(g.style.left = (b.pixelLeft += 10) + "px"),
					oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]),
					[this]);
		})(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
var oBrains = InheritO(CPlants, {
	EName: "oBrains",
	CName: "Brains",
	width: 32,
	height: 31,
	beAttackedPointL: 0,
	beAttackedPointR: 32,
	SunNum: 0,
	HP: 1,
	PicArr: ["images/interface/brain.png"],
	Tooltip: "Delicious brain",
	NormalGif: 0,
	InitTrigger() {},
	PrivateBirth(a) {
		a.PrivateDie = oS.BrainsNum
			? ((a.DieStep = Math.floor(150 / oS.BrainsNum)),
				function (d) {
					var c;
					var b;
					AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);
					(b = --oS.BrainsNum)
						? ((c = b * d.DieStep),
							($("imgFlagHead").style.left = c - 11 + "px"),
							($("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)"))
						: (($("imgFlagHead").style.left = "-1px"), ($("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)"), oP.FlagToEnd());
				})
			: function (b) {
					GameOver();
				};
	},
	GetDX() {
		return -40;
	},
});
var oStarfruit = InheritO(CPlants, {
	EName: "oStarfruit",
	CName: "Starfruit",
	width: 77,
	height: 70,
	beAttackedPointR: 57,
	SunNum: 125,
	GetDY(b, c, a) {
		return a[0] ? -17 : -10;
	},
	PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
	Tooltip: "Shoots stars in 5 directions",
	Produce:
		'<font color="#28325A">Starfruits shoot stars in 5 directions.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">5 directions</font><p>"Aw, man," says Starfruit. "I went to the dentist the other day and he said I have four cavities. I\'ve got --count it-- ONE tooth! Four cavities in one tooth? How does this happen?"',
	getTriggerRange(e, g, f) {
		var a = this.R;
		var b = GetY(a);
		var c = oS.W;
		var j = this.ArFlyTime;
		var h = this.ArHitX;
		var i;
		var d = 0.5 * (g + f);
		!j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));
		switch (true) {
			case e < a:
				j[e] = [(i = b - GetY(e)) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
			case e === a:
				return [[100, g + 25, 4]];
			default:
				j[e] = [(i = GetY(e) - b) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
		}
	},
	AttackCheck2(l) {
		var j = l.R;
		if (j === this.R) {
			return l.Altitude > 0;
		}
		var q = 0;
		var t = l.AttackedLX;
		var b = l.AttackedRX;
		var e;
		var g;
		var d = this.ArFlyTime;
		var c = this.ArHitX;
		var s = d[j];
		var r = c[j];
		var f = l.WalkDirection ? -1 : 1;
		var k = false;
		var m;
		var p;
		var n;
		var h;
		var a = l.Speed;
		while (q < s.length) {
			h = a * s[q] * f * 0.1;
			e = Math.floor(t - h);
			g = Math.floor(b - h);
			p = r[0];
			n = r[1];
			if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
				k = true;
				break;
			}
			++q;
		}
		return k && l.Altitude > 0;
	},
	getTriggerR(a) {
		return [1, oS.R];
	},
	PrivateBirth(d) {
		var c = d.pixelLeft + 38;
		var b = c - 15;
		var a = d.pixelTop + 20;
		d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 && c.NormalAttack();
		(c.HP -= a) < 1 && c.Die();
	},
	NormalAttack() {
		var g = this;
		var f = g.pixelLeft + 38;
		var d = f - 15;
		var b = g.pixelTop + 20;
		var c = g.R;
		var e = f + 15;
		var a = function (j, i, h) {
			return j && j.Altitude === 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true;
		};
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, k, l, i, j) {
					j(oZ.getZ1(m, k), 4, i) &&
						((m -= 5) < 100 ? ClearChild(i) : ((i.style.left = (l -= 5) + "px"), oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
				},
				[
					f,
					c,
					d,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 6, i) &&
						((k -= 5) < -15 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 2, i) &&
						((k += 5) > 600 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 7, i) &&
						((n += 4) > 900 || (k -= 3) < -15
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 1, i) &&
						((n += 4) > 900 || (k += 3) > 600
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
	},
});
var oSeedStarfruit = InheritO(CPlants, {
	EName: "oSeedStarfruit",
	CName: "Starfruit",
	width: 77,
	height: 70,
	beAttackedPointR: 57,
	SunNum: 0,
	GetDY(b, c, a) {
		return a[0] ? -17 : -10;
	},
	PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
	Tooltip: "Shoots stars in 5 directions",
	Produce:
		'Starfruit can fire small starfruits in five directions.<p>Harm:<font color="#CC241D">medium</font><br>Scope:<font color="#CC241D">five directions</font></p>Starfruit: "Hey man, I went to the dentist one day and he said</font><br>I have four cavities. When I count, I only have one tooth! one</font><br>Carambola: "Hey man, theres a tooth with four cavities? Why is that?" I went to the dentist and he said',
	getTriggerRange(e, g, f) {
		var a = this.R;
		var b = GetY(a);
		var c = oS.W;
		var j = this.ArFlyTime;
		var h = this.ArHitX;
		var i;
		var d = 0.5 * (g + f);
		!j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));
		switch (true) {
			case e < a:
				j[e] = [(i = b - GetY(e)) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
			case e === a:
				return [[100, g + 25, 4]];
			default:
				j[e] = [(i = GetY(e) - b) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
		}
	},
	AttackCheck2(l) {
		var j = l.R;
		if (j === this.R) {
			return l.Altitude > 0;
		}
		var q = 0;
		var t = l.AttackedLX;
		var b = l.AttackedRX;
		var e;
		var g;
		var d = this.ArFlyTime;
		var c = this.ArHitX;
		var s = d[j];
		var r = c[j];
		var f = l.WalkDirection ? -1 : 1;
		var k = false;
		var m;
		var p;
		var n;
		var h;
		var a = l.Speed;
		while (q < s.length) {
			h = a * s[q] * f * 0.1;
			e = Math.floor(t - h);
			g = Math.floor(b - h);
			p = r[0];
			n = r[1];
			if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
				k = true;
				break;
			}
			++q;
		}
		return k && l.Altitude > 0;
	},
	getTriggerR(a) {
		return [1, oS.R];
	},
	PrivateBirth(d) {
		var c = d.pixelLeft + 38;
		var b = c - 15;
		var a = d.pixelTop + 20;
		d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 && c.NormalAttack();
		(c.HP -= a) < 1 && c.Die();
	},
	NormalAttack() {
		var g = this;
		var f = g.pixelLeft + 38;
		var d = f - 15;
		var b = g.pixelTop + 20;
		var c = g.R;
		var e = f + 15;
		var a = function (j, i, h) {
			return j && j.Altitude === 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true;
		};
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, k, l, i, j) {
					j(oZ.getZ1(m, k), 4, i) &&
						((m -= 5) < 100 ? ClearChild(i) : ((i.style.left = (l -= 5) + "px"), oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
				},
				[
					f,
					c,
					d,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 6, i) &&
						((k -= 5) < -15 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 2, i) &&
						((k += 5) > 600 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 7, i) &&
						((n += 4) > 900 || (k -= 3) < -15
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function (n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 1, i) &&
						((n += 4) > 900 || (k += 3) > 600
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
	},
});
var oPeashooter = InheritO(CPlants, {
	EName: "oPeashooter",
	CName: "Peashooter",
	width: 71,
	height: 71,
	beAttackedPointR: 51,
	SunNum: 100,
	BKind: 0,
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	PicArr: [
		"images/Card/Plants/Peashooter.png",
		"images/Plants/Peashooter/0.gif",
		"images/Plants/Peashooter/Peashooter.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	Tooltip: "Shoots peas at the enemy",
	Produce:
		'<font color="#28325A">Pea shooters are your first line of defense. They shoot peas at attacking zombies.</font><p>Damage: <font color="#CC241D">normal</font></p>How can a single plant grow and shoot so many peas so quickly? Peashooter says, "Hard work, commitment, and a healthy, well-balanced breakfast of sunlight and high-fiber carbon dioxide make it all possible." ',
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][m]),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oSeedPeashooter = InheritO(CPlants, {
	EName: "oSeedPeashooter",
	CName: "Peashooter",
	width: 71,
	height: 71,
	beAttackedPointR: 51,
	SunNum: 0,
	BKind: 0,
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	PicArr: [
		"images/Card/Plants/Peashooter.png",
		"images/Plants/Peashooter/0.gif",
		"images/Plants/Peashooter/Peashooter.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	Tooltip: "Shoots peas at the enemy",
	Produce:
		'Pea shooters are your first line of defense. They shoot peas at attacking zombies.<p>Damage: <font color="#CC241D">normal</font></p>How can a single plant grow and shoot so many peas so quickly? Peashooter says, "Hard work, commitment, and a healthy, well-balanced breakfast of sunlight and high-fiber carbon dioxide make it all possible." ',
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][m]),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oLotusRoot = InheritO(oPeashooter, {
	EName: "oLotusRoot",
	CName: "Lotus Root",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 250,
	BookHandBack: 4.9,
	coolTime: 25,
	getShadow(a) {
		return "display:none";
	},
	PicArr: [
		"images/Card/Plants/LotusRoot.png",
		"images/Plants/LotusRoot/0.gif",
		"images/Plants/LotusRoot/Peashooter.gif",
		"images/Plants/LotusRoot/Missile.png",
		"images/Plants/LotusRoot/BulletHit.png",
	],
	Tooltip: "Fire high-powered rocket launchers, inflicting heavy damage",
	Produce:
		'The lotus root rocket launcher can launch high-fire rocket launchers, targeting warships and</font><br>The submarine inflicted heavy damage.<p>Harm:<font color="#CC241D">极高</font></p>What else can the lotus root rocket launcher do besides firing shells. Ok,</font><br>For this question, you should ask the intensive phobia patient</font><br>。”',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(o) => {
				$(a.id).childNodes[1].src = "images/Plants/LotusRoot/Peashooter.gif";
			},
			[this]
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/LotusRoot/Missile.png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/LotusRoot/BulletHit.png"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 500, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oSnowPea = InheritO(oPeashooter, {
	EName: "oSnowPea",
	CName: "SnowPea",
	SunNum: 175,
	BKind: -1,
	PicArr: [
		"images/Card/Plants/SnowPea.png",
		"images/Plants/SnowPea/0.gif",
		"images/Plants/SnowPea/SnowPea.gif",
		"images/Plants/PB-10.gif",
		"images/Plants/PeaBulletHit1.gif",
	],
	AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
	Tooltip: "Shoots frozen peas that damage and slow the enemy",
	Produce:
		'<font color="#28325A">Snow Peas shoot frozen peas that damage and slow the enemy.</font><p>Damage: <font color="#CC241D">normal, slows zombies</font></p>Folks often tell Snow Pea how "cool" he is, or exhort him to "chill out." They tell him to "stay frosty." Snow Pea just rolls his eyes. He\'s heard \'em al',
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m < 1 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), ++m && (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/PeaBulletHit1.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oSeedSnowPea = InheritO(oPeashooter, {
	EName: "oSeedSnowPea",
	CName: "SnowPea",
	SunNum: 0,
	BKind: -1,
	PicArr: [
		"images/Card/Plants/SnowPea.png",
		"images/Plants/SnowPea/0.gif",
		"images/Plants/SnowPea/SnowPea.gif",
		"images/Plants/PB-10.gif",
		"images/Plants/PeaBulletHit1.gif",
	],
	AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
	Tooltip: "Shoots frozen peas that damage and slow the enemy",
	Produce:
		'The Frost Archer fires Frozen Peas to attack enemies and has</font><br>Slow down effect.<p>Harm:<font color="#CC241D">Medium, with a slowing effect</font></p>People often tell the ice shooter how cold he is, or</font><br>Admonish him to be calm. They told him to keep your composure. cold</font><br>The ice shooter just rolled his eyes. In fact, he heard it all.',
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m < 1 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), ++m && (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/PeaBulletHit1.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oSnowRepeater = InheritO(oSnowPea, {
	EName: "oSnowRepeater",
	CName: "Snow Repeater",
	SunNum: 250,
	PicArr: [
		"images/Card/Plants/SnowRepeater.png",
		"images/Plants/SnowRepeater/0.gif",
		"images/Plants/SnowRepeater/SnowPea.gif",
		"images/Plants/PB-10.gif",
		"images/Plants/PeaBulletHit1.gif",
	],
	Tooltip: "Fires two frozen peas that damage and slow the enemy at a time",
	Produce:
		'<font color="#28325A">Snow Repeaters shoot 2 frozen peas that damage and slow the enemy.</font><p>Damage: <font color="#CC241D">normal, slows zombies</font><br>Firing Speed: <font color="#CC241D">2x</font></p>A Repeater that channels its inner Snow Pea. Fires two rapid, chilling peas that slow zombies to a crawl, because sometimes frostbite is better in bursts!',
	NormalAttack1: oSnowPea.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		oSym.addTask(
			15,
			(c) => {
				var b = $P[c];
				b && b.NormalAttack1();
			},
			[this.id]
		);
	},
});
var oSeedRepeater = InheritO(oPeashooter, {
	EName: "oSeedRepeater",
	CName: "Repeater",
	width: 73,
	height: 71,
	beAttackedPointR: 53,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Repeater.png",
		"images/Plants/Repeater/0.gif",
		"images/Plants/Repeater/Repeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Fires two peas at a time",
	Produce:
		'Dual shooters can shoot two peas at once<p>Harm:<font color="#CC241D">Medium (per piece)</font><br>Launch speed:<font color="#CC241D">double</font></p>The dual shooter is fierce, and he grew up on the street. Hes not in now</font><br>Regardless of anyones opinion, whether its a plant or a zombie, he fights</font><br>Out of peas, is to keep others away from him. Actually, double</font><br>The launcher has been secretly longing for love.',
	NormalAttack1: oPeashooter.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		oSym.addTask(
			15,
			(c) => {
				var b = $P[c];
				b && b.NormalAttack1();
			},
			[this.id]
		);
	},
});
var oRepeater = InheritO(oPeashooter, {
	EName: "oRepeater",
	CName: "Repeater",
	width: 73,
	height: 71,
	beAttackedPointR: 53,
	SunNum: 200,
	PicArr: [
		"images/Card/Plants/Repeater.png",
		"images/Plants/Repeater/0.gif",
		"images/Plants/Repeater/Repeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Fires two peas at a time",
	Produce:
		'<font color="#28325A">Repeaters fire two peas at a time.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Firing speed: <font color="#CC241D">2x</font></p>Repeater is fierce. He\'s from the streets. He doesn\'t take attitude from anybody, plant or zombie, and he shoots peas to keep people at a distance. Secretly, though, Repeater yearns for love.',
	NormalAttack1: oPeashooter.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		oSym.addTask(
			15,
			(c) => {
				var b = $P[c];
				b && b.NormalAttack1();
			},
			[this.id]
		);
	},
});
var oSeedRepeater2 = InheritO(oRepeater, {
	EName: "oSeedRepeater2",
	CName: "Reverse Repeater",
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Repeater2.png",
		"images/Plants/Repeater2/0.gif",
		"images/Plants/Repeater2/Repeater2.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	NormalAttack1() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
							width: "52px",
							height: "46px",
						}).src = "images/Plants/PeaBulletHit.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 1, a.AttackedLX + 30, a.R, 0, 0, a.AttackedRX, oGd.$Torch]
		);
	},
	getTriggerRange(a, b, c) {
		return [[100, b + 25, 1]];
	},
});
var oRepeater2 = InheritO(oRepeater, {
	EName: "oRepeater2",
	CName: "Reverse Repeater",
	PicArr: [
		"images/Card/Plants/Repeater2.png",
		"images/Plants/Repeater2/0.gif",
		"images/Plants/Repeater2/Repeater2.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	NormalAttack1() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
							width: "52px",
							height: "46px",
						}).src = "images/Plants/PeaBulletHit.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 1, a.AttackedLX + 30, a.R, 0, 0, a.AttackedRX, oGd.$Torch]
		);
	},
	getTriggerRange(a, b, c) {
		return [[100, b + 25, 1]];
	},
});
var oThreepeater = InheritO(oPeashooter, {
	EName: "oThreepeater",
	CName: "Threepeater",
	width: 73,
	height: 80,
	beAttackedPointR: 53,
	SunNum: 325,
	PicArr: [
		"images/Card/Plants/Threepeater.png",
		"images/Plants/Threepeater/0.gif",
		"images/Plants/Threepeater/Threepeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
		"images/Plants/FireBulletHit.webp",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Shoots peas in three lanes",
	Produce:
		'<font color="#28325A">Threepeaters shoot peas in three lanes.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Range: <font color="#CC241D">three lanes</font></p>Threepeater likes reading, backgammon and long periods of immobility in the park. Threepeater enjoys going to shows, particularly modern jazz. "I\'m just looking for that special someone," he says. Threepeater\'s favorite number is 5.',
	getTriggerR(a) {
		return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a];
	},
	PrivateBirth(f) {
		var e = f.AttackedLX;
		var d = e - 40;
		var a;
		var c = f.oTrigger;
		var b;
		f.BulletClass = [];
		f.BulletEle = [];
		for (b in c) {
			let bullet = NewO({
				X: e,
				R: b,
				D: 0,
				Attack: 20,
				Kind: 0,
				ChangeC: 0,
				pixelLeft: d,
				F: oGd.MB1,
			});
			f.BulletClass.push(bullet);
			if (oS.CardKind !== 1) {
				f.BulletEle.push(
					NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(f.R) - 65) + "px;visibility:hidden;z-index:" + (3 * b + 2))
				);
			} else {
				f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)));
			}
		}
		if (oS.CardKind !== 1) {
			let downBullet = f.BulletEle[f.BulletEle.length - 1];
			let upBullet = f.BulletEle[f.BulletEle.length - 3];
			try {
				downBullet.style.animation = "threepeaterDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
				upBullet.style.animation = "threepeaterUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
			} catch (e) {
				console.warn("Failed to animate threepeater bullets, retrying in 500ms\n" + e);
				setTimeout(() => {
					try {
						downBullet.style.animation = "threepeaterDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
						upBullet.style.animation = "threepeaterUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
					} catch (e) {
						console.warn("Failed to animate threepeater bullets\n", e);
					}
				}, 5e2);
			}
		} else {
			console.warn("Not animating threepeater bullets - I, Zombie levels are not supported");
		}
	},
	PrivateDie(a) {
		a.BulletEle.length = 0;
	},
	NormalAttack() {
		var a;
		var c = this;
		var d;
		var b = 0;
		for (a in c.oTrigger) {
			EditEle(
				c.BulletEle[b++].cloneNode(false),
				{
					id: (d = "PB" + Math.random()),
				},
				0,
				EDPZ
			);
			oSym.addTask(
				15,
				(f) => {
					var e = $(f);
					e && SetVisible(e);
				},
				[d]
			);
			oSym.addTask(
				1,
				function (h, l, j, e, p, k, o, m, q, i) {
					var n;
					var g = GetC(p);
					var f = oZ["getZ" + e](p, k);
					o === 0 && i[k + "_" + g] && m !== g && (PlayAudio("firepea"), (o = 1), (j = 40), (m = g), (l.src = "images/Plants/PB" + o + e + ".png"));
					f && f.Altitude === 1
						? (f[
								{
									"-1": "getSnowPea",
									0: "getPea",
									1: "getFirePea",
								}[o]
							](f, j, e),
							(SetStyle(l, {
								left: q + 28 + "px",
							}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][o]),
							oSym.addTask(10, ClearChild, [l]))
						: (p += n = !e ? 5 : -5) < oS.W && p > 100
							? ((l.style.left = (q += n) + "px"), oSym.addTask(1, arguments.callee, [h, l, j, e, p, k, o, m, q, i]))
							: ClearChild(l);
				},
				[d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch]
			);
		}
	},
});
var oSeedThreepeater = InheritO(oPeashooter, {
	EName: "oSeedThreepeater",
	CName: "Threepeater",
	width: 73,
	height: 80,
	beAttackedPointR: 53,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Threepeater.png",
		"images/Plants/Threepeater/0.gif",
		"images/Plants/Threepeater/Threepeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
		"images/Plants/FireBulletHit.webp",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Shoots peas in three lanes",
	Produce:
		'A three-line shooter can shoot peas on three lines at the same time.<p>Harm:<font color="#CC241D">Ordinary (each)</font><br>Scope:<font color="#CC241D">three lines</font></p>The three-line shooter enjoys reading, playing chess and sitting in the park. he</font><br>Also enjoys performing, especially modern jazz. "Im looking for</font><br>The other half of my life," he said. The third-line shooters favorite number</font><br>The word is 5.',
	getTriggerR(a) {
		return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a];
	},
	PrivateBirth(f) {
		var e = f.AttackedLX;
		var d = e - 40;
		var a;
		var c = f.oTrigger;
		var b;
		f.BulletClass = [];
		f.BulletEle = [];
		for (b in c) {
			f.BulletClass.push(
				NewO({
					X: e,
					R: b,
					D: 0,
					Attack: 20,
					Kind: 0,
					ChangeC: 0,
					pixelLeft: d,
					F: oGd.MB1,
				})
			);
			f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)));
		}
	},
	PrivateDie(a) {
		a.BulletEle.length = 0;
	},
	NormalAttack() {
		var a;
		var c = this;
		var d;
		var b = 0;
		for (a in c.oTrigger) {
			EditEle(
				c.BulletEle[b++].cloneNode(false),
				{
					id: (d = "PB" + Math.random()),
				},
				0,
				EDPZ
			);
			oSym.addTask(
				15,
				(f) => {
					var e = $(f);
					e && SetVisible(e);
				},
				[d]
			);
			oSym.addTask(
				1,
				function (h, l, j, e, p, k, o, m, q, i) {
					var n;
					var g = GetC(p);
					var f = oZ["getZ" + e](p, k);
					o === 0 && i[k + "_" + g] && m !== g && (PlayAudio("firepea"), (o = 1), (j = 40), (m = g), (l.src = "images/Plants/PB" + o + e + ".png"));
					f && f.Altitude === 1
						? (f[
								{
									"-1": "getSnowPea",
									0: "getPea",
									1: "getFirePea",
								}[o]
							](f, j, e),
							(SetStyle(l, {
								left: q + 28 + "px",
							}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][o]),
							oSym.addTask(10, ClearChild, [l]))
						: (p += n = !e ? 5 : -5) < oS.W && p > 100
							? ((l.style.left = (q += n) + "px"), oSym.addTask(1, arguments.callee, [h, l, j, e, p, k, o, m, q, i]))
							: ClearChild(l);
				},
				[d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch]
			);
		}
	},
});
var oGatlingPea = InheritO(oPeashooter, {
	EName: "oGatlingPea",
	CName: "Gatling Pea",
	width: 88,
	height: 84,
	beAttackedPointR: 68,
	SunNum: 250,
	PicArr: [
		"images/Card/Plants/GatlingPea.png",
		"images/Plants/GatlingPea/0.gif",
		"images/Plants/GatlingPea/GatlingPea.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: 'shoots four peas at a time <p> <font color="red">(requires repeater)</font>',
	Produce:
		'<font color="#28325A">Gatling Peas shoot four peas at a time.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Firing Speed: <font color="#CC241D">4x</font><br>Must be planted on repeaters<p>Gatling Pea\'s parents were concerned when he announced his intention to join the military. "But honey, it\'s so dangerous!" they said in unison. Gatling Pea refused to budge. "Life is dangerous," he replied, eyes glinting with steely conviction.',
	PrivateBirth(c) {
		var b = c.AttackedLX;
		var a = b - 40;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			D: 0,
			Attack: 20,
			Kind: c.BKind,
			ChangeC: 0,
			pixelLeft: a,
			F: oGd.MB1,
		});
		c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
	},
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oRepeater";
	},
	NormalAttack1: oPeashooter.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		oSym.addTask(
			15,
			function (d, b) {
				var c = $P[d];
				c && c.NormalAttack1();
				--b && oSym.addTask(15, arguments.callee, [d, b]);
			},
			[this.id, 3]
		);
	},
});
var oSplitPea = InheritO(oPeashooter, {
	EName: "oSplitPea",
	CName: "Split Pea",
	width: 92,
	height: 72,
	beAttackedPointR: 72,
	SunNum: 125,
	PicArr: [
		"images/Card/Plants/SplitPea.png",
		"images/Plants/SplitPea/0.gif",
		"images/Plants/SplitPea/SplitPea.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PB01.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Shoots peas forward and backwards",
	Produce:
		'<font color="#28325A">Split Peas shoot peas forward and backwards.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">forward and backwards</font><br>Firing speed: <font color="#CC241D">1x forward, 2x backwards</font></p>"Yeah, I\'m a Gemini," says Split Pea. "I know, big surprise. But having two heads --or really, one head with a large head-like growth on the back-- pays off big in my line of work."',
	GetDX() {
		return -55;
	},
	getShadow(a) {
		return "left:5px;top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [
			[100, b + 25, 1],
			[b + 26, oS.W, 0],
		];
	},
	PrivateBirth(c) {
		var b = c.PicArr;
		var a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
		(c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)]), (c.aTri = [0, 0]);
	},
	PrivateDie(a) {
		a.BulletEle.length = 0;
	},
	TriggerCheck(b, a) {
		if (this.aTri[a]) {
			return;
		}
		if (this.AttackCheck2(b)) {
			++this.aTri[a];
			this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
			this.CheckLoop(b.id, a);
		}
	},
	AttackCheck1(b, f) {
		var e = this;
		var c = $Z[b];
		var a;
		if (c && c.PZ && c.R === e.R) {
			a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
			f === a ? (e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f]) : (++e.aTri[a], --e.aTri[f]);
		} else {
			--e.aTri[f];
		}
		e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1;
	},
	CheckLoop(a, b) {
		this.NormalAttack(b);
		oSym.addTask(
			140,
			(c, e, g) => {
				var f;
				(f = $P[c]) && f.AttackCheck1(e, g);
			},
			[this.id, a, b]
		);
	},
	NormalAttack(c) {
		var d = this;
		var e;
		var a = c
			? (oSym.addTask(
					15,
					(f) => {
						$P[f] && b(1);
					},
					[d.id]
				),
				d.AttackedRX - 16)
			: d.AttackedLX - 40;
		var b = function () {
			EditEle(
				d.BulletEle[c].cloneNode(false),
				{
					id: (e = "PB" + Math.random()),
				},
				0,
				EDPZ
			);
			oSym.addTask(
				15,
				(g) => {
					var f = $(g);
					f && SetVisible(f);
				},
				[e]
			);
			oSym.addTask(
				1,
				function (i, m, k, f, q, l, p, n, r, j) {
					var o;
					var h = GetC(q);
					var g = oZ["getZ" + f](q, l);
					p === 0 && j[l + "_" + h] && n !== h && (PlayAudio("firepea"), (p = 1), (k = 40), (n = h), (m.src = "images/Plants/PB" + p + f + ".png"));
					g && g.Altitude === 1
						? (g[
								{
									"-1": "getSnowPea",
									0: "getPea",
									1: "getFirePea",
								}[p]
							](g, k, f),
							(SetStyle(m, {
								left: r + 28 + "px",
							}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][m]),
							oSym.addTask(10, ClearChild, [m]))
						: (q += o = !f ? 5 : -5) < oS.W && q > 100
							? ((m.style.left = (r += o) + "px"), oSym.addTask(1, arguments.callee, [i, m, k, f, q, l, p, n, r, j]))
							: ClearChild(m);
				},
				[e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch]
			);
		};
		b();
	},
});
var oSunFlower = InheritO(CPlants, {
	EName: "oSunFlower",
	CName: "SunFlower",
	width: 73,
	height: 74,
	beAttackedPointR: 53,
	SunNum: 50,
	PicArr: [
		"images/Card/Plants/SunFlower.png",
		"images/Plants/SunFlower/0.gif",
		"images/Plants/SunFlower/SunFlower1.gif",
		"images/Plants/SunFlower/SunFlower.gif",
	],
	Tooltip: "Gives you additional sun",
	Produce:
		'<font color="#28325A">Sunflowers are essential for you to produce extra sun. Try planting as many as you can!</font><p>Sun production: <font color="#CC241D">normal</font></p>Sunflower can\'t resist bouncing to the beat. Which beat is that? Why, the life-giving jazzy rhythm of the Earth itself, thumping at a frequency only Sunflower can hear.',

	/* Unused BirthStyle function
	BirthStyle: function (c, e, b, a) {
		var d = b.childNodes[1];
		d.src = "images/Plants/SunFlower/SunFlower.gif";
		d.style.clip = "rect(0,auto,74px,0)";
		d.style.height = "148px";
		EditEle(
			b,
			{
				id: e,
			},
			a,
			EDPZ
		);
	},
	*/

	ChangePosition(c, a) {
		var b = c.childNodes[1];
		if (a) {
			// Highlight the sunflower when producing sun
			SetStyle(b, {
				transition: "filter 0.4s ease",
				filter: "saturate(1.2) brightness(1.1) contrast(1.1)",
			});
		} else {
			// Reset the sunflower's appearance
			SetStyle(b, {
				transition: "filter 0.2s ease",
				filter: "saturate(1) brightness(1) contrast(1)",
			});
		}
	},

	PrivateBirth(a) {
		if (oS.ProduceSun) {
			// Normal sun production mode
			oSym.addTask(
				500,
				function produceSun(plantId, x, y) {
					// Check if the plant still exists
					if (!$P[plantId]) {
						return;
					}

					// Highlight the sunflower
					a.ChangePosition($(plantId), 1);

					oSym.addTask(
						100,
						(id, posX, posY, callback) => {
							if (!$P[id]) {
								return;
							}

							// Produce sun at a slightly randomized position
							const randomX = Math.floor(posX + Math.random() * 41);
							AppearSun(randomX, posY, 25, 0);

							// Reset sunflower appearance
							oSym.addTask(
								50,
								(plantId) => {
									if ($P[plantId]) {
										a.ChangePosition($(plantId), 0);
									}
								},
								[id]
							);

							// Schedule next sun production
							oSym.addTask(2400, callback, [id, posX, posY]);
						},
						[plantId, x, y, produceSun]
					);
				},
				[a.id, GetX(a.C) - 40, GetY(a.R)]
			);
		} else {
			// Alternative mode: produce sun when damaged
			a.getHurt = function (zombie, damageType, damage) {
				switch (damageType) {
					case 0: // Normal damage
						this.HP -= damage;

						// Produce sun every 100 HP lost
						if (!(this.HP % 100)) {
							const plantX = GetX(this.C);
							const plantY = GetY(this.R);
							const randomX = Math.floor(plantX - 40 + Math.random() * 41);

							// Produce suns
							AppearSun(randomX, plantY, 25, 0);

							oSym.addTask(
								50,
								(col, row) => {
									const x = Math.floor(GetX(col) - 40 + Math.random() * 41);
									AppearSun(x, GetY(row), 25, 0);
								},
								[this.C, this.R]
							);

							if (this.HP < 1) {
								this.Die();
							} else {
								oSym.addTask(
									50,
									(col, row) => {
										const x = Math.floor(GetX(col) - 40 + Math.random() * 41);
										AppearSun(x, GetY(row), 25, 0);
									},
									[this.C, this.R]
								);
							}
						}
						break;

					case 3: // Special damage type
						this.HP -= damage;
						if (this.HP < 1) {
							this.Die();
						}
						break;

					default: // Other damage types
						this.Die(1);
				}
			};
		}
	},

	InitTrigger() {}, // Empty function - sunflowers don't need triggers
});
var oTwinSunflower = InheritO(oSunFlower, {
	EName: "oTwinSunflower",
	CName: "Twin Sunflower",
	width: 83,
	height: 84,
	beAttackedPointR: 63,
	SunNum: 150,
	PicArr: [
		"images/Card/Plants/TwinSunflower.png",
		"images/Plants/TwinSunflower/0.gif",
		"images/Plants/TwinSunflower/TwinSunflower1.gif",
		"images/Plants/TwinSunflower/TwinSunflower.gif",
	],
	Tooltip: 'Gives twice as much sun as a sunflower  <p> <font color="red">(requires sunflower)</font>',
	Produce:
		'<font color="#28325A">Twin Sunflowers give twice as much sun as a normal sunflower.</font><p>Sun production: <font color="#CC241D">double</font><br>Must be planted on sunflowers<p>It was a crazed night of forbidden science that brought Twin Sunflower into existence. Thunder crashed overhead, strange lights flickered, even the very roaring wind seemed to hiss its angry denial. But to no avail. Twin Sunflower was alive, ALIVE!',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oSunFlower";
	},
	/*
BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
    d.style.clip = "rect(0,auto,84px,0)";
    d.style.height = "168px";
    EditEle(
        b,
        {
            id: e,
        },
        a,
        EDPZ
    );
},
*/ // same thing here
	ChangePosition(c, a) {
		var b = c.childNodes[1];
		a
			? SetStyle(b, {
					clip: "rect(84px,auto,auto,auto)",
					top: "-84px",
				})
			: SetStyle(b, {
					clip: "rect(auto,auto,84px,auto)",
					top: 0,
				});
	},
	PrivateBirth(a) {
		var b = GetX(a.C);
		oSym.addTask(
			500,
			function (f, d, c, e) {
				$P[f] &&
					(a.ChangePosition($(f), 0),
					oSym.addTask(
						100,
						(k, h, g, j, i) => {
							AppearSun(Math.floor(h + Math.random() * 21), j, 25, 0),
								AppearSun(Math.floor(g + Math.random() * 21), j, 25, 0),
								oSym.addTask(
									100,
									(l) => {
										$P[l] && a.ChangePosition($(l), 0);
									},
									[k]
								),
								oSym.addTask(2400, i, [k, h, g, j]);
						},
						[f, d, c, e, arguments.callee]
					));
			},
			[a.id, b - 40, b - 20, GetY(a.R)]
		);
	},
});
var oPumpkinHead = InheritO(CPlants, {
	EName: "oPumpkinHead",
	CName: "Pumpkin",
	width: 97,
	height: 67,
	beAttackedPointL: 15,
	beAttackedPointR: 82,
	SunNum: 125,
	PKind: 2,
	HP: 4e3,
	coolTime: 30,
	zIndex: 1,
	PicArr: [
		"images/Card/Plants/PumpkinHead.png",
		"images/Plants/PumpkinHead/0.gif",
		"images/Plants/PumpkinHead/PumpkinHead.gif",
		"images/Plants/PumpkinHead/PumpkinHead1.gif",
		"images/Plants/PumpkinHead/PumpkinHead2.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage1.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage2.gif",
		"images/Plants/PumpkinHead/Pumpkin_back.gif",
	],
	Tooltip: "Protects plants that are within its shell",
	Produce:
		'<font color="#28325A">Pumpkins protect plants that are within their shells.</font><p>Toughness: <font color="#CC241D">high</font><br>Special: <font color="#CC241D">can be planted over another plant</font></p>Pumpkin hasn\'t heard from his cousin Renfield lately. Apparently Renfield\'s a big star, some kind of... what was it... sports hero? Peggle Master? Pumpkin doesn\'t really get it. He just does his job.',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return c[2] ? 1 : oGd.$LF[b] === 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
	},
	GetDY(b, c, a) {
		return a[0] ? -12 : -5;
	},
	HurtStatus: 0,
	getHurt(e, c, b) {
		var d = this;
		var f = d.id;
		var a = $(f);
		switch (true) {
			case c && c < 3:
				d.Die(1);
				break;
			case (d.HP -= b) < 1:
				d.Die();
				break;
			case d.HP < 1334:
				d.HurtStatus < 2 && ((d.HurtStatus = 2), (a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage2.gif"));
				break;
			case d.HP < 2667:
				d.HurtStatus < 1 &&
					((d.HurtStatus = 1),
					(a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage1.gif"),
					($(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif"));
		}
	},
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
		NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_2"));
	},
});
var oSeedPumpkinHead = InheritO(CPlants, {
	EName: "oSeedPumpkinHead",
	CName: "Pumpkin",
	width: 97,
	height: 67,
	beAttackedPointL: 15,
	beAttackedPointR: 82,
	SunNum: 0,
	PKind: 2,
	HP: 4e3,
	coolTime: 30,
	zIndex: 1,
	PicArr: [
		"images/Card/Plants/PumpkinHead.png",
		"images/Plants/PumpkinHead/0.gif",
		"images/Plants/PumpkinHead/PumpkinHead.gif",
		"images/Plants/PumpkinHead/PumpkinHead1.gif",
		"images/Plants/PumpkinHead/PumpkinHead2.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage1.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage2.gif",
		"images/Plants/PumpkinHead/Pumpkin_back.gif",
	],
	Tooltip: "Protects plants that are within its shell",
	Produce:
		'Pumpkin head, can use his shell to protect other plants.<p>Toughness:<font color="#CC241D">high</font><br>Features:<font color="#CC241D">可以种在其他植物上</font></p>Pumpkin head hasnt been received recently, about his cousin Resfield</font><br>information. Clearly, Renfield is a big star, a kind of...</font><br>What is a sports star called...? Pegg jump ball big</font><br>division? Pumpkin Head doesnt understand what exercise is anyway, he just wants to do well</font><br>his own work.',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return c[2] ? 1 : oGd.$LF[b] === 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
	},
	GetDY(b, c, a) {
		return a[0] ? -12 : -5;
	},
	HurtStatus: 0,
	getHurt(e, c, b) {
		var d = this;
		var f = d.id;
		var a = $(f);
		switch (true) {
			case c && c < 3:
				d.Die(1);
				break;
			case (d.HP -= b) < 1:
				d.Die();
				break;
			case d.HP < 1334:
				d.HurtStatus < 2 && ((d.HurtStatus = 2), (a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage2.gif"));
				break;
			case d.HP < 2667:
				d.HurtStatus < 1 &&
					((d.HurtStatus = 1),
					(a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage1.gif"),
					($(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif"));
		}
	},
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
		NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_2"));
	},
});
var oFlowerPot = InheritO(CPlants, {
	EName: "oFlowerPot",
	CName: "Flower Pot",
	width: 72,
	height: 68,
	beAttackedPointR: 52,
	SunNum: 25,
	BookHandBack: 6,
	HP: 1e3,
	PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
	PKind: 0,
	Stature: -1,
	GetDY(b, c, a) {
		return 6;
	},
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	Tooltip: "Lets you plant on the roof",
	Produce:
		'<font color="#28325A">Flower Pots let you plant on the roof.</font><p>Special: <font color="#CC241D">allows you to plant on the roof</font></p>"I\'m a pot for planting. Yet I\'m also a plant. HAS YOUR MIND EXPLODED YET?"',
	InitTrigger() {},
});
var oCFlowerPot = InheritO(oFlowerPot, {
	EName: "oCFlowerPot",
	PicArr: ["images/Card/Plants/CFlowerPot.png", "images/Plants/FlowerPot/C/0.gif", "images/Plants/FlowerPot/C/CFlowerPot.gif"],
	Produce: "Allows plants to be planted on tiled terrain.</font></p>Celadon flower pot, no introduction needed",
});
var oLilyPad = InheritO(oFlowerPot, {
	BookHandBack: 4.9,
	Stature: -1,
	EName: "oLilyPad",
	CName: "LilyPad",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	//     HP: 1e3,
	PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
	getShadow(a) {
		return "left:-8px;top:25px";
	},
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	Tooltip: "Lilypads allow you to grow non-aquatic plants on them。",
	Produce:
		'<font color="#28325A">Lily pads let you plant non-aquatic plants on top of them.</font><p>Special: <font color="#CC241D">non-aquatic plants can be planted on top of it</font><br><font color="#0ca1db">Must be planted in water</font></p>Lily Pad never complains. Lily Pad never wants to know what\'s going on. Put a plant on top of Lily Pad, he won\'t say a thing. Does he have startling opinions or shocking secrets? Nobody knows. Lily Pad keeps it all inside.',
});
var oSeedLilyPad = InheritO(oFlowerPot, {
	BookHandBack: 4.9,
	Stature: -1,
	EName: "oSeedLilyPad",
	CName: "LilyPad",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	//     HP: 1e3,
	PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
	getShadow(a) {
		return "left:-8px;top:25px";
	},
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	Tooltip: "Lilypads allow you to grow non-aquatic plants on them。",
	Produce:
		'Lilypads allow you to grow non-aquatic plants on top of them。<p>Features:<font color="#CC241D">Non-aquatic plants can be planted on it<br>Must be planted on water</font></p>Lilypad never complains, it never wants to know what happened</font><br> Plant a plant on it and it wont say anything.</font><br>，Does it have any surprising ideas or terrible secrets?？</font><br>Lotus Ye buries all these inside of her heart。',
});
var oILilyPad = InheritO(oFlowerPot, {
	BookHandBack: 4.9,
	Stature: -2,
	EName: "oILilyPad",
	CName: "LilyPad",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	HP: 1e3,
	PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
	getShadow(a) {
		return "left:-8px;top:25px";
	},
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	Tooltip: "Lilypads allow you to grow non-aquatic plants on them。",
	Produce:
		'Lilypads allow you to grow non-aquatic plants on top of them。<p>Features:<font color="#CC241D">Non-aquatic plants can be planted on it<br>Must be planted on water</font></p>Lilypad never complains, it never wants to know what happened</font><br> Plant a plant on it and it wont say anything.</font><br>，Does it have any surprising ideas or terrible secrets?？</font><br>Lotus Ye buries all these inside of her heart。',
});
var oLilyPad1 = InheritO(oLilyPad, {
	EName: "oLilyPad1",
});
var oPotatoMine = InheritO(CPlants, {
	EName: "oPotatoMine",
	CName: "Potato Mine",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 25,
	coolTime: 30,
	Stature: -1,
	HP: 1e3,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	PicArr: [
		"images/Card/Plants/PotatoMine.png",
		"images/Plants/PotatoMine/0.gif",
		"images/Plants/PotatoMine/PotatoMine.gif",
		"images/Plants/PotatoMine/PotatoMineNotReady.gif",
		"images/Plants/PotatoMine/PotatoMine_mashed.gif",
		"images/Plants/PotatoMine/ExplosionSpudow.gif",
	],
	Tooltip: "Explodes on contact, but takes time to arm itself",
	Produce:
		'<font color="#28325A">Potato Mines pack a powerful punch, but they need a while to arm themselves. You should plant them ahead of zombies. They will explode on contact.</font><p>Damage: <font color="CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a small area</font><br>Usage: <font color="#CC241D">single use, delayed activation</font></p>Some folks say Potato Mine is lazy, that he leaves everything to the last minute. Potato Mine says nothing. He\'s too busy thinking about his investment strategy.',
	Status: 0,
	AudioArr: ["potato_mine"],
	canTrigger: 0,
	BirthStyle(d, e, c, b, a) {
		c.childNodes[1].src = !a
			? "images/Plants/PotatoMine/PotatoMineNotReady.gif"
			: (~(function () {
					d.Status = 1;
					d.canTrigger = 1;
					d.getHurt = d.getHurt2;
				})(),
				"images/Plants/PotatoMine/PotatoMine.gif");
		EditEle(
			c,
			{
				id: e,
			},
			b,
			EDPZ
		);
	},
	getHurt2(d, b, a) {
		var c = this;
		b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
	},
	PrivateBirth(b, a) {
		!a &&
			oSym.addTask(
				1500,
				(d) => {
					var c = $P[d];
					c && (($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif"), (c.Status = 1), (c.canTrigger = 1), (c.getHurt = c.getHurt2));
				},
				[b.id]
			);
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	TriggerCheck(e, c) {
		var a = this.R;
		var b = this.C;
		e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
	},
	NormalAttack(j, h, e) {
		var g = this;
		var b = g.id;
		var d = $(b);
		var c = oZ.getArZ(j, h, e);
		var f = c.length;
		var a;
		while (f--) {
			(a = c[f]).Altitude < 2 && a.getThump();
		}
		g.Die(1);
		PlayAudio("potato_mine");
		EditEle(
			d.childNodes[1],
			{
				src: "images/Plants/PotatoMine/PotatoMine_mashed.gif",
			},
			{
				width: "132px",
				height: "93px",
				left: "-40px",
				top: "-20px",
			}
		);
		if (d.childNodes[1].classList.contains("cardboard")) {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d).classList.add("cardboard");
		} else {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
		}
		oSym.addTask(
			200,
			(i) => {
				ClearChild(i.lastChild);
				oSym.addTask(100, ClearChild, [i]);
			},
			[d]
		);
	},
});
var oSeedPotatoMine = InheritO(CPlants, {
	EName: "oSeedPotatoMine",
	CName: "Potato Mine",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 0,
	coolTime: 30,
	Stature: -1,
	HP: 1e3,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	PicArr: [
		"images/Card/Plants/PotatoMine.png",
		"images/Plants/PotatoMine/0.gif",
		"images/Plants/PotatoMine/PotatoMine.gif",
		"images/Plants/PotatoMine/PotatoMineNotReady.gif",
		"images/Plants/PotatoMine/PotatoMine_mashed.gif",
		"images/Plants/PotatoMine/ExplosionSpudow.gif",
	],
	Tooltip: "Explodes on contact, but takes time to arm itself",
	Produce:
		'Potato mines are powerful, but they take time</font><br>to arm yourself. You should plant them in the way of zombies</font><br>, which explode when they are touched.<p>Harm:<font color="CC241D">huge</font><br>Scope:<font color="#CC241D">All zombies in a small area</font><br>Instructions:<font color="#CC241D">It takes some preparation time to use alone.</font></p>Some people say Potato Ray is lazy because he always puts everything</font><br>Save for last. Tudou Lei didnt have time to talk to them, he was busy with exams</font><br>Consider his investment strategy.',
	Status: 0,
	AudioArr: ["potato_mine"],
	canTrigger: 0,
	BirthStyle(d, e, c, b, a) {
		c.childNodes[1].src = !a
			? "images/Plants/PotatoMine/PotatoMineNotReady.gif"
			: (~(function () {
					d.Status = 1;
					d.canTrigger = 1;
					d.getHurt = d.getHurt2;
				})(),
				"images/Plants/PotatoMine/PotatoMine.gif");
		EditEle(
			c,
			{
				id: e,
			},
			b,
			EDPZ
		);
	},
	getHurt2(d, b, a) {
		var c = this;
		b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
	},
	PrivateBirth(b, a) {
		!a &&
			oSym.addTask(
				1500,
				(d) => {
					var c = $P[d];
					c && (($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif"), (c.Status = 1), (c.canTrigger = 1), (c.getHurt = c.getHurt2));
				},
				[b.id]
			);
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	TriggerCheck(e, c) {
		var a = this.R;
		var b = this.C;
		e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
	},
	NormalAttack(j, h, e) {
		var g = this;
		var b = g.id;
		var d = $(b);
		var c = oZ.getArZ(j, h, e);
		var f = c.length;
		var a;
		while (f--) {
			(a = c[f]).Altitude < 2 && a.getThump();
		}
		g.Die(1);
		PlayAudio("potato_mine");
		EditEle(
			d.childNodes[1],
			{
				src: "images/Plants/PotatoMine/PotatoMine_mashed.gif",
			},
			{
				width: "132px",
				height: "93px",
				left: "-40px",
				top: "-20px",
			}
		);
		NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
		oSym.addTask(
			200,
			(i) => {
				ClearChild(i.lastChild);
				oSym.addTask(100, ClearChild, [i]);
			},
			[d]
		);
	},
});
var oIPotatoMine = InheritO(CPlants, {
	EName: "oIPotatoMine",
	CName: "Potato Mine",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 25,
	coolTime: 1,
	Stature: -1,
	HP: 13,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	PicArr: [
		"images/Card/Plants/PotatoMine.png",
		"images/Plants/PotatoMine/0.gif",
		"images/Plants/PotatoMine/PotatoMine.gif",
		"images/Plants/PotatoMine/PotatoMineNotReady.gif",
		"images/Plants/PotatoMine/PotatoMine_mashed.gif",
		"images/Plants/PotatoMine/ExplosionSpudow.gif",
	],
	Tooltip: "Explodes on contact, but takes time to arm itself",
	Produce:
		'Potato mines are powerful, but they take time</font><br>to arm yourself. You should plant them in the way of zombies</font><br>, which explode when they are touched.<p>Harm:<font color="CC241D">huge</font><br>Scope:<font color="#CC241D">All zombies in a small area</font><br>Instructions:<font color="#CC241D">It takes some preparation time to use alone.</font></p>Some people say Potato Ray is lazy because he always puts everything</font><br>Save for last. Tudou Lei didnt have time to talk to them, he was busy with exams</font><br>Consider his investment strategy.',
	Status: 0,
	AudioArr: ["potato_mine"],
	canTrigger: 0,
	BirthStyle(d, e, c, b, a) {
		c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMine.gif" : (d.Status = 1);
		d.canTrigger = 1;
		d.getHurt = d.getHurt2;
		EditEle(
			c,
			{
				id: e,
			},
			b,
			EDPZ
		);
	},
	getHurt2(d, b, a) {
		var c = this;
		b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
	},
	PrivateBirth(b, a) {
		!a &&
			oSym.addTask(
				1500,
				(d) => {
					var c = $P[d];
					c && (($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif"), (c.Status = 1), (c.canTrigger = 1), (c.getHurt = c.getHurt2));
				},
				[b.id]
			);
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	TriggerCheck(e, c) {
		var a = this.R;
		var b = this.C;
		e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
	},
	NormalAttack(j, h, e) {
		var g = this;
		var b = g.id;
		var d = $(b);
		var c = oZ.getArZ(j, h, e);
		var f = c.length;
		var a;
		while (f--) {
			(a = c[f]).Altitude < 2 && a.getThump();
		}
		g.Die(1);
		PlayAudio("potato_mine");
		EditEle(
			d.childNodes[1],
			{
				src: "images/Plants/PotatoMine/PotatoMine_mashed.gif",
			},
			{
				width: "132px",
				height: "93px",
				left: "-40px",
				top: "-20px",
			}
		);
		if (d.childNodes[1].classList.contains("cardboard")) {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d).classList.add("cardboard");
		} else {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
		}
		oSym.addTask(
			200,
			(i) => {
				ClearChild(i.lastChild);
				oSym.addTask(100, ClearChild, [i]);
			},
			[d]
		);
	},
});
var oTorchwood = InheritO(CPlants, {
	EName: "oTorchwood",
	CName: "Torchwood",
	width: 73,
	height: 83,
	beAttackedPointR: 53,
	SunNum: 175,
	PicArr: [
		"images/Card/Plants/Torchwood.png",
		"images/Plants/Torchwood/0.gif",
		"images/Plants/Torchwood/Torchwood.gif",
		"images/Plants/PB00.png",
		"images/Plants/PB01.png",
		"images/Plants/PB10.webp",
		"images/Plants/PB11.webp",
		"images/Plants/Torchwood/SputteringFire.gif",
	],
	AudioArr: ["firepea", "ignite", "ignite2"],
	Tooltip: "Peas that pass through it turn into fireballs",
	Produce:
		'<font color="#28325A">Torchwoods turn peas that pass through them into fireballs that deal twice as much damage.</font><p>Special: <font color="#CC241D">doubles the damage of peas that pass through it.  Fireballs deal damage to nearby zombies on impact</font><p>Everybody likes and respects Torchwood. They like him for his integrity, for his steadfast friendship, for his ability to greatly maximize pea damage. But Torchwood has a secret: he can\'t read.',
	PrivateBirth(c) {
		var a = c.R;
		var b = c.C;
		oGd.$Torch[a + "_" + b] = c.id;
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
	},
	InitTrigger() {},
	PrivateDie(c) {
		var a = c.R;
		var b = c.C;
		delete oGd.$Torch[a + "_" + b];
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/FireBulletHit.webp"),
						oSym.addTask(75, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oSeedTorchwood = InheritO(CPlants, {
	EName: "oSeedTorchwood",
	CName: "Torchwood",
	width: 73,
	height: 83,
	beAttackedPointR: 53,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Torchwood.png",
		"images/Plants/Torchwood/0.gif",
		"images/Plants/Torchwood/Torchwood.gif",
		"images/Plants/PB00.png",
		"images/Plants/PB01.png",
		"images/Plants/PB10.webp",
		"images/Plants/PB11.webp",
		"images/Plants/Torchwood/SputteringFire.gif",
	],
	AudioArr: ["firepea", "ignite", "ignite2"],
	Tooltip: "Peas that pass through it turn into fireballs",
	Produce:
		'Torch Stump can turn peas that pass through him into fireballs, causing</font><br>Double damage.<p>Features:<font color="#CC241D">Causes fireballs that pass through him to deal double damage. fireball also</font><br>against nearby zombies</font><br>Deals splash damage</font></p>Everyone loves and respects torch stumps. they like his</font><br>Honest and steadfast friendship, and the ability to increase pea damage.</font><br>But he also has his own secret: he cant read!',
	PrivateBirth(c) {
		var a = c.R;
		var b = c.C;
		oGd.$Torch[a + "_" + b] = c.id;
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
	},
	InitTrigger() {},
	PrivateDie(c) {
		var a = c.R;
		var b = c.C;
		delete oGd.$Torch[a + "_" + b];
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function (f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/FireBulletHit.webp"),
						oSym.addTask(75, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
var oWallNut = InheritO(CPlants, {
	EName: "oWallNut",
	CName: "Wall-Nut",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: 50,
	coolTime: 15.5,
	HP: 4e3,
	PicArr: [
		"images/Card/Plants/WallNut.png",
		"images/Plants/WallNut/0.webp",
		"images/Plants/WallNut/WallNut.webp",
		"images/Plants/WallNut/Wallnut_cracked1.webp",
		"images/Plants/WallNut/Wallnut_cracked2.webp",
	],
	Tooltip: "Blocks off zombies and protects your other plants",
	Produce:
		'<font color="#28325A">Wall-nuts have hard shells which you can use to protect your other plants.</font><p>Toughness: <font color="CC241D">high</font></p>"People wonder how I feel about getting constantly chewed on by zombies," says Wall-nut. "What they don\'t realize is that with my limited senses all I can feel is a kind of tingling, like a relaxing back rub."',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oWallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/WallNut/Wallnut_cracked2.webp"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/WallNut/Wallnut_cracked1.webp"))
			: c.Die(1);
	},
});
var oSeedWallNut = InheritO(CPlants, {
	EName: "oSeedWallNut",
	CName: "Wall-Nut",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: 0,
	coolTime: 15.5,
	HP: 4e3,
	PicArr: [
		"images/Card/Plants/WallNut.png",
		"images/Plants/WallNut/0.webp",
		"images/Plants/WallNut/WallNut.webp",
		"images/Plants/WallNut/Wallnut_cracked1.webp",
		"images/Plants/WallNut/Wallnut_cracked2.webp",
	],
	Tooltip: "Blocks off zombies and protects your other plants",
	Produce:
		'Nut Walls are tough enough for you to use to protect other plants</font><br>shell.<p>Toughness:<font color="CC241D">high</font></p>Wall of Nuts: People want to know what its like to be constantly gnawed by zombies</font><br>how? They dont know that my limited senses can only let me</font><br>Feel a tingling, like, relaxing back massage. "',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oWallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/WallNut/Wallnut_cracked2.webp"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/WallNut/Wallnut_cracked1.webp"))
			: c.Die(1);
	},
});
var oBalloon = InheritO(CPlants, {
	EName: "oBalloon",
	CName: "Balloonatic",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: "+75",
	coolTime: "Wave",
	HP: 1,
	PicArr: ["images/Card/Plants/BalloonGoober.png", "images/Zombies/Balloon/0.png", "images/Zombies/Balloon/popped.png"],
	Tooltip: "goober",
	Produce:
		'<font color="#28325A">Balloonatics have a chance to spawn every wave. Popping them produces 75 sun</font>.</font><br><p>Toughness: <font color="CC241D">low</font></p> ">:3" says the Balloonatic. ">:3" says the Balloonatic, again.',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oBalloon"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Card/Plants/BalloonGoober.png"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Zombies/Balloon/popped.png"))
			: c.Die(1);
	},
});
var oCattail = InheritO(oPeashooter, {
	EName: "oCattail",
	CName: "Cattail",
	width: 190,
	height: 90,
	beAttackedPointR: 100,
	SunNum: 225,
	coolTime: 50,
	AttackGif: 5,
	Attack: 20,
	BookHandBack: 4.9,
	getTriggerRange(a, b, c) {
		return [[0, oS.W, 0]];
	},
	getTriggerR(a) {
		return [1, oS.R];
	},
	InitTrigger(c, b, f, a, h, g) {
		var j = {};
		var i = c.getTriggerR(f);
		var e = i[0];
		var d = i[1];
		do {
			oT.add(e, (j[e] = c.getTriggerRange(e, h, g)), b);
		} while (e++ !== d);
		c.oTrigger = j;
	},
	getShadow(a) {
		return "display:none";
	},
	AudioArr: ["CabbageAttack1", "CabbageAttack2"],
	PicArr: (function () {
		var a = "images/Plants/Cattail/";
		return [
			"images/Card/Plants/Catttail.png",
			a + "0.gif",
			a + "cat.gif",
			"images/Plants/Cactus/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png",
			"images/interface/blank.png",
			a + "Attack.gif",
		];
	})(),
	Tooltip: 'Attacks any lane and shoots down balloon zombies <p> <font color="red">(requires lily pad)</font>',
	// another cool comment
	Produce:
		'<font color="#28325A">Cattails can attack any lane and shoot down balloon zombies too.</font><p>Must be planted on lily pads</p>"Woof!" says Cattail. "Woof woof woof! Does this confuse you? Do you expect me to say \'Meow\' like a cat just because the word \'cat\' is in my name and I also look like a cat? That\'s not how things work around here. I refuse to be pigeonholed."',
	TriggerCheck(b, a) {
		this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CanGrow(b, a, d) {
		var c = b[0];
		if (!b[1] && c && c.EName === "oLilyPad") {
			return 1;
		}
		return 0;
	},
	AttackCheck2(c) {
		var b = c.Altitude;
		return b === 1;
	},
	AttackCheckZ() {
		//查找僵尸
		var self = this;
		var z;
		var otarget;
		var llen;
		var lastx;
		var Target = -1;
		for (z in $Z) {
			otarget = $Z[z];
			if ((otarget.Altitude <= 0) | (otarget.PZ === 0)) {
				continue;
			}
			if (Target === -1 && otarget.Altitude > 0) {
				Target = otarget;
				continue;
			}
			llen = self.Plength1(self, otarget);
			if (otarget.Altitude === Target.Altitude && otarget.Altitude > 2 && llen < self.Plength1(self, Target)) {
				Target = otarget;
			} else {
				if (Target.Altitude > 2) {
					continue;
				}
				if (otarget.Altitude > 2) {
					Target = otarget;
				}
				if (llen < self.Plength1(self, Target)) {
					Target = otarget;
				}
			}
		}

		return Target;
	},
	Plength1(pid, zid) {
		//计算僵尸和磁力菇之间的距离 blehhhh :P
		var chang = Math.abs(zid.R - pid.R) * 100;
		var kuan = Math.abs(zid.X - GetX(pid.C));
		return Math.sqrt(chang * chang + kuan * kuan) + Math.abs(zid.R - pid.R) * 3;
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.pixelLeft + 50) + "px;top:" + (a.pixelTop + 10) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
		var p;
		var oBalloon;
		var self = a;
		for (p in $P) {
			oBalloon = $P[p];
			if (oBalloon.R === self.R && self.C === oBalloon.C && oBalloon.EName === "oLilyPad") {
				oBalloon.Die();
				break;
			}
		}
	},
	one(p1, p2, t) {
		return p1 * (1 - t) + p2 * t;
	},
	CheckLoop(zid, direction) {
		var self = this;
		var pid = self.id;
		if ($P[pid]) {
			self.NormalAttack(zid, 0);
			oSym.addTask(50 + 90 + 90, (_) => {
				$P[pid] && self.AttackCheck1(zid, direction);
			});
			oSym.addTask(90, (_) => {
				$P[pid] && self.NormalAttack(zid, 1);
			});
		}
	},
	HitZombie(zombieTarget, self) {
		if (zombieTarget.Altitude === 3) {
			zombieTarget.getPea(zombieTarget, 20);
			zombieTarget.Drop();
		} else {
			zombieTarget.getPea(zombieTarget, 0);
			zombieTarget.getHit2(zombieTarget, 20);
		}
	},
	AttackAnim(ele, self) {
		ele.childNodes[1].src = self.PicArr[self.AttackGif] + "?" + this.id;
	},
	getAngle(x, y, lastX, lastY) {
		return (180 / Math.PI) * Math.atan2(y - lastY, x - lastX);
	},
	catlen(x, y, last) {
		var ac = Math.abs(x - last[0]);
		var bc = Math.abs(y - last[1]);
		var ab = Math.sqrt(ac * ac, bc * bc) * 0.6;
		return ab;
	},
	NormalAttack(zid, fu) {
		var self = this;
		var ele = $(self.id);
		var zombieTarget = self.AttackCheckZ();
		if (zombieTarget === -1) {
			return;
		}
		if (!$Z[zombieTarget.id]) {
			return;
		}
		if (!$P[self.id]) {
			return;
		}
		var bullet = EditEle(
			self.BulletEle.cloneNode(false),
			{
				id: "CB" + Math.random(),
			},
			0,
			EDPZ
		);
		//alert(bullet);
		self.AttackAnim(ele, self);
		if (fu) {
			oSym.addTask(120, (_) => $P[self.id] && (ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id));
		}
		oSym.addTask(85, (_) => {
			//PlayAudio(self.AudioArr.slice(0, 2).random());
			if (!$P[self.id]) {
				return;
			}
			if (!$Z[zombieTarget.id]) {
				ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
				return;
			}
			SetVisible(bullet);
			var x = self.pixelLeft + 80;
			var y = self.pixelTop + 10;
			var x1 = x;
			var y1 = y;
			var zomRelativePos = zombieTarget.HeadPosition[zombieTarget.isAttacking]
				? zombieTarget.HeadPosition[zombieTarget.isAttacking]
				: zombieTarget.HeadPosition[0];
			var s =
				Number.parseInt(zombieTarget.Ele.style.left) +
				zomRelativePos.x -
				10 -
				x -
				!zombieTarget.isAttacking * zombieTarget.Speed * zombieTarget.DeltaDirectionSpeed[zombieTarget.FangXiang] * 10 * 1;
			var y3 = Number.parseInt(zombieTarget.Ele.style.top) + zomRelativePos.y + 20;
			var time = 1;
			var f = 0;
			var gravity = 0.2;
			var vy = -10;
			var vx = -(gravity * s) / (2 * vy);
			var x2 = x + 40;
			var y2 = y - 10;
			var last = [x, y];
			var defAngle = self.getAngle(x + vx, y + vy + gravity, last[0], last[1]);
			var x3 = x + s;
			var t = 0;
			var ws = 100;
			var fum = 0;
			(function drawFrame() {
				if (fum === 0) {
					x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
					y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
					var ab = self.catlen(x, y, last);
					while (t < ws / 2 && ab < 1.5) {
						t++;
						x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
						y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
						ab = self.catlen(x, y, last);
					}
					bullet.style.left = x + "px";
					bullet.style.top = y + "px";
					bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
					t++;

					if (t >= ws + 1) {
						bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
						$Z[zombieTarget.id] && self.HitZombie(zombieTarget, self);

						return;
					}

					if (!$Z[zombieTarget.id]) {
						fum = 1;
						ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
						oSym.addTask(1, drawFrame);
					} else {
						oSym.addTask(ab * 0.4, drawFrame);
					}
				} else {
					(function drawFrame() {
						if (fum === 1) {
							x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
							y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
							var ab = self.catlen(x, y, last);
							while (t < ws / 2 && ab < 1.5) {
								t++;
								x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
								y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
								ab = self.catlen(x, y, last);
							}
							bullet.style.left = x + "px";
							bullet.style.top = y + "px";
							bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
							t++;

							if (t >= ws + 1) {
								bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
								$Z[zombieTarget.id] && self.HitZombie(zombieTarget, self);

								return;
							}

							if (!$Z[zombieTarget.id]) {
								fum = 1;
								ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
								oSym.addTask(1, drawFrame);
							} else {
								oSym.addTask(ab * 0.4, drawFrame);
							}
						} else {
							bullet.style.left = (x -= 3) + "px";
							bullet.style.top = (y -= 3) + "px";
							bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
							if (x <= 0 || y <= 0) {
								bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
								return;
							}
							oSym.addTask(1, drawFrame);
						}
						last = [x, y];
					})();
				}
				last = [x, y];
			})();
		});
	},
});
var oLing = InheritO(oWallNut, {
	EName: "oLing",
	CName: "Water-nut",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	BookHandBack: 4.9,
	HP: 1e4,
	getShadow(a) {
		return "display:none";
	},
	PicArr: ["images/Card/Plants/Ling.png", "images/Plants/Ling/0.gif", "images/Plants/Ling/Ling.gif"],
	Tooltip: "Nanhu Ling is the first obstacle in the water",
	Produce:
		'Nanhu Ling is the first obstacle in the water<p>Toughness:<font color="CC241D">high</font></p>Look, how big is a cashew nut?</font><br>He said, but he didnt care. In Nanhulings head, every day only</font><br>think about one thing"If Qianlong didnt open the golden mouth, I wouldnt be able to use it</font><br>Horn to stab zombies? !"',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Ling/Ling.gif"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Ling/Ling.gif"))
			: c.Die(1);
	},
});
var oNutBowling = InheritO(CPlants, {
	EName: "oNutBowling",
	CName: "Wall-nut",
	width: 71,
	height: 71,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 0,
	HP: 4e3,
	coolTime: 0,
	canEat: 0,
	Tooltip: "",
	PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.webp", "images/Plants/WallNut/WallNut.webp"],
	AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
	Produce: "",
	CanAttack: 1,
	InitTrigger() {},
	getHurt() {},
	CanGrow(d, e, f) {
		return true;
	},
	NormalAttack: null,
	PrivateBirth(c) {
		var d = $(c.id);
		PlayAudio("bowling");
		EditEle(d.childNodes[1], {
			style: `animation: wallnutSpin ${0.75 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		(function (z, y, q, r, p, x, e, g, b) {
			var a = z.R;
			var l = z.C;
			var A;
			var u;
			var s;
			var v = 0;
			var w;
			var i;
			var t = false;
			if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
				u = A.id;
				PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
				switch (A.Ornaments) {
					case 0:
						A.NormalDie();
						break;
					case 1:
						A.getHit0(A, Math.min(A.OrnHP, 900), 0);
						break;
					default:
						z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
				}
				z.CanAttack = 0;
				switch (a) {
					case oS.R:
						e = -1;
						break;
					case 1:
						e = 1;
						break;
					default:
						switch (e) {
							case 1:
								e = -1;
								break;
							case -1:
								e = 1;
								break;
							default:
								e = Math.random() > 0.5 ? 1 : -1;
						}
				}
				oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
			} else {
				switch (e) {
					case 1:
						z.pixelBottom + 2 > b && (e = -1);
						break;
					case -1:
						z.pixelBottom - 2 < g && (e = 1);
						break;
				}
				q > y
					? z.Die()
					: ((i = GetC((z.pixelRight += 2))),
						(z.AttackedLX = q += 2),
						(z.AttackedRX = r += 2),
						(w = GetR((z.pixelBottom += e * 2))),
						SetStyle(x, {
							left: (z.pixelLeft = p += 2) + "px",
							top: (z.pixelTop += e * 2) + "px",
						}),
						w !== a && ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
						i !== l && ((z.C = i), (t = true)),
						t &&
							(oGd.del({
								R: a,
								C: l,
								PKind: 1,
							}),
							oGd.add(z, w + "_" + i + "_1")),
						oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
			}
		})(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
	},
});
var oHugeNutBowling = InheritO(oNutBowling, {
	EName: "oHugeNutBowling",
	CName: "Giant Wall-nut",
	width: 142,
	height: 142,
	beAttackedPointL: 5,
	beAttackedPointR: 137,
	HP: 8e3,
	Stature: 1,
	PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.webp", "images/Plants/WallNut/2.webp"],
	PrivateBirth(a) {
		PlayAudio("bowling");
		EditEle($(a.id).childNodes[1], {
			style: `animation: hugeWallnutSpin ${1.25 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		(function (b, c, n, m, e, g) {
			var d = oZ.getArZ(n, m, e);
			var f = d.length;
			var k;
			var j;
			var l = b.R;
			var h = b.C;
			while (f--) {
				(k = d[f]).getCrushed(b) && k.CrushDie();
			}
			n > c
				? b.Die()
				: ((j = GetC((b.pixelRight += 2))),
					(b.AttackedLX = n += 2),
					(b.AttackedRX = m += 2),
					(g.style.left = (b.pixelLeft += 2) + "px"),
					j !== h &&
						((b.C = j),
						oGd.del({
							R: l,
							C: h,
							PKind: 1,
						}),
						oGd.add(b, l + "_" + j + "_1")),
					oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]));
		})(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
var oBoomNutBowling = InheritO(oNutBowling, {
	EName: "oBoomNutBowling",
	CName: "Explode-o-nut",
	PicArr: [
		"images/Card/Plants/BoomWallNut.png",
		"images/Plants/WallNut/1.gif",
		"images/Plants/WallNut/BoomWallNut.webp",
		"images/Plants/CherryBomb/Boom.gif",
	],
	AudioArr: ["cherrybomb", "bowling"],
	PrivateBirth(a) {
		PlayAudio("bowling");
		EditEle($(a.id).childNodes[1], {
			style: `animation: wallnutSpin ${0.75 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		(function (s, q, b, c, m) {
			var v = s.R;
			var p = s.C;
			var t;
			var l;
			if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
				var j = v > 2 ? v - 1 : 1;
				var g = v < oS.R ? v + 1 : oS.R;
				var u = s.pixelLeft - 80;
				var r = s.pixelLeft + 160;
				var e;
				var k;
				EditEle($(a.id).childNodes[1], {
					style: "",
				});
				PlayAudio("cherrybomb");
				do {
					k = (e = oZ.getArZ(u, r, j)).length;
					while (k--) {
						e[k].ExplosionDie();
					}
				} while (j++ < g);
				s.Die(1);
				EditEle(
					m.childNodes[1],
					{
						src: "images/Plants/CherryBomb/Boom.gif",
					},
					{
						width: "213px",
						height: "160px",
						left: "-50px",
						top: "-30px",
					}
				);
				oSym.addTask(65, ClearChild, [m]);
			} else {
				b > q
					? s.Die()
					: ((l = GetC((s.pixelRight += 2))),
						(s.AttackedLX = b += 2),
						(s.AttackedRX = c += 2),
						SetStyle(m, {
							left: (s.pixelLeft += 2) + "px",
						}),
						l !== p &&
							((s.C = l),
							oGd.del({
								R: v,
								C: p,
								PKind: 1,
							}),
							oGd.add(s, v + "_" + l + "_1")),
						oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]));
			}
		})(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id));
	},
});
var oTallNut = InheritO(oWallNut, {
	EName: "oTallNut",
	CName: "Tall-nut",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 125,
	HP: 8e3,
	coolTime: 24.5,
	PicArr: [
		"images/Card/Plants/TallNut.png",
		"images/Plants/TallNut/0.gif",
		"images/Plants/TallNut/TallNut.gif",
		"images/Plants/TallNut/TallnutCracked1.gif",
		"images/Plants/TallNut/TallnutCracked2.gif",
	],
	Tooltip: "Heavy-duty wall that can't be vaulted over",
	Produce:
		'<font color="#28325A">Tall-nuts are heavy-duty wall plants that can\'t be vaulted over.</font><p>Toughness: <font color="#CC241D">very high</font><br>Special: <font color="#CC241D">can\'t be vaulted or jumped over</font><p>People wonder if there\'s a rivalry between Wall-nut and Tall-nut. Tall-nut laughs a rich, baritone laugh. "How could there be anything between us? We are brothers. If you knew what Wall-nut has done for me..." Tall-nut\'s voice trails off and he smiles knowingly.',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oTallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	Stature: 1,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 2667
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/TallNut/TallnutCracked2.gif"))
					: c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/TallNut/TallnutCracked1.gif"))
			: c.Die(1);
	},
});
var oSeedTallNut = InheritO(oWallNut, {
	EName: "oSeedTallNut",
	CName: "Tall-nut",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 0,
	HP: 8e3,
	coolTime: 24.5,
	PicArr: [
		"images/Card/Plants/TallNut.png",
		"images/Plants/TallNut/0.gif",
		"images/Plants/TallNut/TallNut.gif",
		"images/Plants/TallNut/TallnutCracked1.gif",
		"images/Plants/TallNut/TallnutCracked2.gif",
	],
	Tooltip: "Heavy-duty wall that can't be vaulted over",
	Produce:
		'高坚果是重型壁垒植物，而且不会被跳过。<p>Toughness:<font color="#CC241D">非常高</font><br>特殊：<font color="#CC241D">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高</font><br>坚果以男中音的声调大声笑了。“我们之间怎么</font><br>会存在竞争关系？我们是哥们儿。你知道坚果墙</font><br>为我做了什么吗……”高坚果的声音越来越小，</font><br>他狡黠地笑着。”',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oTallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	Stature: 1,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 2667
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/TallNut/TallnutCracked2.gif"))
					: c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/TallNut/TallnutCracked1.gif"))
			: c.Die(1);
	},
});
var oTenManNut = InheritO(CPlants, {
	EName: "oTenManNut",
	CName: "Vine-nut",
	width: 155,
	height: 130,
	beAttackedPointL: 63,
	beAttackedPointR: 75,
	SunNum: 150,
	HP: 11e3,
	Stature: 1,
	canEat: 1,
	PicArr: ["images/Card/Plants/TenManNut.png", "images/Plants/TenManNut/0.gif", "images/Plants/TenManNut/Spikeweed.gif"],
	Attack: 40,
	ArZ: {},
	Tooltip: "Damages zombies that eat it",
	// cool comment!
	Produce:
		'<font color="#28325A">Vine-nuts are heavy-duty wall plants that can\'t be vaulted over and also damage zombies.</font><p>Damage: <font color="#CC241D">normal</font><br>Toughness: <font color="#CC241D">very high</font><p>Vine-Nut started as a plain Tall-Nut but became entangled in some wild jungle vines. Now, when zombies bite, thorny vines lash out, slowing them down. It\'s not just a nut, it\'s a vengeful nut!',
	getHurt(f, c, b) {
		var e = this;
		var d;
		var a = $(e.id).childNodes[1];
		switch (c) {
			case 2:
				f.flatTire();
				break;
			case 1:
				f.getHit2(f, 40, 0);
		}
		switch (true) {
			case (d = e.HP -= b) < 1:
				e.Die();
				break;
			case d < 101:
				a.src = "images/Plants/TenManNut/Spikeweed.gif";
				break;
			case d < 201:
				a.src = "images/Plants/TenManNut/Spikeweed.gif";
		}
	},
	NormalAttack(b, a) {
		var c = $Z[b];
		c.getHit2(c, this.Attack, 0);
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
	},
	TriggerCheck(i, h) {
		var c = i.id;
		var g = this.ArZ;
		var a;
		var b;
		var e;
		var f;
		i.PZ &&
			!g[c] &&
			((a = i.AttackedLX),
			(b = i.AttackedRX),
			(e = this.AttackedLX),
			(f = this.AttackedRX),
			(a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
			this.AttackCheck2(i) &&
			((g[c] = 1),
			this.NormalAttack(c),
			oSym.addTask(
				100,
				(d, j) => {
					var k = $P[d];
					k && delete k.ArZ[j];
				},
				[this.id, c]
			));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
});
var oCherryBomb = InheritO(CPlants, {
	EName: "oCherryBomb",
	CName: "Cherry Bomb",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 150,
	coolTime: 20,
	PicArr: [
		"images/Card/Plants/CherryBomb.png",
		"images/Plants/CherryBomb/0.gif",
		"images/Plants/CherryBomb/CherryBomb.gif",
		"images/Plants/CherryBomb/Boom.gif" + $Random,
	],
	AudioArr: ["cherrybomb"],
	Tooltip: "Blows up all zombies in an area",
	Produce:
		'<font color="#28325A">Cherry Bombs can blow up all zombies in an area. They have a short fuse so plant them near zombies.</font><p>Harm: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a medium area</font><br>Usage: <font color="#CC241D">single use, instant</font></p>"I wanna explode," says Cherry #1. "No, let\'s detonate instead!" says his brother, Cherry #2. After intense consultation they agree to explodonate.',
	InitTrigger() {},
	getHurt() {},
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(b) => {
				var c = $P[b];
				if (c) {
					PlayAudio("cherrybomb");
					var f = $(b);
					var j = c.R;
					var g = j > 2 ? j - 1 : 1;
					var e = j < oS.R ? j + 1 : oS.R;
					var l = c.pixelLeft - 80;
					var k = c.pixelLeft + 160;
					var d;
					var h;
					do {
						h = (d = oZ.getArZ(l, k, g)).length;
						while (h--) {
							d[h].getExplosion();
						}
					} while (g++ < e);
					c.Die(1);
					EditEle(
						f.childNodes[1],
						{
							src: c.PicArr[3] + Math.random(),
						},
						{
							width: "213px",
							height: "196px",
							left: "-50px",
							top: "-37px",
						}
					);
					oSym.addTask(120, ClearChild, [f]);
				}
			},
			[a.id]
		);
	},
});
var oSeedCherryBomb = InheritO(CPlants, {
	EName: "oSeedCherryBomb",
	CName: "Cherry Bomb",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 0,
	coolTime: 20,
	PicArr: [
		"images/Card/Plants/CherryBomb.png",
		"images/Plants/CherryBomb/0.gif",
		"images/Plants/CherryBomb/CherryBomb.gif",
		"images/Plants/CherryBomb/Boom.gif" + $Random,
	],
	AudioArr: ["cherrybomb"],
	Tooltip: "Blows up all zombies in an area",
	Produce:
		'Cherry bomb can blow up all zombies in a certain area.</font><br>One will detonate immediately. So please plant them on zombies</font><br>around them.<p>Harm:<font color="#CC241D">huge</font><br>Scope:<font color="#CC241D">All zombies in a medium area</font><br>Instructions:<font color="#CC241D">Instant use, it explodes immediately</font></p>“I am going to explode. "Cherry No. 1 said. "No, we are</font><br>‘炸’开了!”Said its brother Cherry No. 2. After intense discussion</font><br>After discussion, they finally agreed on the term "explosion."”',
	InitTrigger() {},
	getHurt() {},
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(b) => {
				var c = $P[b];
				if (c) {
					PlayAudio("cherrybomb");
					var f = $(b);
					var j = c.R;
					var g = j > 2 ? j - 1 : 1;
					var e = j < oS.R ? j + 1 : oS.R;
					var l = c.pixelLeft - 80;
					var k = c.pixelLeft + 160;
					var d;
					var h;
					do {
						h = (d = oZ.getArZ(l, k, g)).length;
						while (h--) {
							d[h].getExplosion();
						}
					} while (g++ < e);
					c.Die(1);
					EditEle(
						f.childNodes[1],
						{
							src: c.PicArr[3] + Math.random(),
						},
						{
							width: "213px",
							height: "196px",
							left: "-50px",
							top: "-37px",
						}
					);
					oSym.addTask(120, ClearChild, [f]);
				}
			},
			[a.id]
		);
	},
});
var oJalapeno = InheritO(oCherryBomb, {
	EName: "oJalapeno",
	CName: "Jalapeno",
	width: 68,
	height: 89,
	SunNum: 125,
	beAttackedPointR: 48,
	PicArr: [
		"images/Card/Plants/Jalapeno.png",
		"images/Plants/Jalapeno/0.gif",
		"images/Plants/Jalapeno/Jalapeno.gif",
		"images/Plants/Jalapeno/JalapenoAttack.gif",
	],
	AudioArr: ["jalapeno"],
	Tooltip: "Destroys an entire lane of zombies",
	Produce:
		'<font color="#28325A">Jalapenos destroy an entire lane of zombies.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a lane</font><br>Usage: <font color="#CC241D">single use, instant</font></p>"NNNNNGGGGGG!!!!!!!!" Jalapeno says. He\'s not going to explode, not this time. But soon. Oh, so soon. It\'s close. He knows it, he can feel it, his whole life\'s been leading up to this moment.',
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlayAudio("jalapeno");
					var b = $(j);
					var f = h.R;
					var c = oZ.getArZ(100, oS.W, f);
					var e = c.length;
					var g = oGd.$Ice[f];
					var d = oGd.$Crater;
					while (e--) {
						c[e].getExplosion();
					}
					h.Die(1);
					EditEle(
						b.childNodes[1],
						{
							src: "images/Plants/Jalapeno/JalapenoAttack.gif",
						},
						{
							width: "755px",
							height: "131px",
							left: 120 - h.pixelLeft + "px",
							top: "-42px",
						}
					);
					oSym.addTask(135, ClearChild, [b]);
					ClearChild($("dIceCar" + f));
					if (g) {
						for (e = g[1]; e < 11; e++) {
							delete d[f + "_" + e];
						}
					}
				}
			},
			[a.id]
		);
	},
});
var oSeedJalapeno = InheritO(oCherryBomb, {
	EName: "oSeedJalapeno",
	CName: "Jalapeno",
	width: 68,
	height: 89,
	SunNum: 0,
	beAttackedPointR: 48,
	PicArr: [
		"images/Card/Plants/Jalapeno.png",
		"images/Plants/Jalapeno/0.gif",
		"images/Plants/Jalapeno/Jalapeno.gif",
		"images/Plants/Jalapeno/JalapenoAttack.gif",
	],
	AudioArr: ["jalapeno"],
	Tooltip: "Destroys an entire lane of zombies",
	Produce:
		'火爆辣椒可以摧毁一整条线上的敌人。<p>Harm:<font color="#CC241D">极高</font><br>Scope:<font color="#CC241D">整条线上的僵尸</font><br>用法：<font color="#CC241D">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎!!!”火爆辣椒说。他现在</font><br>不会爆炸，还不到时候，不过快了，喔~，快了快</font><br>了，快来了。他知道，他感受到了，他一生都是</font><br>在等待这个时刻!',
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlayAudio("jalapeno");
					var b = $(j);
					var f = h.R;
					var c = oZ.getArZ(100, oS.W, f);
					var e = c.length;
					var g = oGd.$Ice[f];
					var d = oGd.$Crater;
					while (e--) {
						c[e].getExplosion();
					}
					h.Die(1);
					EditEle(
						b.childNodes[1],
						{
							src: "images/Plants/Jalapeno/JalapenoAttack.gif",
						},
						{
							width: "755px",
							height: "131px",
							left: 120 - h.pixelLeft + "px",
							top: "-42px",
						}
					);
					oSym.addTask(135, ClearChild, [b]);
					ClearChild($("dIceCar" + f));
					if (g) {
						for (e = g[1]; e < 11; e++) {
							delete d[f + "_" + e];
						}
					}
				}
			},
			[a.id]
		);
	},
});
var oSpikeweed = InheritO(CPlants, {
	EName: "oSpikeweed",
	CName: "Spikeweed",
	width: 85,
	height: 35,
	beAttackedPointL: 10,
	beAttackedPointR: 75,
	SunNum: 100,
	Stature: -1,
	canEat: 0,
	PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],
	Attack: 20,
	ArZ: {},
	Tooltip: "Pops tires and hurts zombies that step on it",
	Produce:
		'<font color="#28325A">Spikeweeds pop tires and hurt any zombies that step on them.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">all zombies that walk over it</font><br>Special: <font color="#CC241D">can\'t be eaten by zombies</font></p>Hockey is Spikeweed\'s obsession. He\'s got box seat season tickets. He keeps close track of his favorite players. And he consistently cleans up in the office hockey pool. Just one problem: he\'s terrified of pucks.',
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? e > 0 && e < d.ArC[1] && oGd.$LF[b] === 1 && !(c[1] || c[0])
			: !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 2:
				d.flatTire();
				c.Die();
				break;
			case 1:
				d.getHit2(d, 20, 0);
				c.Die();
				break;
			default:
				(c.HP -= a) < 1 && c.Die();
		}
	},
	NormalAttack(b, a) {
		var c = $Z[b];
		c.getHit2(c, this.Attack, 0);
	},
	GetDY(b, c, a) {
		return -2;
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
	},
	TriggerCheck(i, h) {
		var c = i.id;
		var g = this.ArZ;
		var a;
		var b;
		var e;
		var f;
		i.PZ &&
			!g[c] &&
			((a = i.AttackedLX),
			(b = i.AttackedRX),
			(e = this.AttackedLX),
			(f = this.AttackedRX),
			(a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
			this.AttackCheck2(i) &&
			((g[c] = 1),
			this.NormalAttack(c),
			oSym.addTask(
				100,
				(d, j) => {
					var k = $P[d];
					k && delete k.ArZ[j];
				},
				[this.id, c]
			));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
});
var oSeedSpikeweed = InheritO(CPlants, {
	EName: "oSeedSpikeweed",
	CName: "Spikeweed",
	width: 85,
	height: 35,
	beAttackedPointL: 10,
	beAttackedPointR: 75,
	SunNum: 0,
	Stature: -1,
	canEat: 0,
	PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],
	Attack: 20,
	ArZ: {},
	Tooltip: "Pops tires and hurts zombies that step on it",
	Produce:
		'地刺可以扎破轮胎，并对踩到他的僵尸造成伤</font><br>害<p>Harm:<font color="#CC241D">普通</font><br>Scope:<font color="#CC241D">所有踩到他的僵尸</font><br>Features:<font color="#CC241D">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关</font><br>注着他喜欢的球员，他也始终如一的在赛后清理</font><br>冰球场。但只有一个问题：他害怕冰球。',
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? e > 0 && e < d.ArC[1] && oGd.$LF[b] === 1 && !(c[1] || c[0])
			: !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 2:
				d.flatTire();
				c.Die();
				break;
			case 1:
				d.getHit2(d, 20, 0);
				c.Die();
				break;
			default:
				(c.HP -= a) < 1 && c.Die();
		}
	},
	NormalAttack(b, a) {
		var c = $Z[b];
		c.getHit2(c, this.Attack, 0);
	},
	GetDY(b, c, a) {
		return -2;
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
	},
	TriggerCheck(i, h) {
		var c = i.id;
		var g = this.ArZ;
		var a;
		var b;
		var e;
		var f;
		i.PZ &&
			!g[c] &&
			((a = i.AttackedLX),
			(b = i.AttackedRX),
			(e = this.AttackedLX),
			(f = this.AttackedRX),
			(a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
			this.AttackCheck2(i) &&
			((g[c] = 1),
			this.NormalAttack(c),
			oSym.addTask(
				100,
				(d, j) => {
					var k = $P[d];
					k && delete k.ArZ[j];
				},
				[this.id, c]
			));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
});
var oSpikerock = InheritO(oSpikeweed, {
	EName: "oSpikerock",
	CName: "Spikerock",
	width: 84,
	height: 43,
	beAttackedPointL: 10,
	beAttackedPointR: 74,
	SunNum: 125,
	PicArr: [
		"images/Card/Plants/Spikerock.png",
		"images/Plants/Spikerock/0.gif",
		"images/Plants/Spikerock/Spikerock.gif",
		"images/Plants/Spikerock/2.gif",
		"images/Plants/Spikerock/3.gif",
	],
	Attack: 40,
	Tooltip: 'Pops multiple tires and damages zombies that walk over it  <p> <font color="red">(requires spikeweed)</font>',
	Produce:
		'<font color="#28325A">Spikerocks pop multiple tires and damage zombies that walk over it.</font><p>Must be planted on spikeweeds<p>Spikerock just got back from a trip to Europe. He had a great time, met some wonderful people, really broadened his horizons. He never knew they made museums so big, or put so many paintings in them. That was a big surprise for him.',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oSpikeweed";
	},
	GetDY(b, c, a) {
		return 0;
	},
	getHurt(f, c, b) {
		var e = this;
		var d;
		var a = $(e.id).childNodes[1];
		switch (c) {
			case 2:
				f.flatTire();
				break;
			case 1:
				f.getHit2(f, 40, 0);
		}
		switch (true) {
			case (d = e.HP -= b) < 1:
				e.Die();
				break;
			case d < 101:
				a.src = "images/Plants/Spikerock/3.gif";
				break;
			case d < 201:
				a.src = "images/Plants/Spikerock/2.gif";
		}
	},
});
var oGarlic = InheritO(CPlants, {
	EName: "oGarlic",
	CName: "Garlic",
	width: 60,
	height: 59,
	beAttackedPointR: 40,
	SunNum: 50,
	HP: 400,
	PicArr: [
		"images/Card/Plants/Garlic.png",
		"images/Plants/Garlic/0.gif",
		"images/Plants/Garlic/Garlic.gif",
		"images/Plants/Garlic/Garlic_body2.gif",
		"images/Plants/Garlic/Garlic_body3.gif",
	],
	Tooltip: "Diverts zombies into other lanes",
	Produce:
		'<font color="#28325A">Garlic diverts zombies into other lanes.</font><p>Usage: <font color="#CC241D">on contact</font><br>Special: <font color="#CC241D">diverts zombies into other lanes</font><p>Lane-diversion isn\'t just Garlic\'s profession. It\'s his passion. He carries an advanced Doctorate in Redirection from the Brussels University. He\'ll talk all day about lane vectors and repulse arrays. He even pushes things into alternate avenues at home. Somehow his wife puts up with it.',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oGarlic"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		let yuckrng = Math.floor(Math.random() * 2) + 1; // note the uppercase M in Math
		if (yuckrng === 1) {
			PlayAudio("yuck");
		} else if (yuckrng === 2) {
			PlayAudio("yuck2");
		}
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= 20) < 1
				? c.Die()
				: (e.ChangeR({
						R: c.R,
					}),
					c.HP < 134
						? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Garlic/Garlic_body3.gif"))
						: c.HP < 267 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Garlic/Garlic_body2.gif")))
			: c.Die(1);
	},
});
var oSeedGarlic = InheritO(CPlants, {
	EName: "oSeedGarlic",
	CName: "Garlic",
	width: 60,
	height: 59,
	beAttackedPointR: 40,
	SunNum: 0,
	HP: 400,
	PicArr: [
		"images/Card/Plants/Garlic.png",
		"images/Plants/Garlic/0.gif",
		"images/Plants/Garlic/Garlic.gif",
		"images/Plants/Garlic/Garlic_body2.gif",
		"images/Plants/Garlic/Garlic_body3.gif",
	],
	Tooltip: "Diverts zombies into other lanes",
	Produce:
		'大蒜可以让僵尸改变前进的路线。<p>Scope:<font color="#CC241D">近距离接触</font><br>Features:<font color="#CC241D">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他</font><br>的热情所在。他在布鲁塞尔大学里，获得了转向</font><br>学的博士学位。他能把路线向量和反击阵列，讲</font><br>上一整天。他甚至会把家里的东西，推到街上去</font><br>。不知道为啥，他老婆还可以忍受这些。',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oGarlic"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		let yuckrng = Math.floor(Math.random() * 2) + 1; // note the uppercase M in Math
		if (yuckrng === 1) {
			PlayAudio("yuck");
		} else if (yuckrng === 2) {
			PlayAudio("yuck2");
		}
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= 20) < 1
				? c.Die()
				: (e.ChangeR({
						R: c.R,
					}),
					c.HP < 134
						? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Garlic/Garlic_body3.gif"))
						: c.HP < 267 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Garlic/Garlic_body2.gif")))
			: c.Die(1);
	},
});
var oSquash = InheritO(CPlants, {
	EName: "oSquash",
	CName: "Squash",
	width: 100,
	height: 226,
	beAttackedPointR: 67,
	SunNum: 50,
	PicArr: [
		"images/Card/Plants/Squash.png",
		"images/Plants/Squash/0.gif",
		"images/Plants/Squash/Squash.gif",
		"images/Plants/Squash/SquashAttack.gif",
		"images/Plants/Squash/SquashL.png",
		"images/Plants/Squash/SquashR.png",
	],
	AudioArr: ["squash_hmm", "gargantuar_thump"],
	Tooltip: "Squashes zombies",
	Produce:
		'<font color="#28325A">Squashes will smash the first zombie that gets close to it.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">short range, hits all zombies that it lands on</font><br>Usage: <font color="#CC241D">single use</font></p>"I\'m ready!" yells Squash. "Let\'s do it! Put me in! There\'s nobody better! I\'m your guy! C\'mon! Whaddya waiting for? I need this!"',
	GetDY(b, c, a) {
		return a[0] ? -21 : -10;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
	},
	getTriggerRange(a, b, c) {
		return [[b - 50, c + 80, 0]];
	},
	TriggerCheck(h, g, e) {
		var c = h.ZX;
		var b = this.id;
		var a = $(b).childNodes[1];
		var f = h.isAttacking;
		h.beAttacked &&
			h.Altitude > -1 &&
			h.Altitude < 2 &&
			(f || (!f && c - this.AttackedRX < 71)) &&
			(PlayAudio("squash_hmm"),
			oT.$[this.R].splice(e, 1),
			(a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png"),
			oSym.addTask(
				100,
				(d, j, i) => {
					var k = $P[d];
					k && k.NormalAttack(k, h.id, i);
				},
				[b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
			));
	},
	NormalAttack(d, c, b) {
		var a = $(d.id);
		var e = $Z[c];
		e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
		a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
		SetStyle(a, {
			left: b + "px",
		});
		d.Die(1);
		oSym.addTask(
			45,
			(f, l, j) => {
				PlayAudio("gargantuar_thump");
				var g = oZ.getArZ(l, l + 100, j);
				var h = g.length;
				var k;
				while (h--) {
					(k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
				}
				oSym.addTask(185, ClearChild, [f]);
			},
			[a, b, d.R]
		);
	},
});
var oSeedSquash = InheritO(CPlants, {
	EName: "oSeedSquash",
	CName: "Squash",
	width: 100,
	height: 226,
	beAttackedPointR: 67,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Squash.png",
		"images/Plants/Squash/0.gif",
		"images/Plants/Squash/Squash.gif",
		"images/Plants/Squash/SquashAttack.gif",
		"images/Plants/Squash/SquashL.png",
		"images/Plants/Squash/SquashR.png",
	],
	AudioArr: ["squash_hmm", "gargantuar_thump"],
	Tooltip: "Squashes zombies",
	Produce:
		'窝瓜会压扁第一个接近它的僵尸。<p>Harm:<font color="#CC241D">极高</font><br>Scope:<font color="#CC241D">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#CC241D">单独使用</font></p>“我准备好了!”窝瓜大吼道，“干吧!!算我</font><br>一份!没人比我厉害!我就是你要的人!来啊!</font><br>等啥啊？要的就是这个!”',
	GetDY(b, c, a) {
		return a[0] ? -21 : -10;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
	},
	getTriggerRange(a, b, c) {
		return [[b - 50, c + 80, 0]];
	},
	TriggerCheck(h, g, e) {
		var c = h.ZX;
		var b = this.id;
		var a = $(b).childNodes[1];
		var f = h.isAttacking;
		h.beAttacked &&
			h.Altitude > -1 &&
			h.Altitude < 2 &&
			(f || (!f && c - this.AttackedRX < 71)) &&
			(PlayAudio("squash_hmm"),
			oT.$[this.R].splice(e, 1),
			(a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png"),
			oSym.addTask(
				100,
				(d, j, i) => {
					var k = $P[d];
					k && k.NormalAttack(k, h.id, i);
				},
				[b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
			));
	},
	NormalAttack(d, c, b) {
		var a = $(d.id);
		var e = $Z[c];
		e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
		a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
		SetStyle(a, {
			left: b + "px",
		});
		d.Die(1);
		oSym.addTask(
			45,
			(f, l, j) => {
				PlayAudio("gargantuar_thump");
				var g = oZ.getArZ(l, l + 100, j);
				var h = g.length;
				var k;
				while (h--) {
					(k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
				}
				oSym.addTask(185, ClearChild, [f]);
			},
			[a, b, d.R]
		);
	},
});
var oChomper = InheritO(CPlants, {
	EName: "oChomper",
	CName: "Chomper",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 150,
	AudioArr: ["bigchomp"],
	PicArr: [
		"images/Card/Plants/Chomper.png",
		"images/Plants/Chomper/0.gif",
		"images/Plants/Chomper/Chomper.gif",
		"images/Plants/Chomper/ChomperAttack.gif",
		"images/Plants/Chomper/ChomperDigest.gif",
	],
	Tooltip: "Devours a zombie whole, but is vulnerable while chewing",
	Produce:
		'<font color="#28325A">Chompers can devour a zombie whole, but they are vulnerable while chewing.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">very short</font><br>Special: <font color="#CC241D">long delay between chomps</font></p>Chomper almost got a gig doing stunts for The Little Shop of Horrors but it fell through when his agent demanded too much on the front end. Chomper\'s not resentful, though. He says it\'s just part of the business.',
	GetDX() {
		return -40;
	},
	getShadow(a) {
		return "top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft, c + 80, 0]];
	},
	TriggerCheck(a) {
		this.AttackCheck2(a) && ((this.canTrigger = 0), this.NormalAttack(this.id, a.id));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
	NormalAttack(a, b) {
		$(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(
			70,
			(c, d) => {
				PlayAudio("bigchomp");
				$P[c] &&
					oSym.addTask(
						18,
						(e, f) => {
							var g = $P[e];
							var h;
							g &&
								((h = $Z[f]) && h.beAttacked && h.PZ
									? ($(e).childNodes[1].src = h.getRaven(e)
											? (oSym.addTask(
													4200,
													(i) => {
														var j = $P[i];
														j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
													},
													[e]
												),
												"images/Plants/Chomper/ChomperDigest.gif")
											: ((g.canTrigger = 1), "images/Plants/Chomper/Chomper.gif"))
									: oSym.addTask(
											18,
											(i) => {
												var j = $P[i];
												j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
											},
											[e]
										));
						},
						[c, d]
					);
			},
			[a, b]
		);
	},
});
var oSeedChomper = InheritO(CPlants, {
	EName: "oSeedChomper",
	CName: "Chomper",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 0,
	AudioArr: ["bigchomp"],
	PicArr: [
		"images/Card/Plants/Chomper.png",
		"images/Plants/Chomper/0.gif",
		"images/Plants/Chomper/Chomper.gif",
		"images/Plants/Chomper/ChomperAttack.gif",
		"images/Plants/Chomper/ChomperDigest.gif",
	],
	Tooltip: "Devours a zombie whole, but is vulnerable while chewing",
	Produce:
		'Big-mouthed flowers can swallow a whole zombie in one bite, but they are very fragile when digesting zombies.<p>Harm:<font color="#CC241D">huge</font><br>Scope:<font color="#CC241D">very close</font><br>Features:<font color="#CC241D">Digestion takes a long time</font></p>Big Mouth Flower can almost go to "Little Shop of Horrors"”，to perform its absolute best</font><br>Skilled, but his agent squeezed him too much money.</font><br>Because he didnt go. Despite this, Dazuihua has no complaints, only</font><br>Said it was just part of the deal.',
	GetDX() {
		return -40;
	},
	getShadow(a) {
		return "top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft, c + 80, 0]];
	},
	TriggerCheck(a) {
		this.AttackCheck2(a) && ((this.canTrigger = 0), this.NormalAttack(this.id, a.id));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
	NormalAttack(a, b) {
		$(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(
			70,
			(c, d) => {
				PlayAudio("bigchomp");
				$P[c] &&
					oSym.addTask(
						18,
						(e, f) => {
							var g = $P[e];
							var h;
							g &&
								((h = $Z[f]) && h.beAttacked && h.PZ
									? ($(e).childNodes[1].src = h.getRaven(e)
											? (oSym.addTask(
													4200,
													(i) => {
														var j = $P[i];
														j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
													},
													[e]
												),
												"images/Plants/Chomper/ChomperDigest.gif")
											: ((g.canTrigger = 1), "images/Plants/Chomper/Chomper.gif"))
									: oSym.addTask(
											18,
											(i) => {
												var j = $P[i];
												j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
											},
											[e]
										));
						},
						[c, d]
					);
			},
			[a, b]
		);
	},
});
var oBigChomper = InheritO(oChomper, {
	EName: "oBigChomper",
	CName: "Super Chomper",
	coolTime: 15,
	PicArr: [
		"images/Card/Plants/BigChomper.png",
		"images/Plants/BigChomper/0.gif",
		"images/Plants/BigChomper/Chomper.gif",
		"images/Plants/BigChomper/ChomperAttack.gif",
		"images/Plants/BigChomper/ChomperDigest.gif",
	],
	Tooltip: "Can devour multiple zombie whole at once, but is vulnerable while rapidly chewing",
	Produce:
		'超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速</font><br>度是普通大嘴花的50%。<p>Harm:<font color="#CC241D">巨大</font><br>Scope:<font color="#CC241D">非常近</font><br>Features:<font color="#CC241D">咀嚼时间短</font></p>超级大嘴花曾经是电视节目“超级大胃王”节</font><br>目的常客，但后来他被踢出了节目组，原因是</font><br>它的存在直接影响到观众的饮食量和节目收视</font><br>率。没办法，为了糊口他只得干起吞食僵尸行</font><br>动。',
	/*
CanGrow: function(b, a, d) {
var c = b[1];
return c && c.EName == "oChomper"
},
*/
	NormalAttack(a, b) {
		$(a).childNodes[1].src = "images/Plants/BigChomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(
			70,
			(c, d) => {
				PlayAudio("bigchomp");
				$P[c] &&
					oSym.addTask(
						9,
						(e, f) => {
							var g = $P[e];
							var h;
							g &&
								((h = $Z[f]) && h.beAttacked && h.PZ
									? ($(e).childNodes[1].src = h.getRaven(e)
											? (oSym.addTask(
													2100,
													(i) => {
														var j = $P[i];
														j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif"));
													},
													[e]
												),
												"images/Plants/BigChomper/ChomperDigest.gif")
											: ((g.canTrigger = 1), "images/Plants/BigChomper/Chomper.gif"))
									: oSym.addTask(
											9,
											(i) => {
												var j = $P[i];
												j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif"));
											},
											[e]
										));
						},
						[c, d]
					);
			},
			[a, b]
		);
	},
});
var oFumeShroom = InheritO(CPlants, {
	EName: "oFumeShroom",
	CName: "Fume-shroom",
	width: 100,
	height: 88,
	beAttackedPointR: 80,
	SunNum: 75,
	BookHandBack: 2.5,
	SleepGif: 3,
	night: true,
	PicArr: [
		"images/Card/Plants/FumeShroom.png",
		"images/Plants/FumeShroom/0.gif",
		"images/Plants/FumeShroom/FumeShroom.gif",
		"images/Plants/FumeShroom/FumeShroomSleep.gif",
		"images/Plants/FumeShroom/FumeShroomAttack.gif",
		"images/Plants/FumeShroom/FumeShroomBullet.gif",
	],
	AudioArr: ["fume"],
	Tooltip: "Shoots fumes that can pass through screen doors",
	Produce:
		'<font color="#28325A">Fume-shrooms shoot fumes that can pass through screen doors.</font><p>Damage: <font color="#CC241D">normal, penetrates screen doors</font><br>Range: <font color="#CC241D">all zombies in the fume cloud	</font><br><font color="#8832aa">Sleeps during the day</font></p>"I was in a dead-end job producing yeast spores for a bakery," says Fume-shroom. "Then Puff-shroom, bless \'im, told me about this great opportunity blasting zombies. Now I really feel like I\'m making a difference."',
	GetDY(b, c, a) {
		return a[0] ? -18 : -10;
	},
	GetDX() {
		return -45;
	},
	BirthStyle(c, d, b, a) {
		oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
				b.AttackedRX +
				"px;top:" +
				(b.pixelTop + 5) +
				"px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 330, oS.W), 0]];
	},
	NormalAttack() {
		PlayAudio("fume");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getHit1(g, 20);
		}
		b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 9, 1],
				["0 -62px", 9, 2],
				["0 -124px", 9, 3],
				["0 -186px", 9, 4],
				["0 -248px", 9, 5],
				["0 -310px", 9, 6],
				["0 -372px", 9, 7],
				["0 -434px", 9, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif"), SetHidden($(i)));
			}
		);
	},
});
var oSeedFumeShroom = InheritO(CPlants, {
	EName: "oSeedFumeShroom",
	CName: "Fume-shroom",
	width: 100,
	height: 88,
	beAttackedPointR: 80,
	SunNum: 0,
	BookHandBack: 2.5,
	SleepGif: 3,
	night: true,
	PicArr: [
		"images/Card/Plants/FumeShroom.png",
		"images/Plants/FumeShroom/0.gif",
		"images/Plants/FumeShroom/FumeShroom.gif",
		"images/Plants/FumeShroom/FumeShroomSleep.gif",
		"images/Plants/FumeShroom/FumeShroomAttack.gif",
		"images/Plants/FumeShroom/FumeShroomBullet.gif",
	],
	AudioArr: ["fume"],
	Tooltip: "Shoots fumes that can pass through screen doors",
	Produce:
		'大喷菇喷出的臭气可以穿透铁丝网门。<p>Harm:<font color="#CC241D">普通，可穿透铁丝网门</font><br>Scope:<font color="#CC241D">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
	GetDY(b, c, a) {
		return a[0] ? -18 : -10;
	},
	GetDX() {
		return -45;
	},
	BirthStyle(c, d, b, a) {
		oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
				b.AttackedRX +
				"px;top:" +
				(b.pixelTop + 5) +
				"px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 330, oS.W), 0]];
	},
	NormalAttack() {
		PlayAudio("fume");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getHit1(g, 20);
		}
		b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 9, 1],
				["0 -62px", 9, 2],
				["0 -124px", 9, 3],
				["0 -186px", 9, 4],
				["0 -248px", 9, 5],
				["0 -310px", 9, 6],
				["0 -372px", 9, 7],
				["0 -434px", 9, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif"), SetHidden($(i)));
			}
		);
	},
});
var oIceFumeShroom = InheritO(oFumeShroom, {
	EName: "oIceFumeShroom",
	CName: "Icy Fume-shroom",
	SunNum: 200,
	PicArr: [
		"images/Card/Plants/IcyFumeShroom.png",
		"images/Plants/IcyFumeShroom/0.gif",
		"images/Plants/IcyFumeShroom/FumeShroom.gif",
		"images/Plants/IcyFumeShroom/FumeShroomSleep.gif",
		"images/Plants/IcyFumeShroom/FumeShroomAttack.gif",
		"images/Plants/IcyFumeShroom/FumeShroomBullet.gif",
	],
	Tooltip: 'Shoots icy fumes that can pass through screen doors  <p> <font color="red">(requires fume-shroom)</font>',
	Produce:
		'大喷菇喷出的臭气可以穿透铁丝网门。<p>Harm:<font color="#CC241D">普通，可穿透铁丝网门</font><br>Scope:<font color="#CC241D">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
				b.AttackedRX +
				"px;top:" +
				(b.pixelTop + 5) +
				"px;background:url(images/Plants/IcyFumeShroom/FumeShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	NormalAttack() {
		PlayAudio("fume");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getSnowPea(g, 20);
		}
		b.childNodes[1].src = "images/Plants/IcyFumeShroom/FumeShroomAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 9, 1],
				["0 -62px", 9, 2],
				["0 -124px", 9, 3],
				["0 -186px", 9, 4],
				["0 -248px", 9, 5],
				["0 -310px", 9, 6],
				["0 -372px", 9, 7],
				["0 -434px", 9, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/IcyFumeShroom/FumeShroom.gif"), SetHidden($(i)));
			}
		);
	},
});
var oCoffeeBean = InheritO(CPlants, {
	EName: "oCoffeeBean",
	CName: "Coffee Bean",
	width: 39,
	height: 97,
	beAttackedPointL: 10,
	beAttackedPointR: 29,
	SunNum: 75,
	PKind: 3,
	canEat: 0,
	PicArr: [
		"images/Card/Plants/CoffeeBean.png",
		"images/Plants/CoffeeBean/0.gif",
		"images/Plants/CoffeeBean/CoffeeBean.gif",
		"images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random,
	],
	AudioArr: ["coffee", "wakeup"],
	Tooltip: "Plant it on a mushroom to wake it up",
	Produce:
		'<font color="#28325A">Use Coffee Beans to wake up sleeping mushrooms.</font><p>Usage: <font color="#CC241D">single use, instant</font><br>Special: <font color="#CC241D">can be planted over another plant, wakes up mushrooms</font><p>"Hey, guys, hey!" says Coffee Bean. "Hey! What\'s up? Who\'s that? Hey! Didja see that thing? What thing? Whoa! Lions!" Yep, Coffee Bean sure does get excited.',
	InitTrigger() {},
	GetDBottom() {
		return 49;
	},
	GetDY() {
		return -30;
	},
	CanGrow(a, b) {
		return (b = a[1]) && b.Sleep && !a[3];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = this.PicArr[3] + Math.random();
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(a) {
		SetHidden($(a.id).firstChild);
		PlayAudio("coffee");
		oSym.addTask(
			240,
			(c) => {
				PlayAudio("wakeup");
				var d = oGd.$[c];
				var b;
				d && ((b = d.WakeUP), !b ? (($(d.id).childNodes[1].src = d.PicArr[d.NormalGif]), (d.canTrigger = 1), (d.Sleep = 0)) : b(d));
				a.Die();
			},
			[a.R + "_" + a.C + "_1"]
		);
	},
});
var oGloomShroom = InheritO(oFumeShroom, {
	EName: "oGloomShroom",
	CName: "Gloom-shroom",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 150,
	PicArr: [
		"images/Card/Plants/GloomShroom.png",
		"images/Plants/GloomShroom/0.gif",
		"images/Plants/GloomShroom/GloomShroom.gif",
		"images/Plants/GloomShroom/GloomShroomSleep.gif",
		"images/Plants/GloomShroom/GloomShroomAttack.gif",
		"images/Plants/GloomShroom/GloomShroomBullet.gif",
	],
	AudioArr: ["kernelpult", "kernelpult2"],
	Tooltip: 'Releases heavy fumes in an area around itself  <p> <font color="red">(requires fume-shroom)</font>',
	Produce:
		'<font color="#28325A">Gloom-shrooms release heavy fumes in an area around themselves.</font><p>Must be planted on fume-shrooms<p>"I\'ve always enjoyed releasing heavy fumes," says Gloom Shroom. "I know a lot of people aren\'t cool with that. They say it\'s rude or that it smells bad. All I can say is, would you rather have your brain eaten by zombies?"',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oFumeShroom";
	},
	BirthStyle(c, d, b, a) {
		oGd.$[c.R + "_" + c.C + "_1"] && oGd.$[c.R + "_" + c.C + "_1"].Sleep && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[3]));
		EditEle(b, { id: d }, a, EDPZ);
	},
	GetDX() {
		return -58;
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:210px;height:200px;left:" +
				(b.pixelLeft - 60) +
				"px;top:" +
				(b.pixelTop - 65) +
				"px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(c, d, e) {
		var f = GetX(this.C);
		var b = (this.MinX = f - 120);
		var a = (this.MaxX = f + 120);
		return [[b, a, 0]];
	},
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	NormalAttack() {
		var k = this;
		var g;
		var f = k.MaxR;
		var c = k.MinX;
		var b = k.MaxX;
		var e;
		var h;
		var a;
		var j = k.id;
		var d = $(j);
		var l = j + "_Bullet";
		for (g = k.MinR; g <= f; g++) {
			e = oZ.getArZ(c, b, g);
			for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}
		}
		oSym.addTask(
			100,
			function (i) {
				PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
				--i && oSym.addTask(100, arguments.callee, [i]);
			},
			[4]
		);
		d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
		SetVisible($(l));
		ImgSpriter(
			l,
			j,
			[
				["0 0", 9, 1],
				["0 -200px", 9, 2],
				["0 -400px", 9, 3],
				["0 -600px", 9, 4],
				["0 -800px", 9, 5],
				["0 -1000px", 9, 6],
				["0 -1200px", 9, 7],
				["0 -1400px", 9, 8],
				["0 -1600px", 9, 9],
				["0 -1800px", 9, 10],
				["0 -2000px", 9, 11],
				["0 -2200px", 9, -1],
			],
			0,
			(m, n) => {
				var i = $(n);
				$P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
				SetHidden($(m));
			}
		);
	},
});
var oSeedGloomShroom = InheritO(oSeedFumeShroom, {
	EName: "oSeedGloomShroom",
	CName: "Gloom-shroom",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/GloomShroom.png",
		"images/Plants/GloomShroom/0.gif",
		"images/Plants/GloomShroom/GloomShroom.gif",
		"images/Plants/GloomShroom/GloomShroomSleep.gif",
		"images/Plants/GloomShroom/GloomShroomAttack.gif",
		"images/Plants/GloomShroom/GloomShroomBullet.gif",
	],
	AudioArr: ["kernelpult", "kernelpult2"],
	Tooltip: 'Releases heavy fumes in an area around itself  <p> <font color="red">(requires fume-shroom)</font>',
	Produce:
		'围绕自身释放大量孢子<p><font color="#CC241D">可以种植在大喷菇上</font></p>“我喜欢喷射大量烟雾。”忧郁蘑菇说，“我</font><br>知道许多人不喜欢这样，他们说这又粗鲁啦烟</font><br>雾又很臭啦之类的，我只想说，你们想不想自</font><br>己的脑袋被僵尸吃掉？”',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oSeedFumeShroom";
	},
	BirthStyle(c, d, b, a) {
		oGd.$[c.R + "_" + c.C + "_1"] && oGd.$[c.R + "_" + c.C + "_1"].Sleep && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[3]));
		EditEle(b, { id: d }, a, EDPZ);
	},
	GetDX() {
		return -58;
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:210px;height:200px;left:" +
				(b.pixelLeft - 60) +
				"px;top:" +
				(b.pixelTop - 65) +
				"px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(c, d, e) {
		var f = GetX(this.C);
		var b = (this.MinX = f - 120);
		var a = (this.MaxX = f + 120);
		return [[b, a, 0]];
	},
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	NormalAttack() {
		var k = this;
		var g;
		var f = k.MaxR;
		var c = k.MinX;
		var b = k.MaxX;
		var e;
		var h;
		var a;
		var j = k.id;
		var d = $(j);
		var l = j + "_Bullet";
		for (g = k.MinR; g <= f; g++) {
			e = oZ.getArZ(c, b, g);
			for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}
		}
		oSym.addTask(
			100,
			function (i) {
				PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
				--i && oSym.addTask(100, arguments.callee, [i]);
			},
			[4]
		);
		d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
		SetVisible($(l));
		ImgSpriter(
			l,
			j,
			[
				["0 0", 9, 1],
				["0 -200px", 9, 2],
				["0 -400px", 9, 3],
				["0 -600px", 9, 4],
				["0 -800px", 9, 5],
				["0 -1000px", 9, 6],
				["0 -1200px", 9, 7],
				["0 -1400px", 9, 8],
				["0 -1600px", 9, 9],
				["0 -1800px", 9, 10],
				["0 -2000px", 9, 11],
				["0 -2200px", 9, -1],
			],
			0,
			(m, n) => {
				var i = $(n);
				$P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
				SetHidden($(m));
			}
		);
	},
});
var oPuffShroom = InheritO(oFumeShroom, {
	EName: "oPuffShroom",
	CName: "Puff-shroom",
	width: 40,
	height: 66,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	SunNum: 0,
	Stature: -1,
	PicArr: [
		"images/Card/Plants/PuffShroom.png",
		"images/Plants/PuffShroom/0.gif",
		"images/Plants/PuffShroom/PuffShroom.gif",
		"images/Plants/PuffShroom/PuffShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	AudioArr: ["puff"],
	Tooltip: "Shoots short-ranged spores at the enemy",
	Produce:
		'<font color="#28325A">Puff-shrooms are cheap, but can only fire a short distance.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">short</font><br><font color="#8832aa">Sleeps during the day</font></p>"I only recently became aware of the existence of zombies," says Puff-shroom. "Like many fungi, I\'d just assumed they were fairy tales or movie monsters. This whole experience has been a huge eye-opener for me."',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 250, oS.W), 0]];
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2)
		);
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		PlayAudio("puff");
		var b = this;
		var c = "PSB" + Math.random();
		var a = b.AttackedLX;
		EditEle(
			b.BulletEle.cloneNode(false),
			{
				id: c,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		oSym.addTask(
			1,
			function (j, d, e, f, g) {
				var i = GetC(e);
				var h = oZ.getZ0(e, f);
				h && h.Altitude === 1
					? (h.getPea(h, 20, 0),
						(SetStyle(d, {
							left: g + 38 + "px",
						}).src = "images/Plants/ShroomBulletHit.gif"),
						oSym.addTask(10, ClearChild, [d]))
					: (e += 5) < oS.W
						? ((d.style.left = (g += 5) + "px"), oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
						: ClearChild(d);
			},
			[c, $(c), a, b.R, a - 46]
		);
	},
});
var oSeedPuffShroom = InheritO(oFumeShroom, {
	EName: "oSeedPuffShroom",
	CName: "Puff-shroom",
	width: 40,
	height: 66,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	SunNum: 0,
	Stature: -1,
	PicArr: [
		"images/Card/Plants/PuffShroom.png",
		"images/Plants/PuffShroom/0.gif",
		"images/Plants/PuffShroom/PuffShroom.gif",
		"images/Plants/PuffShroom/PuffShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	AudioArr: ["puff"],
	Tooltip: "Shoots short-ranged spores at the enemy",
	Produce:
		'小喷菇是免费的，不过射程很近。<p>Harm: <font color="#CC241D">中等</font><br>Scope:<font color="#CC241D">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和</font><br>很多蘑菇一样，我只是把他们想象成童话和电</font><br>影里的怪物。不过这次的经历已经让我大开眼</font><br>界了。',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 250, oS.W), 0]];
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2)
		);
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		PlayAudio("puff");
		var b = this;
		var c = "PSB" + Math.random();
		var a = b.AttackedLX;
		EditEle(
			b.BulletEle.cloneNode(false),
			{
				id: c,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		oSym.addTask(
			1,
			function (j, d, e, f, g) {
				var i = GetC(e);
				var h = oZ.getZ0(e, f);
				h && h.Altitude === 1
					? (h.getPea(h, 20, 0),
						(SetStyle(d, {
							left: g + 38 + "px",
						}).src = "images/Plants/ShroomBulletHit.gif"),
						oSym.addTask(10, ClearChild, [d]))
					: (e += 5) < oS.W
						? ((d.style.left = (g += 5) + "px"), oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
						: ClearChild(d);
			},
			[c, $(c), a, b.R, a - 46]
		);
	},
});
var oScaredyShroom = InheritO(oFumeShroom, {
	EName: "oScaredyShroom",
	CName: "Scaredy-shroom",
	width: 57,
	height: 81,
	beAttackedPointR: 37,
	SunNum: 25,
	Cry: 0,
	ArZ: [],
	Attacking: 0,
	PicArr: [
		"images/Card/Plants/ScaredyShroom.png",
		"images/Plants/ScaredyShroom/0.gif",
		"images/Plants/ScaredyShroom/ScaredyShroom.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomSleep.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomCry.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	Tooltip: "Long-ranged shooter that hides when enemies get near it",
	Produce:
		'<font color="#28325A">Scaredy-shrooms are long-ranged shooters that hide when enemies get near them.</font><p>Damage: <font color="#CC241D">normal, penetrates screen doors</font><br>Special: <font color="#CC241D">stops shooting when enemy is close</font><br><font color="#8832aa">Sleeps during the day</font></p>"Who\'s there?" whispers Scaredy-shroom, voice barely audible. "Go away. I don\'<|t want to see anybody. Unless it\'s the man from the circus."',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange: CPlants.prototype.getTriggerRange,
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	TriggerCheck(e, c) {
		var b = this;
		var a = b.id;
		e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked
			? (b.ArZ.push(e.id), !b.Cry && ((b.Cry = 1), ($(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif"), b.CryCheck(a)))
			: e.R === b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
	},
	PrivateBirth(c) {
		var b = c.AttackedLX;
		var a = b - 46;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2,
		});
		c.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2)
		);
		c.MX = b + 9;
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var c = this;
		var a = c.id;
		var d = "SSB" + Math.random();
		var b = c.AttackedLX;
		EditEle(
			c.BulletEle.cloneNode(false),
			{
				id: d,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			1,
			function (k, e, f, g, h) {
				var j = GetC(f);
				var i = oZ.getZ0(f, g);
				i && i.Altitude === 1
					? (i.getPea(i, 20, 0),
						(SetStyle(e, {
							left: h + 38 + "px",
						}).src = "images/Plants/ShroomBulletHit.gif"),
						oSym.addTask(10, ClearChild, [e]))
					: (f += 5) < oS.W
						? ((e.style.left = (h += 5) + "px"), oSym.addTask(1, arguments.callee, [k, e, f, g, h]))
						: ClearChild(e);
			},
			[d, $(d), b, c.R, b - 46]
		);
		c.Attacking = 1;
		oSym.addTask(
			10,
			(g, e) => {
				var f = $(g);
				f && SetVisible(f);
				oSym.addTask(
					130,
					(h) => {
						var i = $P[h];
						i && (i.Attacking = 0);
					},
					[e]
				);
			},
			[d, a]
		);
	},
	CryCheck(a) {
		oSym.addTask(
			140,
			(b) => {
				var d = $P[b];
				var c;
				var f;
				var e;
				if (d) {
					c = (f = d.ArZ).length;
					while (c--) {
						(!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1);
					}
					f.length ? d.CryCheck(b) : ((d.Cry = 0), ($(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif"));
				}
			},
			[a]
		);
	},
});
var oSeedScaredyShroom = InheritO(oFumeShroom, {
	EName: "oSeedScaredyShroom",
	CName: "Scaredy-shroom",
	width: 57,
	height: 81,
	beAttackedPointR: 37,
	SunNum: 0,
	Cry: 0,
	ArZ: [],
	Attacking: 0,
	PicArr: [
		"images/Card/Plants/ScaredyShroom.png",
		"images/Plants/ScaredyShroom/0.gif",
		"images/Plants/ScaredyShroom/ScaredyShroom.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomSleep.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomCry.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	Tooltip: "Long-ranged shooter that hides when enemies get near it",
	Produce:
		'胆小菇是一种远程射手，敌人接近后会躲起来。<p>Harm:<font color="#CC241D">普通</font><br>Features:<font color="#CC241D">敌人接近后就停止攻击<br>白天睡觉</font></p>“谁在那？”胆小菇低声说，声音细微难辨。“</font><br>走开!我不想见任何人。除非……除非你是马</font><br>戏团的人。”',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange: CPlants.prototype.getTriggerRange,
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	TriggerCheck(e, c) {
		var b = this;
		var a = b.id;
		e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked
			? (b.ArZ.push(e.id), !b.Cry && ((b.Cry = 1), ($(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif"), b.CryCheck(a)))
			: e.R === b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
	},
	PrivateBirth(c) {
		var b = c.AttackedLX;
		var a = b - 46;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2,
		});
		c.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2)
		);
		c.MX = b + 9;
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var c = this;
		var a = c.id;
		var d = "SSB" + Math.random();
		var b = c.AttackedLX;
		EditEle(
			c.BulletEle.cloneNode(false),
			{
				id: d,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			1,
			function (k, e, f, g, h) {
				var j = GetC(f);
				var i = oZ.getZ0(f, g);
				i && i.Altitude === 1
					? (i.getPea(i, 20, 0),
						(SetStyle(e, {
							left: h + 38 + "px",
						}).src = "images/Plants/ShroomBulletHit.gif"),
						oSym.addTask(10, ClearChild, [e]))
					: (f += 5) < oS.W
						? ((e.style.left = (h += 5) + "px"), oSym.addTask(1, arguments.callee, [k, e, f, g, h]))
						: ClearChild(e);
			},
			[d, $(d), b, c.R, b - 46]
		);
		c.Attacking = 1;
		oSym.addTask(
			10,
			(g, e) => {
				var f = $(g);
				f && SetVisible(f);
				oSym.addTask(
					130,
					(h) => {
						var i = $P[h];
						i && (i.Attacking = 0);
					},
					[e]
				);
			},
			[d, a]
		);
	},
	CryCheck(a) {
		oSym.addTask(
			140,
			(b) => {
				var d = $P[b];
				var c;
				var f;
				var e;
				if (d) {
					c = (f = d.ArZ).length;
					while (c--) {
						(!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1);
					}
					f.length ? d.CryCheck(b) : ((d.Cry = 0), ($(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif"));
				}
			},
			[a]
		);
	},
});
var oHypnoShroom = InheritO(oFumeShroom, {
	EName: "oHypnoShroom",
	CName: "Hypno-shroom",
	width: 71,
	height: 78,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 75,
	coolTime: 30,
	HP: 0,
	PicArr: [
		"images/Card/Plants/HypnoShroom.png",
		"images/Plants/HypnoShroom/0.gif",
		"images/Plants/HypnoShroom/HypnoShroom.gif",
		"images/Plants/HypnoShroom/HypnoShroomSleep.gif",
	],
	Tooltip: "Makes a zombie fight for you",
	Produce:
		'<font color="#28325A">When eaten, Hypno-shrooms will make a zombie turn around and fight for you.</font><p>Usage: <font color="#CC241D">single use, on contact</font><br>Special: <font color="#CC241D">makes a zombie fight for you</font><br><font color="#8832aa">Sleeps during the day</font></p>"Zombies are our friends," asserts Hypno-shroom. "They\'re badly misunderstood creatures who play a valuable role in our ecology. We can and should do more to bring them round to our way of thinking."',
	InitTrigger() {},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 3:
				(c.HP -= a) < 1 && c.Die();
				break;
			case 0:
				!c.Sleep && d.bedevil(d);
				d.EleBody.style.filter += " hue-rotate(180deg) saturate(2)";
				PlayAudio("mindcontrolled");
				c.Die();
				break;
			default:
				c.Die(1);
		}
	},
});
var oSeedHypnoShroom = InheritO(oFumeShroom, {
	EName: "oSeedHypnoShroom",
	CName: "Hypno-shroom",
	width: 71,
	height: 78,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 0,
	coolTime: 30,
	HP: 0,
	PicArr: [
		"images/Card/Plants/HypnoShroom.png",
		"images/Plants/HypnoShroom/0.gif",
		"images/Plants/HypnoShroom/HypnoShroom.gif",
		"images/Plants/HypnoShroom/HypnoShroomSleep.gif",
	],
	Tooltip: "Makes a zombie fight for you",
	Produce:
		'当僵尸吃下魅惑菇后，他将会掉转方向为你作</font><br>战。<p>Instructions:<font color="#CC241D">单独使用，接触生效</font><br>Features:<font color="#CC241D">让一只僵尸为你作战<br>白天睡觉</font></p>魅惑菇声称：“僵尸们是我们的朋友，他们被</font><br>严重误解了，僵尸们在我们的生态环境里扮演着</font><br>重要角色。我们可以也应当更努力地让他们学</font><br>会用我们的方式来思考。”',
	InitTrigger() {},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 3:
				(c.HP -= a) < 1 && c.Die();
				break;
			case 0:
				!c.Sleep && d.bedevil(d);
				d.EleBody.style.filter += " hue-rotate(180deg) saturate(2)";
				PlayAudio("mindcontrolled");
				c.Die();
				break;
			default:
				c.Die(1);
		}
	},
});
var oIceShroom = InheritO(oFumeShroom, {
	EName: "oIceShroom",
	CName: "Ice-shroom",
	width: 83,
	height: 75,
	beAttackedPointR: 63,
	SunNum: 75,
	coolTime: 50,
	PicArr: [
		"images/Card/Plants/IceShroom.png",
		"images/Plants/IceShroom/0.gif",
		"images/Plants/IceShroom/IceShroom.gif",
		"images/Plants/IceShroom/IceShroomSleep.gif",
		"images/Plants/IceShroom/Snow.gif",
		"images/Plants/IceShroom/icetrap.gif",
	],
	AudioArr: ["frozen", "wakeup"],
	Tooltip: "Temporarily immobilizes all zombies on the screen",
	Produce:
		'<font color="#28325A">Ice-shrooms temporarily immobilize all zombies on the screen.</font><p>Damage: <font color="#CC241D">very light, immobilizes zombies</font><br>Range: <font color="#CC241D">all zombies on the screen</font><br>Usage: <font color="#CC241D">single use, instant</font><br><font color="#8832aa">Sleeps during the day</font></p>Ice-shroom frowns, not because he\'s unhappy or because he disapproves, but because of a childhood injury that left his facial nerves paralyzed.',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth(a) {
		!oS.DKind ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {})) : (a.getHurt = CPlants.prototype.getHurt);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		$(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			100,
			(c) => {
				var f = $P[c];
				if (f) {
					PlayAudio("frozen");
					var e;
					var d;
					var b = "Snow_" + Math.random();
					for (d in $Z) {
						(e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
					}
					oSym.addTask(
						40,
						(g) => {
							ClearChild(g);
						},
						[
							NewEle(
								b,
								"div",
								"position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " +
									(f.pixelLeft - 197) +
									"px " +
									(f.pixelTop - 80) +
									"px",
								0,
								EDPZ
							),
						]
					);
					f.Die();
				}
			},
			[a]
		);
	},
});
var oSeedIceShroom = InheritO(oSeedFumeShroom, {
	EName: "oSeedIceShroom",
	CName: "Ice-shroom",
	width: 83,
	height: 75,
	beAttackedPointR: 63,
	SunNum: 0,
	coolTime: 50,
	PicArr: [
		"images/Card/Plants/IceShroom.png",
		"images/Plants/IceShroom/0.gif",
		"images/Plants/IceShroom/IceShroom.gif",
		"images/Plants/IceShroom/IceShroomSleep.gif",
		"images/Plants/IceShroom/Snow.gif",
		"images/Plants/IceShroom/icetrap.gif",
	],
	AudioArr: ["frozen", "wakeup"],
	Tooltip: "Temporarily immobilizes all zombies on the screen",
	Produce:
		'寒冰菇，能短暂的冻结屏幕上所有僵尸。<p>Harm:<font color="#CC241D">非常低，冻结僵尸</font><br>Scope:<font color="#CC241D">屏幕上的所有僵尸</font><br>用法：<font color="#CC241D">单独使用，立即生效<br>白天睡觉</font></p>寒冰菇皱着眉头，倒不是因为它不高兴或不满</font><br>意，只是因为，它儿时因受创伤而</font><br>遗留下了面瘫。',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth(a) {
		!oS.DKind ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {})) : (a.getHurt = CPlants.prototype.getHurt);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		$(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			100,
			(c) => {
				var f = $P[c];
				if (f) {
					PlayAudio("frozen");
					var e;
					var d;
					var b = "Snow_" + Math.random();
					for (d in $Z) {
						(e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
					}
					oSym.addTask(
						40,
						(g) => {
							ClearChild(g);
						},
						[
							NewEle(
								b,
								"div",
								"position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " +
									(f.pixelLeft - 197) +
									"px " +
									(f.pixelTop - 80) +
									"px",
								0,
								EDPZ
							),
						]
					);
					f.Die();
				}
			},
			[a]
		);
	},
});
var oSunShroom = InheritO(oFumeShroom, {
	EName: "oSunShroom",
	CName: "Sun-shroom",
	width: 59,
	height: 61,
	beAttackedPointL: 15,
	beAttackedPointR: 44,
	SunNum: 25,
	Stature: -1,
	Status: 0,
	PicArr: [
		"images/Card/Plants/SunShroom.png",
		"images/Plants/SunShroom/0.gif",
		"images/Plants/SunShroom/SunShroom2.gif",
		"images/Plants/SunShroom/SunShroomSleep.gif",
		"images/Plants/SunShroom/SunShroom.gif",
	],
	Tooltip: "Gives small sun at first and normal sun later",
	Produce:
		'<font color="#28325A">Sun-shrooms give small sun at first and normal sun later.</font><p>Sun production: <font color="#CC241D">low</font><br><font color="#8832aa">Sleeps during the day</font></p>Sun-shroom hates sun. He hates it so much that when it builds up in his system, he spits it out as fast as he can. He just won\'t abide it. To him, sun is crass.',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth() {},
	BirthStyle(c, d, b, a) {
		oS.DKind
			? ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif"))
			: (oSym.addTask(
					600,
					(h, g, f) => {
						var e = $P[h];
						e && e.ProduceSun(e, g, f);
					},
					[d, GetX(c.C) - 40, GetY(c.R)]
				),
				oSym.addTask(
					12e3,
					(f) => {
						var e = $P[f];
						e && ((e.Sleep = 0), ($(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (e.Status = 1));
					},
					[d]
				));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	ProduceSun(a, c, b) {
		AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0),
			oSym.addTask(
				2400,
				(g, f, e) => {
					var d = $P[g];
					d && d.ProduceSun(d, f, e);
				},
				[a.id, c, b]
			);
	},
	WakeUP(a) {
		var b = a.id;
		a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
		$(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
		a.Sleep = 0;
		oSym.addTask(
			12e3,
			(d) => {
				var c = $P[d];
				c && (($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (c.Status = 1));
			},
			[b]
		);
	},
});
var oDoomShroom = InheritO(oFumeShroom, {
	EName: "oDoomShroom",
	CName: "Doom-shroom",
	width: 102,
	height: 91,
	beAttackedPointR: 80,
	coolTime: 50,
	SunNum: 125,
	AudioArr: ["doomshroom"],
	PicArr: [
		"images/Card/Plants/DoomShroom.png",
		"images/Plants/DoomShroom/0.gif",
		"images/Plants/DoomShroom/DoomShroom.gif",
		"images/Plants/DoomShroom/Sleep.gif",
		"images/Plants/DoomShroom/BeginBoom.gif",
		"images/Plants/DoomShroom/crater10.png",
		"images/Plants/DoomShroom/crater11.png",
		"images/Plants/DoomShroom/crater20.png",
		"images/Plants/DoomShroom/crater21.png",
		"images/Plants/DoomShroom/crater30.png",
		"images/Plants/DoomShroom/crater31.png",
		"images/Plants/DoomShroom/Boom.png",
	],
	Tooltip: "Destroys a large area, leaving a crater in its wake",
	Produce:
		'<font color="#28325A">Doom-shrooms destroy everything in a large area and leave a crater that can\'t be planted on.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a huge area</font><br>Usage: <font color="#CC241D">single use, instant</font><br>Special: <font color="#CC241D">leaves a crater</font><br><font color="#8832aa">Sleeps during the day</font></p>"You\'re lucky I\'m on your side," says Doom-shroom. "I could destroy everything you hold dear. It wouldn\'t be hard."',
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		oS.DKind
			? ((c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]))
			: ((c.Sleep = 0), (c.getHurt = function () {}), (b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif"), c.NormalAttack(d));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		a.getHurt = function () {};
		$(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			50,
			(c) => {
				PlayAudio("doomshroom");
				var d = $P[c];
				var q = c + "_Boom";
				if (d) {
					var g = $(c);
					var l = d.R;
					var h = l > 3 ? l - 2 : 1;
					var f = Math.min(oS.R, l + 2);
					var n = d.pixelLeft - 240;
					var m = d.pixelRight + 240;
					var e;
					var k;
					var b = GetC(d.AttackedLX);
					var o;
					var r = l + "_" + b;
					var j = oGd.$;
					do {
						k = (e = oZ.getArZ(n, m, h)).length;
						while (k--) {
							e[k].getExplosion();
						}
					} while (h++ < f);
					d.Die();
					(o = j[r + "_" + 0]) && o.Die();
					(o = j[r + "_" + 2]) && o.Die();
					oGd.$Crater[r] = 2;
					NewEle(
						q,
						"div",
						"position:absolute;overflow:hidden;z-index:" +
							(d.zIndex + 2) +
							";width:283px;height:324px;left:" +
							(d.pixelLeft - 80) +
							"px;top:" +
							(d.pixelTop - 220) +
							"px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat",
						0,
						EDPZ
					);
					oSym.addTask(
						20,
						(i) => {
							ClearChild(i);
						},
						[
							NewEle(
								q,
								"div",
								"position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5",
								0,
								EDPZ
							),
						]
					);
					ImgSpriter(
						q,
						c,
						[
							["0 0", 10, 1],
							["-283px 0", 10, 2],
							["-566px 0", 10, 3],
							["-849px 0", 10, 4],
							["-1132px 0", 10, 5],
							["-1415px 0", 10, 6],
							["-1698px 0", 10, 7],
							["-1981px 0", 10, 8],
							["-2264px 0", 10, 9],
							["-2547px 0", 10, -1],
						],
						0,
						(i, p) => {
							ClearChild($(i));
							d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50);
						}
					);
				}
			},
			[a]
		);
	},
	setCrater(f, b, d, e, c) {
		var a;
		switch (oGd.$LF[b]) {
			case 1:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" +
						oS.DKind +
						".png) no-repeat;width:90px;height:61px;left:" +
						(e || GetX(d) - 45) +
						"px;top:" +
						(c || GetY(b) - 30) +
						"px",
					0,
					EDPZ
				);
				break;
			case 2:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" +
						oS.DKind +
						".png) no-repeat;width:85px;height:53px;left:" +
						(e || GetX(d) - 42) +
						"px;top:" +
						(c || GetY(b) - 26) +
						"px",
					0,
					EDPZ
				);
				break;
			case 3:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater31.png) no-repeat;width:75px;height:77px;left:" +
						(e || GetX(d) - 37) +
						"px;top:" +
						(c || GetY(b) - 19) +
						"px",
					0,
					EDPZ
				);
				break;
			default:
		}
		oSym.addTask(
			9e3,
			(g) => {
				var h = b + "_" + d;
				g.style.backgroundPosition = "100% 0";
				oGd.$Crater[h] = 1;
				oSym.addTask(
					9e3,
					(i, j) => {
						ClearChild(i);
						delete oGd.$Crater[j];
					},
					[g, h]
				);
			},
			[a]
		);
	},
});
var oSeedDoomShroom = InheritO(oFumeShroom, {
	EName: "oSeedDoomShroom",
	CName: "Doom-shroom",
	width: 102,
	height: 91,
	beAttackedPointR: 80,
	coolTime: 50,
	SunNum: 0,
	AudioArr: ["doomshroom"],
	PicArr: [
		"images/Card/Plants/DoomShroom.png",
		"images/Plants/DoomShroom/0.gif",
		"images/Plants/DoomShroom/DoomShroom.gif",
		"images/Plants/DoomShroom/Sleep.gif",
		"images/Plants/DoomShroom/BeginBoom.gif",
		"images/Plants/DoomShroom/crater10.png",
		"images/Plants/DoomShroom/crater11.png",
		"images/Plants/DoomShroom/crater20.png",
		"images/Plants/DoomShroom/crater21.png",
		"images/Plants/DoomShroom/crater30.png",
		"images/Plants/DoomShroom/crater31.png",
		"images/Plants/DoomShroom/Boom.png",
	],
	Tooltip: "Destroys a large area, leaving a crater in its wake",
	Produce:
		'毁灭菇可以摧毁大范围的僵尸，并留下一个不</font><br>能种植物的大弹坑。<p>Harm:<font color="#CC241D">极高</font><br>Scope:<font color="#CC241D">大范围内的所有僵尸</font><br>用法：<font color="#CC241D">单独使用，立即生效</font><br>Features:<font color="#CC241D">留下一个弹坑<br>白天睡觉</font></p>“你很幸运，我是和你一伙的，”毁灭菇说，“</font><br>我能摧毁任何你所珍视的东西，小菜一碟。”',
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		oS.DKind
			? ((c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]))
			: ((c.Sleep = 0), (c.getHurt = function () {}), (b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif"), c.NormalAttack(d));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		a.getHurt = function () {};
		$(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			50,
			(c) => {
				PlayAudio("doomshroom");
				var d = $P[c];
				var q = c + "_Boom";
				if (d) {
					var g = $(c);
					var l = d.R;
					var h = l > 3 ? l - 2 : 1;
					var f = Math.min(oS.R, l + 2);
					var n = d.pixelLeft - 240;
					var m = d.pixelRight + 240;
					var e;
					var k;
					var b = GetC(d.AttackedLX);
					var o;
					var r = l + "_" + b;
					var j = oGd.$;
					do {
						k = (e = oZ.getArZ(n, m, h)).length;
						while (k--) {
							e[k].getExplosion();
						}
					} while (h++ < f);
					d.Die();
					(o = j[r + "_" + 0]) && o.Die();
					(o = j[r + "_" + 2]) && o.Die();
					oGd.$Crater[r] = 2;
					NewEle(
						q,
						"div",
						"position:absolute;overflow:hidden;z-index:" +
							(d.zIndex + 2) +
							";width:283px;height:324px;left:" +
							(d.pixelLeft - 80) +
							"px;top:" +
							(d.pixelTop - 220) +
							"px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat",
						0,
						EDPZ
					);
					oSym.addTask(
						20,
						(i) => {
							ClearChild(i);
						},
						[
							NewEle(
								q,
								"div",
								"position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5",
								0,
								EDPZ
							),
						]
					);
					ImgSpriter(
						q,
						c,
						[
							["0 0", 10, 1],
							["-283px 0", 10, 2],
							["-566px 0", 10, 3],
							["-849px 0", 10, 4],
							["-1132px 0", 10, 5],
							["-1415px 0", 10, 6],
							["-1698px 0", 10, 7],
							["-1981px 0", 10, 8],
							["-2264px 0", 10, 9],
							["-2547px 0", 10, -1],
						],
						0,
						(i, p) => {
							ClearChild($(i));
							d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50);
						}
					);
				}
			},
			[a]
		);
	},
	setCrater(f, b, d, e, c) {
		var a;
		switch (oGd.$LF[b]) {
			case 1:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" +
						oS.DKind +
						".png) no-repeat;width:90px;height:61px;left:" +
						(e || GetX(d) - 45) +
						"px;top:" +
						(c || GetY(b) - 30) +
						"px",
					0,
					EDPZ
				);
				break;
			case 2:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" +
						oS.DKind +
						".png) no-repeat;width:85px;height:53px;left:" +
						(e || GetX(d) - 42) +
						"px;top:" +
						(c || GetY(b) - 26) +
						"px",
					0,
					EDPZ
				);
				break;
			case 3:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater31.png) no-repeat;width:75px;height:77px;left:" +
						(e || GetX(d) - 37) +
						"px;top:" +
						(c || GetY(b) - 19) +
						"px",
					0,
					EDPZ
				);
				break;
			default:
		}
		oSym.addTask(
			9e3,
			(g) => {
				var h = b + "_" + d;
				g.style.backgroundPosition = "100% 0";
				oGd.$Crater[h] = 1;
				oSym.addTask(
					9e3,
					(i, j) => {
						ClearChild(i);
						delete oGd.$Crater[j];
					},
					[g, h]
				);
			},
			[a]
		);
	},
});
var oTangleKlep = InheritO(CPlants, {
	EName: "oTangleKlep",
	CName: "Tangle Kelp",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	coolTime: 30,
	SunNum: 25,
	BookHandBack: 4.9,
	GetDY(b, c, a) {
		return 5;
	},
	NormalGif: 1,
	AudioArr: ["TangleKlep"],
	PicArr: [
		"images/Card/Plants/TangleKlep.png",
		"images/Plants/TangleKlep/0.gif",
		"images/Plants/TangleKlep/Float.gif",
		"images/Plants/TangleKlep/Grab.png",
		"images/interface/splash.png",
	],
	Tooltip: "Aquatic plant that pulls a zombie underwater",
	Produce:
		'<font color="#28325A">Tangle Kelp are aquatic plants that pull the first zombie that nears them underwater.</font><p>Damage: <font color="#CC241D">massive</font><br>Usage: <font color="#CC241D">single use, on contact</font><br><font color="#0ca1db">Must be planted in water</font></p>"I\'m totally invisible," Tangle Kelp thinks to himself. "I\'ll hide here just below the surface and nobody will see me." His friends tell him they can see him perfectly well, but he\'ll never change.',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(oGd.$LF[b] !== 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1] || oGd.$Tombstones[a]);
	},
	getShadow(a) {
		return "display:none";
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	getHurt(d, b, a) {
		var c = this;
		b === 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
	},
	TriggerCheck(b, a) {
		b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
	},
	NormalAttack(a, b) {
		a.getHurt = function () {};
		b.getHurt = function () {};
		b.beAttacked = 0;
		b.isAttacking = 1;
		NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
		oSym.addTask(
			50,
			(g, h) => {
				PlayAudio("TangleKlep");
				var e = g.id;
				var f = h.id;
				var d = e + "_splash";
				var c = f + "_splash";
				NewEle(
					d,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(g.pixelLeft - 4) +
						"px;top:" +
						(g.pixelTop - 16) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				NewEle(
					c,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(h.AttackedLX - 10) +
						"px;top:" +
						(h.pixelTop + h.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				ImgSpriter(
					d,
					e,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				ImgSpriter(
					c,
					f,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				h.DisappearDie();
				g.Die();
			},
			[a, b]
		);
	},
});
var oSeedTangleKelp = InheritO(CPlants, {
	EName: "oSeedTangleKelp",
	CName: "Tangle Kelp",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	coolTime: 30,
	SunNum: 0,
	BookHandBack: 4.9,
	GetDY(b, c, a) {
		return 5;
	},
	NormalGif: 1,
	AudioArr: ["TangleKlep"],
	PicArr: [
		"images/Card/Plants/TangleKlep.png",
		"images/Plants/TangleKlep/0.gif",
		"images/Plants/TangleKlep/Float.gif",
		"images/Plants/TangleKlep/Grab.png",
		"images/interface/splash.png",
	],
	Tooltip: "Aquatic plant that pulls a zombie underwater",
	Produce:
		'缠绕水草是一种可以把接近他的僵尸拉进水中</font><br>的水生植物。<p>Harm:<font color="#CC241D">极高</font><br>用法：<font color="#CC241D">单独使用，接触后生效</font><br>Features:<font color="#CC241D">必须种在水中</font></p>“我是完全隐形的，”缠绕水草自己想，“我就</font><br>藏在水面下，没人会看到我。”他的朋友告诉他</font><br>，他们可以清楚地看到他。不过，缠绕水草似</font><br>乎不想改变自己的看法。',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(oGd.$LF[b] !== 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1] || oGd.$Tombstones[a]);
	},
	getShadow(a) {
		return "display:none";
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	getHurt(d, b, a) {
		var c = this;
		b === 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
	},
	TriggerCheck(b, a) {
		b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
	},
	NormalAttack(a, b) {
		a.getHurt = function () {};
		b.getHurt = function () {};
		b.beAttacked = 0;
		b.isAttacking = 1;
		NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
		oSym.addTask(
			50,
			(g, h) => {
				PlayAudio("TangleKlep");
				var e = g.id;
				var f = h.id;
				var d = e + "_splash";
				var c = f + "_splash";
				NewEle(
					d,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(g.pixelLeft - 4) +
						"px;top:" +
						(g.pixelTop - 16) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				NewEle(
					c,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(h.AttackedLX - 10) +
						"px;top:" +
						(h.pixelTop + h.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				ImgSpriter(
					d,
					e,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				ImgSpriter(
					c,
					f,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				h.DisappearDie();
				g.Die();
			},
			[a, b]
		);
	},
});
var oSeaShroom = InheritO(oPuffShroom, {
	EName: "oSeaShroom",
	CName: "Sea-shroom",
	width: 48,
	height: 99,
	beAttackedPointL: 10,
	beAttackedPointR: 40,
	coolTime: 30,
	BookHandBack: 4.9,
	Sleep: 0,
	getShadow(a) {
		return "display:none";
	},
	PicArr: [
		"images/Card/Plants/SeaShroom.png",
		"images/Plants/SeaShroom/0.gif",
		"images/Plants/SeaShroom/SeaShroom.gif",
		"images/Plants/SeaShroom/SeaShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	Tooltip: "Aquatic plant that shoots short-ranged spores",
	Produce:
		'<font color="#28325A">Sea-shrooms are aquatic plants that shoot short ranged spores.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">short</font><br><font color="#0ca1db">Must be planted in water</font><br><font color="#8832aa">Sleeps during the day</font></p>Sea-shroom has never seen the sea. It\'s in his name, he\'s heard loads about it, but he\'s just never found the time. One day, though, it\'ll go down.',
});
oSeedSeaShroom = InheritO(oPuffShroom, {
	EName: "oSeedSeaShroom",
	CName: "Sea-shroom",
	width: 48,
	height: 99,
	beAttackedPointL: 10,
	beAttackedPointR: 40,
	coolTime: 30,
	BookHandBack: 4.9,
	Sleep: 0,
	getShadow(a) {
		return "display:none";
	},
	PicArr: [
		"images/Card/Plants/SeaShroom.png",
		"images/Plants/SeaShroom/0.gif",
		"images/Plants/SeaShroom/SeaShroom.gif",
		"images/Plants/SeaShroom/SeaShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	Tooltip: "Aquatic plant that shoots short-ranged spores",
	Produce:
		'海蘑菇，能够发射短程孢子的水生植物。<p>Harm:<font color="#CC241D">普通</font><br>射程：<font color="#CC241D">短<br>必须种在水上</font></p>海蘑菇从来没看到过大海，大海就在他的名字</font><br>里，他总听到关于大海的事。他只是没找到合适的</font><br>时间，总有一天……是的，他会见到海的。',
});
(oCactus = InheritO(CPlants, {
	EName: "oCactus",
	CName: "Cactus",
	width: 122,
	height: 157,
	SunNum: 125,
	beAttackedPointL: 10,
	beAttackedPointR: 80,
	AudioArr: ["plantgrow"],
	Status: 0,
	PicArr: (function () {
		return [
			"images/Card/Plants/Cactus.png",
			"images/Plants/Cactus/0.gif",
			"images/Plants/Cactus/Cactus.gif",
			"images/Plants/Cactus/Cactus2.gif",
			"images/Plants/Cactus/Attack.gif",
			"images/Plants/Cactus/Attack2.gif",
			"images/Plants/Cactus/Elongation.gif",
			"images/Plants/Cactus/Shorten.gif",
			"images/Plants/Cactus/Projectile32.png",
		];
	})(),
	Tooltip: "Shoots spikes that can pop balloons",
	Produce:
		'<font color="#28325A">Cactuses shoot spikes that can hit both ground and air targets.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">ground and air</font><p>She\'s prickly, sure, but Cactus\'s spikes belie a spongy heart filled with love and goodwill. She just wants to hug and be hugged. Most folks can\'t hang with that, but Cactus doesn\'t mind. She\'s been seeing an armadillo for a while and it really seems to be working out.',
	getShadow(a) {
		return "left:3px;top:132px";
	},
	PrivateBirth(a) {
		a.ES = a.Elongation;
	},
	TriggerCheck(b, a) {
		this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CheckLoop(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		this.ES();
		this.Status === 0 &&
			oSym.addTask(
				140,
				(e, f, h) => {
					var g;
					(g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
				},
				[a, b, c]
			);
	},
	CheckLoop2(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		this.ES();
		this.Status &&
			oSym.addTask(
				150,
				(e, f, h) => {
					var g;
					(g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
				},
				[a, b, c]
			);
	},
	AttackCheck1(g, f) {
		var b = this;
		var c = b.oTrigger;
		var a = $Z[g];
		var h;
		var e;
		var k;
		var j;
		if (a && a.PZ && (h = c[a.R])) {
			k = a.ZX;
			e = h.length;
			while (e--) {
				j = h[e];
				if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
					b.CheckLoop(g, j[2]);
					return;
				}
			}
		}
		b.canTrigger = 1;
	},
	AttackCheck12(a, c) {
		var b = this;
		b.CheckLoop(a, c);
	},
	Elongation() {
		var a = this;
		var b = a.id;
		if (!oGd.$Balloon[a.R] > 0) {
			return true;
		}
		PlayAudio("plantgrow");
		a.canTrigger = 0;
		a.Status = 1;
		$(b).childNodes[1].src = "images/Plants/Cactus/Elongation.gif";
		oSym.addTask(
			1,
			(e) => {
				var d = $P[e];
				var c;
				if (d) {
					d.NormalGif = 3;
					$(e).childNodes[1].src = "images/Plants/Cactus/Cactus2.gif";
					c = d.CheckLoop;
					d.CheckLoop = d.CheckLoop2;
					d.CheckLoop2 = c;
					c = d.NormalAttack;
					d.NormalAttack = d.NormalAttack2;
					d.NormalAttack2 = c;
					d.ES = d.Shorten;
					d.canTrigger = 1;
				}
			},
			[b]
		);
		return false;
	},
	Shorten() {
		var a = this;
		var b = a.id;
		if (oGd.$Balloon[a.R] > 0) {
			return true;
		}
		a.canTrigger = 0;
		a.Status = 0;
		$(b).childNodes[1].src = "images/Plants/Cactus/Shorten.gif";
		oSym.addTask(
			1,
			(e) => {
				var d = $P[e];
				var c;
				if (d) {
					d.NormalGif = 2;
					$(e).childNodes[1].src = "images/Plants/Cactus/Cactus.gif";
					c = d.CheckLoop;
					d.CheckLoop = d.CheckLoop2;
					d.CheckLoop2 = c;
					c = d.NormalAttack;
					d.NormalAttack = d.NormalAttack2;
					d.NormalAttack2 = c;
					d.ES = d.Elongation;
					d.canTrigger = 1;
				}
			},
			[b]
		);
		return false;
	},
	NormalAttack() {
		var b = this;
		var c = "CB" + Math.random();
		var a = b.id;
		$(a).childNodes[1].src = "images/Plants/Cactus/Attack.gif";
		oSym.addTask(
			40,
			(e) => {
				var d = $(e);
				d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus.gif");
			},
			[a]
		);
		NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
		oSym.addTask(
			30,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		oSym.addTask(
			1,
			function (g, i, d, k, h, l) {
				var j;
				var f = GetC(k);
				var e = oZ["getZ" + d](k, h);
				e && e.Altitude === 1
					? (e.getPea(e, 30, d), ClearChild(i))
					: (k += j = !d ? 5 : -5) < oS.W && k > 100
						? ((i.style.left = (l += j) + "px"), oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
						: ClearChild(i);
			},
			[c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
		);
	},
	NormalAttack2() {
		var b = this;
		var c = "CB" + Math.random();
		var a = b.id;
		$(a).childNodes[1].src = "images/Plants/Cactus/Attack2.gif";
		oSym.addTask(
			50,
			(e) => {
				var d = $(e);
				d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus2.gif");
			},
			[a]
		);
		NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
		oSym.addTask(
			20,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		oSym.addTask(
			1,
			function (g, i, d, k, h, l) {
				var j;
				var f = GetC(k);
				var e = oZ["getZ" + d](k, h);
				e && e.Altitude === 3
					? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i))
					: (k += j = !d ? 5 : -5) < oS.W && k > 100
						? ((i.style.left = (l += j) + "px"), oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
						: ClearChild(i);
			},
			[c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
		);
	},
})),
	(oSeedCactus = InheritO(CPlants, {
		EName: "oSeedCactus",
		CName: "Cactus",
		width: 122,
		height: 157,
		SunNum: 0,
		beAttackedPointL: 10,
		beAttackedPointR: 80,
		AudioArr: ["plantgrow"],
		Status: 0,
		PicArr: (function () {
			return [
				"images/Card/Plants/Cactus.png",
				"images/Plants/Cactus/0.gif",
				"images/Plants/Cactus/Cactus.gif",
				"images/Plants/Cactus/Cactus2.gif",
				"images/Plants/Cactus/Attack.gif",
				"images/Plants/Cactus/Attack2.gif",
				"images/Plants/Cactus/Elongation.gif",
				"images/Plants/Cactus/Shorten.gif",
				"images/Plants/Cactus/Projectile32.png",
			];
		})(),
		Tooltip: "Shoots spikes that can pop balloons",
		Produce:
			'仙人掌发射的穿刺弹可以用来打击地面和空中</font><br>目标<p>Harm:<font color="#CC241D">中等</font><br>Scope:<font color="#CC241D">地面和空中</font></p>确实，仙人掌非常“刺儿”，但是她的刺下，隐</font><br>藏着颗温柔的心，充满着爱和善良。她只是想拥</font><br>抱别人，和被别人拥抱。大多数人都做不到这点</font><br>，但是仙人掌她并不介意。她盯着一只铠甲鼠好</font><br>一阵子了，这次好像真的可以抱抱了。',
		getShadow(a) {
			return "left:3px;top:132px";
		},
		PrivateBirth(a) {
			a.ES = a.Elongation;
		},
		TriggerCheck(b, a) {
			this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
		},
		CheckLoop(b, c) {
			var a = this.id;
			this.NormalAttack(b);
			this.ES();
			this.Status === 0 &&
				oSym.addTask(
					140,
					(e, f, h) => {
						var g;
						(g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
					},
					[a, b, c]
				);
		},
		CheckLoop2(b, c) {
			var a = this.id;
			this.NormalAttack(b);
			this.ES();
			this.Status &&
				oSym.addTask(
					150,
					(e, f, h) => {
						var g;
						(g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
					},
					[a, b, c]
				);
		},
		AttackCheck1(g, f) {
			var b = this;
			var c = b.oTrigger;
			var a = $Z[g];
			var h;
			var e;
			var k;
			var j;
			if (a && a.PZ && (h = c[a.R])) {
				k = a.ZX;
				e = h.length;
				while (e--) {
					j = h[e];
					if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
						b.CheckLoop(g, j[2]);
						return;
					}
				}
			}
			b.canTrigger = 1;
		},
		AttackCheck12(a, c) {
			var b = this;
			b.CheckLoop(a, c);
		},
		Elongation() {
			var a = this;
			var b = a.id;
			if (!oGd.$Balloon[a.R] > 0) {
				return true;
			}
			PlayAudio("plantgrow");
			a.canTrigger = 0;
			a.Status = 1;
			$(b).childNodes[1].src = "images/Plants/Cactus/Elongation.gif";
			oSym.addTask(
				1,
				(e) => {
					var d = $P[e];
					var c;
					if (d) {
						d.NormalGif = 3;
						$(e).childNodes[1].src = "images/Plants/Cactus/Cactus2.gif";
						c = d.CheckLoop;
						d.CheckLoop = d.CheckLoop2;
						d.CheckLoop2 = c;
						c = d.NormalAttack;
						d.NormalAttack = d.NormalAttack2;
						d.NormalAttack2 = c;
						d.ES = d.Shorten;
						d.canTrigger = 1;
					}
				},
				[b]
			);
			return false;
		},
		Shorten() {
			var a = this;
			var b = a.id;
			if (oGd.$Balloon[a.R] > 0) {
				return true;
			}
			a.canTrigger = 0;
			a.Status = 0;
			$(b).childNodes[1].src = "images/Plants/Cactus/Shorten.gif";
			oSym.addTask(
				1,
				(e) => {
					var d = $P[e];
					var c;
					if (d) {
						d.NormalGif = 2;
						$(e).childNodes[1].src = "images/Plants/Cactus/Cactus.gif";
						c = d.CheckLoop;
						d.CheckLoop = d.CheckLoop2;
						d.CheckLoop2 = c;
						c = d.NormalAttack;
						d.NormalAttack = d.NormalAttack2;
						d.NormalAttack2 = c;
						d.ES = d.Elongation;
						d.canTrigger = 1;
					}
				},
				[b]
			);
			return false;
		},
		NormalAttack() {
			var b = this;
			var c = "CB" + Math.random();
			var a = b.id;
			$(a).childNodes[1].src = "images/Plants/Cactus/Attack.gif";
			oSym.addTask(
				40,
				(e) => {
					var d = $(e);
					d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus.gif");
				},
				[a]
			);
			NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
			oSym.addTask(
				30,
				(e) => {
					var d = $(e);
					d && SetVisible(d);
				},
				[c]
			);
			oSym.addTask(
				1,
				function (g, i, d, k, h, l) {
					var j;
					var f = GetC(k);
					var e = oZ["getZ" + d](k, h);
					e && e.Altitude === 1
						? (e.getPea(e, 30, d), ClearChild(i))
						: (k += j = !d ? 5 : -5) < oS.W && k > 100
							? ((i.style.left = (l += j) + "px"), oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
							: ClearChild(i);
				},
				[c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
			);
		},
		NormalAttack2() {
			var b = this;
			var c = "CB" + Math.random();
			var a = b.id;
			$(a).childNodes[1].src = "images/Plants/Cactus/Attack2.gif";
			oSym.addTask(
				50,
				(e) => {
					var d = $(e);
					d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus2.gif");
				},
				[a]
			);
			NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
			oSym.addTask(
				20,
				(e) => {
					var d = $(e);
					d && SetVisible(d);
				},
				[c]
			);
			oSym.addTask(
				1,
				function (g, i, d, k, h, l) {
					var j;
					var f = GetC(k);
					var e = oZ["getZ" + d](k, h);
					e && e.Altitude === 3
						? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i))
						: (k += j = !d ? 5 : -5) < oS.W && k > 100
							? ((i.style.left = (l += j) + "px"), oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
							: ClearChild(i);
				},
				[c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
			);
		},
	})),
	(oBlover = InheritO(CPlants, {
		EName: "oBlover",
		CName: "Blover",
		width: 132,
		beAttackedPointR: 98,
		height: 110,
		SunNum: 100,
		PicArr: ["images/Card/Plants/Blover.png", "images/Plants/Blover/0.gif", "images/Plants/Blover/Blover.gif"],
		Tooltip: "Blows away all balloon zombies and fog",
		Produce:
			'三叶草，能吹走所有的气球僵尸，也可以把雾吹散。<p>使用方法：<font color="#CC241D">单独使用，立即生效</font><br>特点：<font color="#CC241D">吹走屏幕上所有的气球僵尸</font></p>当三叶草五岁生日的时候，他得到了一个闪亮的生日蛋糕。他许好愿，然后深吸一口气却只吹灭了60%的蜡烛。然而他没有放弃，小时候的那次失败促使他更加努力直到现在。',
		AudioArr: ["blover"],
		InitTrigger() {},
		PrivateBirth(o) {
			// 种植后0.5秒开始吹风
			oSym.addTask(
				50,
				(id) => {
					PlayAudio("blover"), ($(id).childNodes[1].src = "images/Plants/Blover/BloverBlow.gif"), $P[id].Dispel();
				},
				[o.id]
			);
		},
		Dispel() {
			// 吹风
			var { id } = this;
			var z;
			var oBalloon;

			for (z in $Z) {
				(oBalloon = $Z[z]), oBalloon.EName === "oBalloonZombie" && oBalloon.getDispelled();
			} //把气球吹跑

			if (oS.HaveFog) {
				// 如果场地上有雾，驱散
				oGd.MoveFogRight(); // 驱散雾
				oSym.addTask(2400 + 150, oGd.MoveFogLeft, []); // 24s后恢复
			}

			oSym.addTask(
				150,
				(id) => {
					var p = $P[id];
					p && p.Die();
				},
				[id]
			);
		},
	})),
	(oSeedBlover = InheritO(CPlants, {
		EName: "oSeedBlover",
		CName: "Blover",
		width: 146,
		beAttackedPointR: 98,
		height: 110,
		SunNum: 0,
		PicArr: ["images/Card/Plants/Blover.png", "images/Plants/Blover/0.gif", "images/Plants/Blover/Blover.gif"],
		Tooltip: "Blows away all balloon zombies and fog",
		Produce:
			'三叶草，能吹走所有的气球僵尸，也可以把雾吹散。<p>使用方法：<font color="#CC241D">单独使用，立即生效</font><br>特点：<font color="#CC241D">吹走屏幕上所有的气球僵尸</font></p>当三叶草五岁生日的时候，他得到了一个闪亮的生日蛋糕。他许好愿，然后深吸一口气却只吹灭了60%的蜡烛。然而他没有放弃，小时候的那次失败促使他更加努力直到现在。',
		AudioArr: ["blover"],
		InitTrigger() {},
		PrivateBirth(o) {
			// 种植后0.5秒开始吹风
			oSym.addTask(
				50,
				(id) => {
					PlayAudio("blover"), ($(id).childNodes[1].src = "images/Plants/Blover/BloverBlow.gif"), $P[id].Dispel();
				},
				[o.id]
			);
		},
		Dispel() {
			// 吹风
			var { id } = this;
			var z;
			var oBalloon;

			for (z in $Z) {
				(oBalloon = $Z[z]), oBalloon.EName === "oBalloonZombie" && oBalloon.getDispelled();
			} //把气球吹跑

			if (oS.HaveFog) {
				// 如果场地上有雾，驱散
				oGd.MoveFogRight(); // 驱散雾
				oSym.addTask(2400 + 150, oGd.MoveFogLeft, []); // 24s后恢复
			}

			oSym.addTask(
				150,
				(id) => {
					var p = $P[id];
					p && p.Die();
				},
				[id]
			);
		},
	})),
	(oOxygen = InheritO(CPlants, {
		EName: "oOxygen",
		CName: "Oxygen",
		width: 115,
		height: 102,
		beAttackedPointR: 53,
		SunNum: 25,
		HP: 300,
		BookHandBack: 3.5,
		coolTime: 7.5,
		PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen.gif"],
		Tooltip: "Oxygen provides algae to plants on the ground",
		Produce:
			'<font color="#28325A">Oxygen Algae can provide oxygen bubbles to plants on land</font><p>Range: <font color="#CC241D">all tiles in a medium area</font><br></p>"Puff...puff..." puffs Oxygen Algae, it wasn\'t that he was willing to keep spitting bubbles, only to blame him for drinking too much soda last night. However, there are rumors that all he knows is spitting bubbles.',
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		NormalAttack() {},
		PrivateBirth(a) {
			var { R } = a;
			var { C } = a;
			var R1;
			var C1;
			var MaxR = oS.R;
			var MaxC = oS.C;
			var LF = oGd.$LF;
			var LFR;
			var _$ = oGd.$;
			var rc;

			for (R1 = R - 1; R1 <= R + 1; R1++) {
				if (R1 > 0 && R1 <= MaxR) {
					LFR = LF[R];
					for (C1 = C - 1; C1 <= C + 1; C1++) {
						if (C1 > 0 && C1 <= MaxC && (LFR === 1 || LFR === 3)) {
							rc = R1 + "_" + C1 + "_";
							!(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oOG, R1, C1);
						}
					}
				}
			}
		},
	})),
	(oFlamesMushroom = InheritO(CPlants, {
		EName: "oFlamesMushroom",
		CName: "Fire-shroom",
		width: 102,
		height: 91,
		beAttackedPointR: 80,
		SunNum: 200,
		HP: 4e3,
		BookHandBack: 2.5,
		coolTime: 30,
		PicArr: [
			"images/Card/Plants/FlamesMushroom.png",
			"images/Plants/FlamesMushroom/0.gif",
			"images/Plants/FlamesMushroom/FlamesMushroom.gif",
			"images/Plants/FlamesMushroom/FlamesMushroom1.gif",
			"images/Plants/FlamesMushroom/FlamesMushroom2.gif",
		],
		Tooltip: "烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸",
		Produce:
			'烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸<p>Toughness:<font color="CC241D">高</font><p><font color="#000000">技能：<font color="#1F470B">在自身3x3范围内召唤8只毁灭菇</font></p>烈焰菇总是为自己的火焰感到反感，因为它们</font><br>总是伤害到自己的朋友。所以为了朋友，烈焰</font><br>菇到花园里找到了自己的归宿。',
		getHurt(e, b, a) {
			var c = this;
			var d = $(c.id).childNodes[1];
			!(b % 3)
				? (c.HP -= a) < 1
					? c.Die()
					: c.HP < 2667
						? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/FlamesMushroom/FlamesMushroom2.gif"))
						: c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/FlamesMushroom/FlamesMushroom1.gif"))
				: c.Die(1);
		},
		NormalAttack() {},
		PrivateBirth(a) {
			var { R } = a;
			var { C } = a;
			var R1;
			var C1;
			var MaxR = oS.R;
			var MaxC = oS.C;
			var LF = oGd.$LF;
			var LFR;
			var _$ = oGd.$;
			var rc;
			for (R1 = R - 1; R1 <= R + 1; R1++) {
				if (R1 > 0 && R1 <= MaxR) {
					LFR = LF[R];
					for (C1 = C - 1; C1 <= C + 1; C1++) {
						if (C1 > 0 && C1 <= MaxC && (LFR === 1 || LFR === 3)) {
							rc = R1 + "_" + C1 + "_";
							!(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oDoomShroom, R1, C1);
						}
					}
				}
			}
		},
	})),
	(oOG = InheritO(CPlants, {
		EName: "oOG",
		CName: "Oxygen",
		width: 72,
		height: 68,
		beAttackedPointR: 52,
		SunNum: 0,
		canEat: 0,
		BookHandBack: 5,
		PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen1.gif"],
		PKind: 0,
		Stature: -1,
		GetDY(b, c, a) {
			return -15;
		},
		getShadow(a) {
			return "display:none";
			return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
		},
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		Tooltip: "",
		Produce: "",
		InitTrigger() {},
	})),
	(oPlantern = InheritO(CPlants, {
		EName: "oPlantern",
		CName: "Plantern",
		width: 250,
		height: 242,
		beAttackedPointL: 105,
		beAttackedPointR: 145,
		canEat: 1,
		BookHandBack: 2.5,
		SunNum: 25,
		PicArr: ["images/Card/Plants/Plantern.png", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif"],
		Tooltip: "Lights up an area, letting you see through fog",
		Produce:
			"<font color=\"#28325A\">Planterns light up an area, letting you see through fog.</font><p>Range: <font color=\"#CC241D\">one lane</font><br>Special: <font color=\"#CC241D\">lets you see through fog</font><p>Plantern defies science. He just does. Other plants eat light and excrete oxygen; Plantern eats darkness and excretes light. Plantern's cagey about how he does it. \"I'm not gonna say 'sorcery,' I wouldn't use the term 'dark forces,' I just... I think I've said enough.\"",
		PrivateBirth(c) {
			var a = c.R;
			var b = c.C;
			oGd.$Plantern[a + "_" + b] = c.id;
			NewImg("", "images/Plants/Plantern/light.gif", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
			oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0), oFlowerVase.prototype.FreshXRay(); // 刷新场地上花瓶 XRAY
		},
		InitTrigger() {},
		PrivateDie(c) {
			var a = c.R;
			var b = c.C;
			delete oGd.$Plantern[a + "_" + b];
			oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1), oFlowerVase.prototype.FreshXRay(); // 刷新场地上花瓶 XRAY
		},
		GetDY(b, c, a) {
			return a[0] ? 70 : 74;
		},
		getShadow(a) {
			return "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px";
		},
	})),
	(oSeedPlantern = InheritO(CPlants, {
		EName: "oSeedPlantern",
		CName: "Plantern",
		width: 250,
		height: 237,
		beAttackedPointL: 105,
		beAttackedPointR: 145,
		coolTime: 30,
		BookHandBack: 2,
		SunNum: 0,
		PicArr: ["images/Card/Plants/Plantern.png", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif", "images/Plants/Plantern/light.gif"],
		Tooltip: "照亮一片区域, 让玩家可以看穿战场迷雾",
		Produce:
			'灯笼草，能照亮一片区域，让你看清战场迷雾<p>范围：<font color="#CC241D">一片圆形区域</font><br>特点：<font color="#CC241D">使你看清战场迷雾</font></p>灯笼草拒绝科学，他只会埋头苦干。其他植物吃的是光，挤出的是氧气。灯笼草吃的是黑暗，挤出的却是光。对于他如何能产生光这件事，灯笼草持谨慎态度。“我不会说这是‘巫术’，我也不会使用‘黑暗力量’，我只是……我想我说得够多的了。”',
		PrivateBirth(c) {
			var a = c.R;
			var b = c.C;
			oGd.$Plantern[a + "_" + b] = c.id;
			NewImg("", "images/Plants/Plantern/light.gif", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
			oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0), oFlowerVase.prototype.FreshXRay(); // 刷新场地上花瓶 XRAY
		},
		InitTrigger() {},
		PrivateDie(c) {
			var a = c.R;
			var b = c.C;
			delete oGd.$Plantern[a + "_" + b];
			oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1), oFlowerVase.prototype.FreshXRay(); // 刷新场地上花瓶 XRAY
		},
		GetDY(b, c, a) {
			return a[0] ? 70 : 74;
		},
		getShadow(a) {
			return "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px";
		},
	})),
	(ostar = InheritO(CPlants, {
		EName: "ostar",
		CName: "Sea Starfruit",
		width: 71,
		height: 71,
		beAttackedPointL: 10,
		beAttackedPointR: 61,
		SunNum: 75,
		HP: 4e3,
		canEat: 0,
		BookHandBack: 3.5,
		Tooltip: "Sea Starfruit rolls and destroys any obstacles in its way",
		Produce:
			'<font color="#28325A">Sea Starfruits roll and ricochet on any obstacles in their way.</font><p>Damage: <font color="#CC241D">medium</font><br>Range: <font color="#CC241D">all zombies that it hits</font><br>Special: <font color="#CC241D">ricochets when it hits an obstacle</font></p>Sea Starfruit always has a charming smile. No one knows the secret of him not feeling dizzy despite always spinning in circles. Some say the reason being him looking at one fixed point cross-eyed.',
		PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
		AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
		CanAttack: 1,
		InitTrigger() {},
		getHurt() {},
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		NormalAttack: null,
		PrivateBirth(c) {
			var d = $(c.id);
			PlayAudio("seastar_roll");
			(function (z, y, q, r, p, x, e, g, b) {
				var a = z.R;
				var l = z.C;
				var A;
				var u;
				var s;
				var v = 0;
				var w;
				var i;
				var t = false;
				if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
					u = A.id;
					//           PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
					switch (A.Ornaments) {
						case 0:
							A.NormalDie();
							break;
						case 1:
							A.getHit0(A, Math.min(A.OrnHP, 900), 0);
							break;
						default:
							z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
					}
					z.CanAttack = 0;
					switch (a) {
						case oS.R:
							e = -1;
							break;
						case 1:
							e = 1;
							break;
						default:
							switch (e) {
								case 1:
									e = -1;
									break;
								case -1:
									e = 1;
									break;
								default:
									e = Math.random() > 0.5 ? 1 : -1;
							}
					}
					oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
				} else {
					switch (e) {
						case 1:
							z.pixelBottom + 2 > b && (e = -1);
							break;
						case -1:
							z.pixelBottom - 2 < g && (e = 1);
							break;
					}
					q > y
						? z.Die()
						: ((i = GetC((z.pixelRight += 2))),
							(z.AttackedLX = q += 2),
							(z.AttackedRX = r += 2),
							(w = GetR((z.pixelBottom += e * 2))),
							SetStyle(x, {
								left: (z.pixelLeft = p += 2) + "px",
								top: (z.pixelTop += e * 2) + "px",
							}),
							w !== a && ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
							i !== l && ((z.C = i), (t = true)),
							t &&
								(oGd.del({
									R: a,
									C: l,
									PKind: 1,
								}),
								oGd.add(z, w + "_" + i + "_1")),
							oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
				}
			})(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
		},
	})),
	(ostar1 = InheritO(oNutBowling, {
		EName: "ostar1",
		CName: "Sea Starfruitt",
		width: 71,
		height: 71,
		beAttackedPointL: 10,
		beAttackedPointR: 61,
		SunNum: 75,
		coolTime: 50,
		HP: 0,
		canEat: 0,
		BookHandBack: 3,
		Stature: 1,
		PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
		Tooltip: "",
		Produce: "",
		PrivateBirth(a) {
			PlayAudio("bowling");
			(function (b, c, n, m, e, g) {
				var d = oZ.getArZ(n, m, e);
				var f = d.length;
				var k;
				var j;
				var l = b.R;
				var h = b.C;
				while (f--) {
					(k = d[f]).getCrushed(b) && k.CrushDie();
				}
				n > c
					? b.Die()
					: ((j = GetC((b.pixelRight += 2))),
						(b.AttackedLX = n += 2),
						(b.AttackedRX = m += 2),
						(g.style.left = (b.pixelLeft += 2) + "px"),
						j !== h &&
							((b.C = j),
							oGd.del({
								R: l,
								C: h,
								PKind: 1,
							}),
							oGd.add(b, l + "_" + j + "_1")),
						oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]));
			})(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
		},
	})),
	(oGun = InheritO(oPuffShroom, {
		EName: "oGun",
		CName: "Soak-shroom",
		Sleep: 0,
		width: 100,
		height: 100,
		beAttackedPointL: 15,
		beAttackedPointR: 25,
		BookHandBack: 3.5,
		SunNum: 25,
		PicArr: [
			"images/Card/Plants/gun.png",
			"images/Plants/gun/0.gif",
			"images/Plants/gun/SeaShroom.gif",
			"images/Plants/gun/SeaShroomSleep.gif",
			"images/Plants/gun/ShroomBullet.gif",
			"images/Plants/gun/ShroomBulletHit.gif",
		],
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		Tooltip: "轻型海底作战植物",
		Produce:
			'<font color="#28325A">Soak-shrooms are pretty cheap, but have a short range.</font><p>Damage: <font color="#CC241D">low</font><br>Range: <font color="#CC241D">short</font></p>Inhale, exhale; this anemone\'s unlocked zen breathing from ancient scrolls, training nonstop to blast its watergun past three tiles. Still a long shot, but its focus? Undeniable.',
		PrivateBirth(a) {
			a.BulletEle = NewImg(
				0,
				"images/Plants/gun/ShroomBullet.gif",
				"left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2)
			);
		},
		BirthStyle(c, d, b, a) {
			EditEle(
				b,
				{
					id: d,
				},
				a,
				EDPZ
			);
		},
		PrivateDie(a) {
			a.BulletEle = null;
		},
		NormalAttack() {
			PlayAudio("puff");
			var k = this;
			var b = this;
			var c = "PSB" + Math.random();
			var a = b.AttackedLX;
			(j = k.id),
				(d = $(j)),
				EditEle(
					b.BulletEle.cloneNode(false),
					{
						id: c,
					},
					0,
					EDPZ
				);
			oSym.addTask(
				15,
				(e) => {
					var d = $(e);
					d && SetVisible(d);
				},
				[c]
			);
			oSym.addTask(
				1,
				function (j, d, e, f, g) {
					var i = GetC(e);
					var h = oZ.getZ0(e, f);
					h && h.Altitude === 1
						? (h.getPea(h, 20, 0),
							(SetStyle(d, {
								left: g + 38 + "px",
							}).src = "images/Plants/gun/ShroomBulletHit.gif"),
							oSym.addTask(10, ClearChild, [d]))
						: (e += 5) < oS.W
							? ((d.style.left = (g += 5) + "px"), oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
							: ClearChild(d);
				},
				[c, $(c), a, b.R, a - 46]
			);
			d.childNodes[1].src = "images/Plants/Gun/SeaShroomShoot.gif";
			ImgSpriter(
				k.id,
				j,
				[
					["0 0", 9, 1],
					["0 -200px", 9, 2],
					["0 -400px", 9, 3],
					["0 -600px", 9, 4],
					["0 -800px", 9, 5],
					["0 -1000px", 9, 6],
					["0 -1200px", 9, 7],
					["0 -1400px", 9, 8],
					["0 -1600px", 9, 9],
					["0 -1800px", 9, 10],
					["0 -2000px", 9, 11],
					["0 -2200px", 9, -1],
				],
				0,
				(m, n) => {
					var i = $(n);
					$P[n] && (i.childNodes[1].src = "images/Plants/Gun/SeaShroom.gif");
				}
			);
		},
	})),
	(oSeaAnemone = InheritO(oGloomShroom, {
		EName: "oSeaAnemone",
		CName: "Electric Anemone",
		width: 83,
		height: 119,
		beAttackedPointR: 63,
		SunNum: 300,
		coolTime: 15,
		BookHandBack: 3.5,
		AudioArr: ["SeaAnemone"],
		PicArr: [
			"images/Card/Plants/SeaAnemone.png",
			"images/Plants/SeaAnemone/0.gif",
			"images/Plants/SeaAnemone/GloomShroom.gif",
			"images/Plants/SeaAnemone/GloomShroomSleep.gif",
			"images/Plants/SeaAnemone/GloomShroomAttack.gif",
			"images/Plants/SeaAnemone/GloomShroomBullet.gif",
		],
		AudioArr: ["kernelpult", "kernelpult2"],
		Tooltip: "Hurts zombies around it",
		Produce:
			"电海葵花可以对在他周围的僵尸造成巨大伤害</font></p>自信的电海葵花毫不畏惧任何困难，一头杀马</font><br>特式的发型是他引以为傲的事情，可他说这是上</font><br>次在村口找王师傅给剃的。",
		BirthStyle(c, d, b, a) {
			EditEle(
				b,
				{
					id: d,
				},
				a,
				EDPZ
			);
		},
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		PrivateBirth(b) {
			var a = b.id;
			NewEle(
				a + "_Bullet",
				"div",
				"position:absolute;visibility:hidden;width:210px;height:200px;left:" +
					(b.pixelLeft - 60) +
					"px;top:" +
					(b.pixelTop - 65) +
					"px;background:url(images/Plants/SeaAnemone/GloomShroomBullet.gif);z-index:" +
					(b.zIndex + 1),
				0,
				EDPZ
			);
		},
		NormalAttack() {
			PlayAudio("SeaAnemone");
			var k = this;
			var g;
			var f = k.MaxR;
			var c = k.MinX;
			var b = k.MaxX;
			var e;
			var h;
			var a;
			var j = k.id;
			var d = $(j);
			var l = j + "_Bullet";
			for (g = k.MinR; g <= f; g++) {
				e = oZ.getArZ(c, b, g);
				for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 130)) {}
			}
			oSym.addTask(
				100,
				function (i) {
					PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
					--i && oSym.addTask(100, arguments.callee, [i]);
				},
				[4]
			);
			d.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroomAttack.gif";
			SetVisible($(l));
			ImgSpriter(
				l,
				j,
				[
					["0 0", 9, 1],
					["0 -200px", 9, 2],
					["0 -400px", 9, 3],
					["0 -600px", 9, 4],
					["0 -800px", 9, 5],
					["0 -1000px", 9, 6],
					["0 -1200px", 9, 7],
					["0 -1400px", 9, 8],
					["0 -1600px", 9, 9],
					["0 -1800px", 9, 10],
					["0 -2000px", 9, 11],
					["0 -2200px", 9, -1],
				],
				0,
				(m, n) => {
					var i = $(n);
					$P[n] && (i.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroom.gif");
					SetHidden($(m));
				}
			);
		},
	})),
	(oTTS = InheritO(CPlants, {
		EName: "oTTS",
		CName: "Thorn Seaweed",
		width: 75,
		height: 226,
		beAttackedPointR: 55,
		beAttackedPointR: 80,
		SunNum: 50,
		BookHandBack: 3.5,
		GetDY(b, c, a) {
			return 5;
		},
		NormalGif: 1,
		AudioArr: ["TTS"],
		PicArr: [
			"images/Card/Plants/TTS.png",
			"images/Plants/TTS/0.gif",
			"images/Plants/TTS/Float.gif",
			"images/Plants/TTS/Grab.png",
			"images/Plants/TTS/splash.png",
		],
		Tooltip: "Grabs zombies in front of it",
		Produce:
			'<font color="#28325A">Thorn Seaweeds grab anything in front of them.</font><p>Damage: <font color="#CC241D">huge</font><br>Range: <font color="#CC241D">very short</font></p>Thorn Seaweed is Tangle Kelp’s overenthusiastic cousin. While Tangle Kelp claims to be "great at relationships," Thorn Seaweed’s idea of bonding involves spines, panic, and a barnacle who still owes him 10 sun. Gardeners appreciate his dedication, though submarines and confused starfish do not.',
		CanGrow(e, d, f) {
			var c = d + "_" + f;
			var b = oGd.$LF[d];
			var a = f < 1 || f > 9;
			return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
		},
		getTriggerRange(a, b, c) {
			return [[b, c, 0]];
		},
		BirthStyle(c, d, b, a) {
			b.childNodes[1].src = "images/Plants/TTS/Float.gif";
			EditEle(
				b,
				{
					id: d,
				},
				a,
				EDPZ
			);
		},
		getHurt(d, b, a) {
			var c = this;
			b === 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
		},
		TriggerCheck(b, a) {
			b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
		},
		NormalAttack(a, b) {
			PlayAudio("TTS");
			a.getHurt = function () {};
			b.getHurt = function () {};
			b.beAttacked = 0;
			b.isAttacking = 1;
			NewImg(0, "images/Plants/TTS/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
			oSym.addTask(
				50,
				(g, h) => {
					var e = g.id;
					var f = h.id;
					var d = e + "_splash";
					var c = f + "_splash";
					NewEle(
						c,
						"div",
						"position:absolute;background:url(images/Plants/TTS/splash.png);left:" +
							(h.AttackedLX - 10) +
							"px;top:" +
							(h.pixelTop + h.height - 88) +
							"px;width:97px;height:88px;over-flow:hidden",
						0,
						EDPZ
					);
					ImgSpriter(
						d,
						e,
						[
							["0 0", 9, 1],
							["-97px 0", 9, 2],
							["-194px 0", 9, 3],
							["-291px 0", 9, 4],
							["-388px 0", 9, 5],
							["-485px 0", 9, 6],
							["-582px 0", 9, 7],
							["-679px 0", 9, -1],
						],
						0,
						(i, j) => {
							ClearChild($(i));
						}
					);
					ImgSpriter(
						c,
						f,
						[
							["0 0", 9, 1],
							["-97px 0", 9, 2],
							["-194px 0", 9, 3],
							["-291px 0", 9, 4],
							["-388px 0", 9, 5],
							["-485px 0", 9, 6],
							["-582px 0", 9, 7],
							["-679px 0", 9, -1],
						],
						0,
						(i, j) => {
							ClearChild($(i));
						}
					);
					h.DisappearDie();
					g.Die();
				},
				[a, b]
			);
		},
	})),
	(oMagneticmuShroom = InheritO(CPlants, {
		EName: "oMagneticmuShroom",
		CName: "Magnet-shroom",
		width: 176,
		height: 148,
		beAttackedPointR: 50,
		SunNum: 50,
		BookHandBack: 2.5,
		AudioArr: ["Magneticmu"],
		PicArr: [
			"images/Card/Plants/MagneticmuShroom.png",
			"images/Plants/MagneticmuShroom/0.gif",
			"images/Plants/MagneticmuShroom/Shrubbery.gif",
			"images/Plants/MagneticmuShroom/ShrubberyBoom.gif" + $Random,
		],
		Tooltip: "Removes helmets and other metal objects from zombies。",
		Produce:
			'磁力菇可以吸走周围僵尸的护具<p>Scope:<font color="#CC241D">约一行</font><br>Instructions:<font color="#CC241D">安放即可使用（一次性）</font></p>磁力是一种强大的力量，非常强大，强大到有</font><br>时都吓到磁力菇自己了。能力越大，责任越大</font><br>，他不知道自己能否肩负得起这责任',
		InitTrigger() {},
		getHurt() {},
		PrivateBirth(a) {
			oSym.addTask(
				10,
				(j) => {
					var h = $P[j];
					if (h) {
						PlayAudio("Magneticmu");
						var b = $(j);
						var f = h.R;
						var c = oZ.getArZ(100, oS.W, f);
						var e = c.length;
						var g = oGd.$Ice[f];
						var d = oGd.$Crater;
						while (e--) {
							if (
								c[e].EName === "oBucketheadZombie" ||
								c[e].EName === "oFootballZombie" ||
								c[e].EName === "oHeiFootballZombie" ||
								c[e].EName === "oCFootballZombie" ||
								c[e].EName === "oScreenDoorZombie" ||
								c[e].EName === "oDuckyTubeZombie3" ||
								c[e].EName === "oDuckyTubeZombie4" ||
								c[e].EName === "oSmallFootballZombie" ||
								c[e].EName === "oCBucketheadZombie" ||
								c[e].EName === "oTrashZombie" ||
								c[e].EName === "oCFootballZombie" ||
								c[e].EName === "oConeheadZombie" ||
								c[e].EName === "oCConeheadZombie" ||
								c[e].EName === "oJY" ||
								c[e].EName === "oBalloonZombie" ||
								c[e].EName === "oNewspaperZombie" ||
								c[e].EName === "oCNewspaperZombie" ||
								c[e].EName === "oDuckyTubeZombie2"
							) {
								c[e].OrnHP = 0;
								c[e].getHit0(c[e], 0, 0);
							}
						}
						h.Die(1);
						EditEle(
							b.childNodes[1],
							{
								src: "images/Plants/MagneticmuShroom/ShrubberyBoom.gif",
							},
							{
								width: "176px",
								height: "148px",
								left: "-1px",
								top: "-1px",
							}
						);
						oSym.addTask(220, ClearChild, [b]);
					}
				},
				[a.id]
			);
		},
	})),
	(oLaserBean = InheritO(CPlants, {
		EName: "oLaserBean",
		CName: "Laser Bean",
		width: 80,
		height: 80,
		beAttackedPointR: 80,
		SunNum: 75,
		SunNum: 250,
		coolTime: 30,
		HP: 4e3,
		PicArr: [
			"images/Card/Plants/LaserBean.png",
			"images/Plants/LaserPea/0.gif",
			"images/Plants/LaserPea/LaserPea.gif",
			"images/Plants/LaserPea/LaserPeaSleep.gif",
			"images/Plants/LaserPea/LaserPeaAttack.gif",
			"images/Plants/LaserPea/LaserPeaBullet.gif",
		],
		AudioArr: ["LaserBean"],
		Tooltip: "Fires a high-powered laser at an entire row of zombies",
		Produce:
			'<font color="#28325A">Laser Beans fire down a lane, hitting all zombies ahead of it.</font><p>Damage: <font color="#CC241D">normal, penetrates an entire lane</font><br>Range: <font color="#CC241D">all zombies in a lane</font><p>After a laser eye surgery had gone horribly right, Laser Bean gained a sense of purpose and a new-found affinity for competitive staring contests.',
		CheckLoop(b, c) {
			var a = this.id;
			this.NormalAttack(b);
			oSym.addTask(
				292,
				(e, f, h) => {
					var g;
					(g = $P[e]) && g.AttackCheck1(f, h);
				},
				[a, b, c]
			);
		},
		getShadow(a) {
			return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
		},
		GetDY(b, c, a) {
			return a[0] ? -18 : -10;
		},
		GetDX() {
			return -68;
		},
		PrivateBirth(b) {
			var a = b.id;
			NewEle(
				a + "_Bullet",
				"div",
				"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
					b.AttackedRX +
					"px;top:" +
					(b.pixelTop + 5) +
					"px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" +
					(b.zIndex + 1),
				0,
				EDPZ
			);
		},
		PrivateDie(a) {
			ClearChild($(a.id + "_Bullet"));
		},
		getTriggerRange(a, b, c) {
			return [[b, Math.min(c + 686, oS.W), 0]];
		},
		NormalAttack() {
			PlayAudio("LaserBean");
			var f = this;
			var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R);
			var e = d.length;
			var g;
			var c = f.id;
			var b = $(c);
			var a = c + "_Bullet";
			while (e--) {
				(g = d[e]).Altitude < 2 && g.getHit1(g, 850);
			}
			b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";
			SetVisible($(a));
			ImgSpriter(
				a,
				c,
				[
					["0 0", 4, 1],
					["0 -62px", 4, 2],
					["0 -124px", 5, 3],
					["0 -186px", 5, 4],
					["0 -248px", 5, 5],
					["0 -310px", 6, 6],
					["0 -372px", 6, 7],
					["0 -434px", 7, -1],
				],
				0,
				(i, j) => {
					var h = $(j);
					$P[j] && ((h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif"), SetHidden($(i)));
				}
			);
		},
	})),
	(oGoldenPrize = InheritO(CPlants, {
		EName: "oGoldenPrize",
		CName: "Golden Trophy",
		PicArr: ["images/interface/0.gif", "images/interface/0.gif"],
		Tooltip: "You win!",
	})),
	(oShovel = InheritO(CPlants, {
		EName: "oShovel",
		CName: "Shovel",
		width: 130,
		height: 114,
		beAttackedPointR: 70,
		PicArr: ["images/interface/Shovel/ShovelCard.png", "images/interface/Shovel/0.gif"],
		Tooltip: "Shovel up plants you don't want!",
	}));
oFlowerVase = InheritO(CPlants, {
	EName: "oFlowerVase",
	CName: "Vase", // ID 中文名
	SunNum: 0,
	coolTime: 0, // 阳光 冷却时间
	canEat: 0,
	Stature: -1, // 是否可以被吃 身高
	HP: 10,
	width: 89,
	height: 95,
	beAttackedPointR: 53, // 血量 宽度 高度 判定点

	PotSize: 0,
	XRay: 0,
	CardTime: 1500, // 花瓶种类 是否透视 卡片冷却时间
	Ele: null,
	ImgEle: null,
	EleBG: null,
	EleCard: null,
	EleClick: null, // 透视状态下背景Ele 透视状态下图片Ele
	VaseValue: null, // 花瓶本身数据，格式: { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }
	AutoSetXRay: true,
	AutoJoker: true,
	AutoSummonBase: true,
	BasePlant: null, // 是否自动改变XRay 小丑是否自爆 是否自动生成底座（如在河里生成睡莲）底座植物

	AudioArr: ["VaseBreaking0", "VaseBreaking1", "VaseBreaking2", "VaseBreaking3"],
	PicArr: ["images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png"],
	Tooltip: "Break me!",
	Produce: "Beat me, hate me, you can never break me!",

	SetStyle(Kind) {
		// 设置花瓶皮肤
		var self = this;
		var { XRay } = self; // 获取基本信息
		var PLeft = Kind * 80;
		var PRight = PLeft + 80; // 计算裁剪

		self.PotSize = Kind; // 设置花盆类型
		SetStyle(self.ImgEle, {
			// 花盆本体的图片
			clip: "rect(101px, " + PRight + "px, 202px, " + PLeft + "px)",
			top: "-101px",
			left: -80 * Kind + "px",
		});
		SetStyle(self.EleBG, {
			// 花盆透视时的图层
			clip: "rect(0px, " + PRight + "px, 101px, " + PLeft + "px)",
			top: "0px",
			left: -80 * Kind + "px",
		});

		self.SetXRay(XRay); // 设置透视功能
	},

	SetXRay(TurnOn) {
		// 设置花瓶透视
		var self = this;
		var XRay = !!TurnOn; // 获取基本信息

		self.XRay = XRay; // 设置 XRay
		SetAlpha(self.EleBG, XRay * 100, XRay * 1); // 显示透视图层
		SetAlpha(self.EleCard, XRay * 100, XRay * 1); // 显示预览图层
	},

	InitImage(Kind, XRay) {
		// 初始化图片
		var self = this;
		var ID = self.id;
		var { Ele } = self;
		var { ImgEle } = self;
		var { EleBG } = self;
		var { EleCard } = self;

		if (!Ele) {
			self.Ele = Ele = $(ID);
		} // 初始化 Ele
		if (!ImgEle) {
			self.ImgEle = ImgEle = Ele.childNodes[1];
		} // 初始化 ImgEle
		if (!EleBG) {
			(self.EleBG = EleBG = self.ImgEle.cloneNode(false)), Ele.appendChild(EleBG);
		} // 初始化 EleBG，克隆图片，并复制到自己的图片下
		if (!EleCard) {
			self.EleCard = EleCard = NewEle("", "img", "", {}, Ele);
		} // 初始化 EleCard 节点
		if (!XRay) {
			XRay = self.XRay;
		}
		if (!Kind) {
			Kind = self.PotSize;
		}

		var selfValue = self.VaseValue || {};
		var VType = selfValue.Type || "Plants";
		var VValue = selfValue.Value || (VType === "SunNum" ? 50 : VType === "Plants" ? oPeashooter : oZombie); // 获取该花瓶的内部玩意
		switch (VType) {
			case "Plants": // 植物类型
				EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
				EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				break;

			case "Zombie":
				if ($User.Client.Mobile) {
					// 如果当前设备是移动端，为了移动端屏幕考虑，直接显示卡槽
					EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				} else {
					var PT = VValue.prototype;
					var ZWidth = PT.beAttackedPointR - PT.beAttackedPointL;
					var ZHeight = PT.height - PT.GetDTop;
					var MaxW = 60;
					var MaxH = 75;
					var K = MaxW / MaxH;
					var EK; // 横款最大值、 横款比值
					var ELeft = 0;
					var ETop = 0;
					var LPoint = PT.beAttackedPointL; // 最终的相对位置

					if (ZWidth > ZHeight) {
						(EK = ZWidth / MaxW), (ZHeight /= EK), (ZWidth = MaxW);
					}
					// 等比缩放
					else if (ZHeight > ZWidth) {
						(EK = ZHeight / MaxH), (ZWidth /= EK), (ZHeight = MaxH);
					} // 等比缩放

					(ELeft = 20 / 2 + -LPoint / EK + (MaxW - ZWidth) / 2), (ETop = 15 / 2 + (MaxH - ZHeight) / 2);

					EleCard.style = "top:" + ETop + "px;left:" + ELeft + "px;width:" + PT.width / EK + "px;height:" + PT.height / EK + "px;"; // 确定位置
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.StaticGif]; // 显示僵尸站立图片
				}
				break;

			case "SunNum":
				EleCard.style = "left:10px;top:12.5px;width:64px;height:64px;";
				EleCard.src = "images/interface/Sun.gif";
				break;
		}

		self.SetStyle(Kind), self.SetXRay(XRay); // 初始化显示
	},

	BirthStyle(self, Id, Ele, Style) {
		var Dom = Ele.childNodes[1]; // 获取植物实际图片
		(Dom.src = self.PicArr[self.NormalGif]), (Dom.style.height = "202px"); // 设置实际宽高
		(self.Ele = Ele), EditEle(Ele, { id: Id }, Style, EDPZ); // 修改

		self.InitImage(self.PotSize, self.XRay), self.FreshXRay(true); // 初始化图片等信息
	},

	PrivateBirth(self) {
		var Id = self.id;
		var { Ele } = self; // 获取

		// 定义鼠标事件相关
		var ClickEle = (self.EleClick = NewEle(
			"dCheck_" + Id,
			"div",
			"left:" +
				Ele.style.left +
				";top:" +
				Ele.style.top +
				";position:absolute;width:80px;height:101px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:150;cursor:url(images/interface/Pointer.cur),pointer",
			{
				onclick() {
					self.Die();
				},
				onmouseover() {
					Ele.style.filter = "brightness(150%)";
					self.EleCard.style.filter = "brightness(70%)";
				},
				onmouseout() {
					Ele.style.filter = "brightness(100%)";
					self.EleCard.style.filter = "brightness(100%)";
				},
			},
			EDAll
		));

		self.ControlBase("Summon", "Auto"); // 生成底座
		self.VaseValue = self.VaseValue || { Type: "SunNum", Value: 50 }; // 如果没有信息，默认创建一个 50 阳光的罐子
	},
	getHurt(a, b, c) {
		b !== 2 && this.Die();
	}, // 受伤判定，目前是冰车不会破坏罐子，以后如果有巨人这里是需要修改的
	BoomDie() {
		this.Die(null, false);
	}, // 爆炸后，直接生成，不播放音效
	PrivateDie() {},
	InitTrigger() {}, // 特殊死亡
	Die(ImgSave, OnAudio) {
		// 是否保留图片 是否播放音效
		var self = this;
		var ID = self.id; // 定义需要用到的变量

		self.oTrigger && oT.delP(self), (self.HP = 0); // 删除触发器 清空血量
		delete $P[ID], delete oGd.$[self.R + "_" + self.C + "_" + self.PKind]; // 删除本格数据
		$P.length -= 1;
		!ImgSave && ClearChild(self.Ele); // 清除图片

		if (OnAudio !== false) {
			PlayAudio(self.AudioArr[Math.floor(Math.random() * self.AudioArr.length)]);
		} // 随机播放音效

		self.ControlBase("Delete", "Auto"); // 删除底座
		ClearChild(self.EleClick), self.PlaceItem(); // 放置物品
	},
	PlaceItem() {
		var self = this;
		var ID = self.id;
		var Val = self.VaseValue;
		var { Type } = Val;
		var { Value } = Val; // 解包

		switch (
			Type // 根据内容生成
		) {
			case "Plants": // 丢出植物卡片
				AppearCard(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0, self.CardTime);
				break;

			case "Zombie": // 生成僵尸
				(Value = new Value()), ++oP.NumZombies; // 创建僵尸对象 增加僵尸数量

				// 生成僵尸
				asyncInnerHTML(
					Value.CustomBirth(self.R, self.C, 0, "auto"),
					(n, m) => {
						EDPZ.appendChild(n), m.Birth();
						if (m.EName === "oJackinTheBoxZombie" && self.AutoJoker) {
							m.OpenBox(m.id);
						} // 如果是小丑僵尸，直接引爆爆炸
					},
					Value
				);
				break;

			case "SunNum": // 生成阳光
				if (Value > 500) {
					AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value - 500, 0), (Value = 500);
				} // 大于五百的阳光直接生成一个大的
				while (Value > 25) {
					AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, 25, 0), (Value -= 25);
				} // 500 以内的，一个一个生成
				AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0), (Value = 0); // 余下的单独生成
				break;
		}
	},
	ControlBase(Type, Ticket) {
		// 生成底座
		var BaseList = [oFlowerPot, oLilyPad];
		var LastBase = null;
		var self = this; // 底座

		if (self.BasePlant && $P[self.BasePlant.id]) {
			self.BasePlant.canEat = true;
		} // 默认先解除 canEat 状态
		if (Ticket === "Auto" && !self.AutoSummonBase) {
			return;
		} // 如果是尝试自动生成的话，直接返回

		switch (Type) {
			case "Summon": // 生成底座
				self.ControlBase("Delete", "Auto"); // 先尝试删除原绑定的底座

				if (self.CanGrow([], self.R, self.C)) {
					break;
				} // 如果可以直接种植，则直接返回

				for (var Index in BaseList) {
					// 尝试生成所有种类的底座
					if (BaseList[Index].prototype.CanGrow([], self.R, self.C)) {
						LastBase = BaseList[Index];
					}
				}

				if (LastBase) {
					// 如果可以生成
					CustomSpecial(LastBase, self.R, self.C); // 生成种类
					self.BasePlant = LastBase = oGd.$[self.R + "_" + self.C + "_" + 0]; // 获取底座
					LastBase.canEat = false; // 默认底座是不能被吃的
				}
				break;

			case "Delete": // 删除绑定的底座
				if (!self.BasePlant || !$P[self.BasePlant.id]) {
					break;
				} // 如果底座根本不存在，直接返回

				self.BasePlant.Die(); // 顺带删除底座

				break;
		}
	},
	FreshXRay(OnlySelf) {
		// 全局属性，为场上所有花瓶设置 XRAY
		var self = this;
		var Ground = oGd.$;
		var R = self.R - 1;
		var C = self.C - 1;
		var Arr = [0, 1, 2];
		var Str;
		var Pla = oGd.$Plantern;

		if (OnlySelf) {
			// 只检查自己
			if (self.AutoSetXRay === false) {
				return;
			} // 不允许改变
			self.SetXRay(false); // 默认关闭，查找周围是否有再开启
			for (var RQ in Arr) {
				for (var CQ in Arr) {
					if (Pla[1 * RQ + R + "_" + (1 * CQ + C)]) {
						self.SetXRay(true);
					}
				}
			} // 设置透视
		} else {
			for (var Q in Ground) {
				// 遍历每一个花瓶，如果是花瓶则自我检查
				if (Ground[Q] && Ground[Q].EName === "oFlowerVase") {
					Ground[Q].FreshXRay(true);
				}
			}
		}
	},

	/*
    函数介绍: 直接在 (R, C) 位置根据你的信息生成一个罐子，此属性会创建一个新的罐子
    使用说明: 
        SetR: 行, SetC: 列
        VaseColor: 罐子颜色 0普通 1绿色 2僵尸
        VaseValue: 花瓶内容信息，格式 { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }	
        SpecialFunc: 生成前调用的函数（可选）	
    执行成功后会返回该花瓶的信息。
*/
	SpecialBirth(SetR, SetC, VaseColor, VaseValue, SpecialFunc) {
		var Obj = new oFlowerVase();

		(Obj.PotSize = VaseColor), (Obj.VaseValue = VaseValue); // 基本信息

		if (SpecialFunc) {
			SpecialFunc(Obj);
		} // 让调用者自己操作花瓶信息

		Obj.Birth(GetX(SetC), GetY(SetR), SetR, SetC, [], null);

		return Obj;
	},

	/*
    函数介绍: 判断场上是否满足普通砸罐子关卡通关条件
    通关条件: 场地上没有罐子、且场地上没有僵尸
*/
	GetLevelStatus() {
		for (var O in $P) {
			if ($P[O].EName === "oFlowerVase") {
				return false;
			}
		} // 如果有花瓶，直接返回
		for (var O in $Z) {
			if ($Z[O].PZ !== 0) {
				return false;
			}
		} // 如果有非魅惑的僵尸，直接返回
		return true;
	},
});
oMagnetShroom = InheritO(CPlants, {
	EName: "oMagnetShroom",
	CName: "MagnetShroom",
	width: 102,
	beAttackedPointR: 98,
	height: 90,
	target: -1,
	SunNum: 100,
	BookHandBack: 2,
	SleepGif: 3,
	cd: 15,
	cotcd: 1000,
	night: true,
	Tooltip: "可以用磁力吸取僵尸的头盔",
	Produce:
		'磁力菇可以用磁力吸取僵尸的头盔等其它金属物品。<p>范围：<font color="#CC241D">靠近的僵尸</font><br>特点：<font color="#CC241D">移除僵尸们所有的金属物品<br>白天睡觉</font></p>磁力是一种强大的力量，非常强大，强大到有时都吓到磁力菇自己了。能力越大，责任越大，他不知道自己能否肩负得起这责任。',
	InitTrigger() {},
	PicArr: ["images/Card/Plants/MagnetShroom.png", "images/Plants/Ms/Ms.gif", "images/Plants/Ms/Ms.gif", "images/Plants/Ms/sleep.gif"],
	getTriggerRange: (R, LX, RX) => [[0, oS.W, 0]],
	AudioArr: ["blover"],
	BirthStyle(c, d, b, a) {
		oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
		oSym.addTask(
			1,
			function (self) {
				self.NormalAttack();
				oSym.addTask(1, arguments.callee, [self]);
			},
			[c]
		);
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	Die(a) {
		var b = this;
		var c = b.id;
		b.cd = 0;
		ClearChild(b.imgnn);
		b.target = "die";
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
		$P.length -= 1;
		!a && ClearChild($(c));
		b.PrivateDie(b);
	},
	getTriggerR: (selfR) => [selfR - 2 < 1 ? 1 : selfR - 2, selfR + 2 > oS.R ? oS.R : selfR + 2],
	PrivateBirth() {},
	Plength(pid, zid) {
		//判断僵尸是否在磁力菇的攻击范围内
		if (zid.Ifgc !== 0 || zid.OrnHP === 0) {
			return 0;
		}
		//alert(123);
		if (
			zid.EName !== "oScreenDoorZombie" &&
			zid.EName !== "oDuckyTubeZombie4" &&
			zid.EName !== "oSmallFootballZombie" &&
			zid.EName !== "oFootballZombie" &&
			zid.EName !== "oDuckyTubeZombie3" &&
			zid.EName !== "oJackinTheBoxZombie" &&
			zid.EName !== "oBucketheadZombie" &&
			zid.EName !== "oDiggerZombie" &&
			zid.EName !== "oIScreenDoorZombie" &&
			zid.EName !== "oIDuckyTubeZombie4" &&
			zid.EName !== "oISmallFootballZombie" &&
			zid.EName !== "oIFootballZombie" &&
			zid.EName !== "oIDuckyTubeZombie3" &&
			zid.EName !== "oIJackinTheBoxZombie" &&
			zid.EName !== "oIBucketheadZombie" &&
			zid.EName !== "oIDiggerZombie"
		) {
			return 0;
		}
		if (Math.abs(zid.R - pid.R) > 2) {
			return 0;
		}
		if (Math.abs(zid.X - pid.pixelLeft) > 200) {
			return 0;
		}
		return 1;
	},
	Plength1(pid, zid) {
		//计算僵尸和磁力菇之间的距离
		var chang = Math.abs(zid.R - pid.R) * 100;
		var kuan = Math.abs(zid.X - GetX(pid.C));
		return Math.sqrt(chang * chang + kuan * kuan);
	},
	AttackCheckZ() {
		//查找僵尸
		var self = this;
		var z;
		var otarget;
		var llen;
		var lastx;
		var Target = -1;
		for (z in $Z) {
			otarget = $Z[z];
			if (!self.Plength(self, otarget) || otarget.PZ === 0) {
				continue;
			}
			if (Target === -1) {
				Target = $Z[z];
				continue;
			}
			llen = self.Plength1(self, otarget);
			if (llen < self.Plength1(self, Target)) {
				Target = otarget;
			}
		}
		self.target = Target;
		if (self.target === -1) {
			return 0;
		}
		return 1;
	},
	Yesgif() {
		try {
			if (this.cd && $(this.id).childNodes[1].src !== "images/Plants/Ms/Ms.gif") {
				$(this.id).childNodes[1].src = "images/Plants/Ms/Ms.gif";
			}
		} catch (arr) {}
	},
	attackzombiest(zid) {
		if (zid.CName === "矿工僵尸") {
			//alert(1);
			zid.Stone_of_Sinan_Up();
		} else {
			zid.OrnHP = 0;
			zid.getHit0(zid, 0, 0);
		}
	},
	NormalAttack() {
		//alert(this.canTrigger);
		//alert(1);
		if (this.AttackCheckZ() && this.cd) {
			var self = this;
			var { id } = self;
			var zid = self.target;
			if (zid.Ifgc === 1) {
				return;
			}
			zid.Ifgc = 1;
			$(id).childNodes[1].src = "images/Plants/Ms/attack.gif" + "?" + Date.now() + Math.random();
			oSym.addTask(
				80,
				(zid, self) => {
					self.attackzombiest(zid);
				},
				[zid, self]
			);
			self.cd = 0;
			oSym.addTask(
				self.cotcd,
				(id) => {
					self.target = -1;
					self.cd = 1;
					self.Yesgif();
				},
				[id]
			);
		}
	},
});
