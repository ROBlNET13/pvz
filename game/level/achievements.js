var customplants;
var customtitle = "Achievements";
var customcolumns = 4;
var customsun = 150;
oS.Init({
	PicArr: (function () {
		a = "images/interface/";
		return [ShadowPNG, a + "BackButton.png", a + "Achievement0.png", a + "Achievement-1.png", a + "Achievement1.png"];
	})(),
	LevelName: "Achievements",
	LevelEName: 150,
	ShowScroll: 1,
	LoadMusic: "ChooseYourSeeds",
	StartGameMusic: "ChooseYourSeeds",
	AudioArr: ["ChooseYourSeeds", "pvzs"],
	backgroundImage: "images/interface/Achievements_Background.png",
	LoadAccess(a) {
		NewImg("imgSF", "images/interface/BackButton.png", "left:785px;top:530px", EDAll, {
			onclick() {
				SelectModal(0);
				SetBlock($("dSurface"), $("iSurfaceBackground"));
			},
		});
		NewImg("imgSF", "images/interface/Achievement0.png", "left:50px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "izombie1" + "");
			},
		});
		NewImg("imgSF", "images/interface/Achievement-1.png", "left:200px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "izombie2" + "");
			},
		});
		NewImg("imgSF", "images/interface/Achievement1.png", "left:350px;top:130px;filter:brightness(0.8);opacity:0.55", EDAll, {
			onclick() {
				SelectModal("" + "izombie3" + "");
			},
		});
	},
});
