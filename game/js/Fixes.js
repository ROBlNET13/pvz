const saveBlacklist = [
    "0",
    "izombiemenu",
    "100",
    "150",
    "WJY",
    "FB",
    "152",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "NutBowling",
    "GuanXin",
    "vasebreakermenu",
    "yy",
    "ZombieGames",
    "yicixingxiaofei",
    "kaotianchifan",
    "unsodded",
    "bpsyc",
    "fmdzz",
    "izombie1",
    "izombie2",
    "izombie3",
    "izombie4",
    "izombie5",
    "izombie6",
    "izombie7",
    "izombie8",
    "izombie9",
    "izombie10",
    "izombiecustomlevel",
    "izombieleveleditor",
    "vasebreaker1",
    "vasebreaker2",
    "vasebreaker3",
    "vasebreaker4",
    "vasebreaker5",
    "vasebreaker6",
    "vasebreaker7",
    "vasebreaker8",
    "vasebreaker9",
    "ydbs",
    "xjsdmf", // these names are getting ridiculous
    "252",
    "250",
    "240",
    "230",
    "220",
    "210",
    "200",
    "190",
    "180",
    "170",
    "160",
    "151",
    "KongXi",
    "vasebreaker10",
        "CardRain"
];

let checkInterval = setInterval(() => {
    if (typeof oS !== "undefined") {
        let previousValue = oS.Lvl;

        const checkForChange = () => {
            if (oS.Lvl !== previousValue) {
                if (String(oS.Lvl).startsWith("[object")) {
                    oS.Lvl = previousValue;
                } else {
                    console.log(
                        `oS.Lvl changed from ${previousValue} to ${oS.Lvl}`
                    );
                    previousValue = oS.Lvl;
                    // now the home bugfix
                    if ($ && $("dAdventure")) {
                        $("dAdventure").onclick = function () {
                            StartAdventure(oS.Lvl);
                        };
                    }
                    // now save the level in localstorage if it isnt in the blacklist
                    // localStorage.setItem("level", oS.Lvl);
                    if (!saveBlacklist.includes(oS.Lvl)) {
                        localStorage.setItem("level", oS.Lvl);
                    }
                }
            }
        };

        const changeInterval = setInterval(checkForChange, 1);

        clearInterval(checkInterval);
    }
}, 100);

// wait for $("dAdventure") to be defined
// if it is, set its onclick to StartAdventure(whatevers in localstorage)

let checkInterval2 = setInterval(() => {
    if ($("dAdventure")) {
        clearInterval(checkInterval2);
        $("dAdventure").onclick = function () {
            StartAdventure(localStorage.getItem("level"));
        };
    }
}, 100);
