import { oLawnCleaner } from "./oLawnCleaner.js";

export var oPoolCleaner = InheritO(oLawnCleaner, {
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
		PlaySound2(a.AudioArr[0]);
		const moveClean = function (b, c, k, j, e, g) {
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
					oSym.addTask(1, moveClean, [b, c, k, j, e, g]),
					[this]);
		};
		moveClean(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
