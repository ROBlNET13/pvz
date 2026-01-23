export var oLawnCleaner = InheritO(CPlants, {
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
		PlaySound2(a.AudioArr[0]);
		const moveClean = function (b, c, k, j, e, g) {
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
					oSym.addTask(1, moveClean, [b, c, k, j, e, g]),
					[this]);
		};
		moveClean(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
})