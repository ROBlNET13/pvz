var CPlants = NewO({
	name: "Plants",
	HP: 300,
	PKind: 1,
	beAttackedPointL: 20,
	CardGif: 0,
	StaticGif: 1,
	NormalGif: 2,
	AlmanacGif: 2,
	BookHandBack: "Day",
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
		// oxlint-disable-next-line no-nested-ternary
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

		var isOnLilyPad = false;
		for (var pID in $P) {
			var p = $P[pID];
			if (p && p.R === h && p.C === a && p.EName === "oLilyPad") {
				isOnLilyPad = true;
				break;
			}
		}

		var isWaterRow = oGd.$LF[h] === 2;
		var isBlacklisted = e.EName === "oPoolCleaner";

		if ((isOnLilyPad || isWaterRow) && !isBlacklisted) {
			f.className += " floatingPlant";
		}

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
