export var oBrains = InheritO(CPlants, {
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
})