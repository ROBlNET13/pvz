import { oLawnCleaner } from "./oLawnCleaner.js";

export var oCleaner1 = InheritO(oLawnCleaner, {
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
