import { oCleaner1 } from "./oCleaner1.js";

export var oCleaner = InheritO(oCleaner1, {
	EName: "oCleaner",
	NormalAttack(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlaySound2("jalapeno");
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
