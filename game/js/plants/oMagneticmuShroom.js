export var oMagneticmuShroom = InheritO(CPlants, {
	EName: "oMagneticmuShroom",
	CName: "Magnet-shroom",
	width: 176,
	height: 148,
	beAttackedPointR: 50,
	SunNum: 50,
	BookHandBack: "Night",
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
					PlaySound2("Magneticmu");
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
});
