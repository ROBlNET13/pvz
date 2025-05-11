oS.Init({
	PicArr: (function () {
		var b = 32;
		var a = "images/interface/";
		return [
			ShadowPNG,
			a + "Sun.gif",
			a + "ZombieHand.png",
			a + "OptionsMenuback" + b + ".png",
			a + "OptionsBackButton" + b + ".png",
			a + "Sunflower_trophy" + b + ".png",
			a + "Surface.jpg",
			a + "Help.png",
			a + "SelectorScreen_WoodSign3_" + b + ".png",
			a + "SelectorScreen_WoodSign2_" + b + ".png",
			a + "SelectorScreen_WoodSign1_" + b + ".png",
			//      a + "SelectorScreenSurvival_" + b + ".png",
			a + "SelectorScreen_Almanac_" + b + ".png",
			a + "Logo.png",
			b + "LawnCleaner.png",
			a + "ZombiesWon.webp",
			a + "LargeWave.gif",
			a + "FinalWave.gif",
			a + "PrepareGrowPlants.png",
			a + "PointerUP.gif",
			a + "PointerDown.gif",
			a + "Shovel.png",
			a + "SunBack.png",
			a + "ShovelBack.png",
			a + "GrowSoil.gif",
			a + "GrowSpray.gif",
			a + "SeedChooser_Background.png",
			a + "Button.png",
			a + "Almanac_IndexBack.jpg",
			a + "Almanac_IndexButton.png",
			a + "Almanac_CloseButton.png",
			a + "Almanac_PlantBack.jpg",
			a + "Almanac_PlantCard.png",
			a + "Almanac_ZombieBack.jpg",
			a + "Almanac_ZombieCard.png",
			a + "ZombiesWon.webp",
			a + "AwardScreen_Back.jpg",
			a + "trophy.png",
			a + "splash.png",
			a + "brain.png",
			//      a + "SelectorScreen_Shadow_Adventure.png",
			//     a + "SelectorScreen_Shadow_Survival.png",
			//      a + "SelectorScreen_Shadow_Challenge.png",
			"images/interface/Almanac_Ground.png",
			a + "Almanac_ZombieWindow2.png",
			a + "Challenge_Background.jpg",
			a + "Challenge.png",
			a + "BZ.png",
			a + "PoolCleaner.png",
			a + "plantshadow32.png",
			a + "Dave2.gif",
			a + "Dave.gif",
			a + "Dave3.gif",
			//        a + "SelectorScreenChallenges_32.png",
			//        a + "SelectorScreenStartAdventure_32.png",
			a + "version.png",
			//     a + "TowerEntrance.png",
			a + "Tombstone_mounds.png",
			a + "Tombstones.png",
			"images/Zombies/Balloon/popped.png",
			"images/Zombies/Balloon/balloonidle.png",
		];
	})(),
	LevelName: "Game initial interface",
	LevelEName: 0,
	ShowScroll: 1,
	LoadMusic: "MyScrapbook",
	StartGameMusic: "MyScrapbook",
	AudioArr: [
		"losemusic",
		"winmusic",
		"groan2",
		"scream",
		"awooga",
		"plantsgarden",
		"groan1",
		"groan3",
		"groan4",
		"groan5",
		"groan6",
		"scream",
		"siren",
		"readysetplant",
		"hugewave",
		"finalwave",
		"plant1",
		"plant2",
		"plant_water",
		"seedlift",
		"points",
		"buttonclick",
		"gravebutton",
		"pause",
		"shovel",
		"bleep",
		"chomp",
		"chompsoft",
		"tap",
		"crazydaveshort1",
		"crazydavelong1",
		"crazydavelong2",
		"crazydavelong3",
	],
	backgroundImage: "images/interface/Logo.png",
	LoadAccess(a) {
		NewEle(
			0,
			"div",
			"width:225px;height:44px;margin:550px 0 0 694px;position:absolute;z-index:1;background:url(images/interface/version.png)",
			0,
			$("tGround")
		);
		EBody = document.body;
		EElement = document.documentElement;
		EDAll.scrollLeft = 0;
		EDAll.innerHTML += WordUTF8;
		// document.getElementById("changelog").style.display="block";
		NewAudio({ source: "evillaugh" });
		(function () {
			var b = $("JSProcess");
			var c = $("dProcess2");
			b
				? ($User.Browser.IE
						? (b.onreadystatechange = function () {
								b.readyState === "loaded" && ClearChild(b);
							})
						: (b.onload = function () {
								ClearChild(b);
							}),
					(b.onerror = function () {
						ClearChild(this);
					}),
					(b.src = "" + Math.random()))
				: console.log("Version", oS.Version) /*$("").innerHTML = 4/* oS.Version */;
		})();
		$("dServer") && SetBlock($("dServer"));
	},
});
$("ZombieHand").style.display = "none";
StopAudio("jackinthebox");
startInterval2();
function runIzlCheck() {
	// check if the izl query parameter is set
	let izl = new URLSearchParams(window.location.search).get("izl");
	if (izl && izl !== "") {
		try {
			izl[0] === "=" ? (levelDataToLoad = parseCloneTiny(decodeURIComponent(icl))) : (levelDataToLoad = parseClone(decodeURIComponent(izl)));
		} catch (e) {
			alert("Failed to load level data from query parameter");
			// regex away all query params and reload
			window.location.search = "";
			// push to history so that the user can go back
			window.history.pushState({}, document.title, window.location.pathname);
			document.location.reload();
			return;
		}
		// load the izombiecustomlevel level
		if (levelDataToLoad.lfValue[3] === 2) {
			SelectModal("izombiecustomlevelwater");
		} else {
			SelectModal("izombiecustomlevelnormal");
		}
	}
}
runIzlCheck();
