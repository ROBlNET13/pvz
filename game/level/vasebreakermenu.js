var customplants;
var customtitle = "I, Zombie Level Editor";
var customcolumns = 4;
var customsun = 150;
oS.Init({
	PicArr: (function () {
		a = "images/interface/";
		return [
			ShadowPNG,
			a + "BackButton.png",
			a + "vasebreaker1.png",
			a + "vasebreaker2.png",
			a + "vasebreaker3.png",
			a + "vasebreaker4.png",
			a + "vasebreaker5.png",
			a + "vasebreaker6.png",
			a + "vasebreaker7.png",
			a + "vasebreaker8.png",
			a + "vasebreaker9.png",
			a + "vasebreaker10.png",
		];
	})(),
	LevelName: "I, Zombie Menu",
	LevelEName: 150,
	ShowScroll: 1,
	LoadMusic: "Cerebrawl",
	StartGameMusic: "Cerebrawl",
	AudioArr: ["Cerebrawl", "pvzs"],
	backgroundImage: "images/interface/Vasebreaker_Background.png",
	LoadAccess(a) {
		NewImg("imgSF", "images/interface/BackButton.png", "left:785px;top:530px", EDAll, {
			onclick() {
				SelectModal(0);
				SetBlock($("dSurface"), $("iSurfaceBackground"));
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker1.png", "left:50px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker1" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker2.png", "left:200px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker2" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker3.png", "left:350px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker3" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker4.png", "left:500px;top:130px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker4" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker5.png", "left:650;top:130", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker5" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker6.png", "left:50;top:270", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker6" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker7.png", "left:200px;top:270px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker7" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker8.png", "left:350px;top:270px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker8" + "");
			},
		});
		NewImg("imgSF", "images/interface/vasebreaker9.png", "left:500px;top:270px", EDAll, {
			onclick() {
				SelectModal("" + "vasebreaker9" + "");
			},
		});
		/*
    NewImg(
      "imgSF",
      "images/interface/vasebreaker10.png",
      "left:650px;top:270px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'vasebreaker10' + '');
        },
      }
    );
    */
	},
});
