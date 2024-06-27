const saveBlacklist = [
    0,
    "izombiemenu",
    100,
    150,
    "WJY",
    "FB",
    152,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
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
    252,
    250,
    240,
    230,
    220,
    210,
    200,
    190,
    180,
    170,
    160,
    151,
    "KongXi",
    "vasebreaker10",
    "CardRain",
];

console.log("Setting up intervals to monitor changes...");

let checkInterval = setInterval(() => {
    console.log("Checking if oS is defined...");
    if (typeof oS !== "undefined") {
        console.log("oS is defined.");
        let previousValue = oS.Lvl;
        console.log(`Initial oS.Lvl: ${previousValue}`);

        const checkForChange = () => {
            // console.log("Checking for change in oS.Lvl...");
            if (oS.Lvl !== previousValue) {
                console.log(`Change detected: ${previousValue} to ${oS.Lvl}`);
                if (String(oS.Lvl).startsWith("[object")) {
                    console.log("Invalid oS.Lvl format detected, reverting...");
                    oS.Lvl = previousValue;
                } else {
                    previousValue = oS.Lvl;
                    console.log(`New previousValue set to: ${previousValue}`);
                    if ($ && $("dAdventure")) {
                        let hLvl = oS.Lvl;
                        console.log(`Setting onclick with level: ${hLvl}`);
                        if (!saveBlacklist.includes(hLvl)) {
                            $("dAdventure").onclick = function () {
                                console.log(
                                    `Starting adventure with level: ${hLvl}`
                                );
                                StartAdventure(hLvl);
                            };
                        } else if (
                            typeof localStorage.getItem("level") === "undefined"
                        ) {
                            $("dAdventure").onclick = function () {
                                console.log(
                                    "Starting adventure with level: " +
                                        localStorage.getItem("level") +
                                        " (from localStorage)"
                                );
                                StartAdventure(localStorage.getItem("level"));
                            };
                        } else {
                            $("dAdventure").onclick = function () {
                                console.log("Starting adventure with level: 1");
                                StartAdventure(1);
                            };
                        }
                    }
                    if (!saveBlacklist.includes(oS.Lvl)) {
                        console.log(`Saving level ${oS.Lvl} to localStorage.`);
                        localStorage.setItem("level", oS.Lvl);
                    } else {
                        console.log(
                            `Level ${oS.Lvl} is blacklisted, not saving to localStorage.`
                        );
                    }
                }
            }
        };

        const changeInterval = setInterval(checkForChange, 1);
        clearInterval(checkInterval);
    }
}, 100);

let checkInterval2 = setInterval(() => {
    console.log(
        "Checking if dAdventure is defined and saved level exists & is not blacklisted..."
    );
    if (
        $("dAdventure") &&
        localStorage.getItem("level") &&
        !saveBlacklist.includes(localStorage.getItem("level"))
    ) {
        console.log(
            "dAdventure is defined and level is valid, setting onclick..."
        );
        clearInterval(checkInterval2);
        $("dAdventure").onclick = function () {
            console.log(
                `Starting adventure with level from localStorage: ${localStorage.getItem(
                    "level"
                )}`
            );
            StartAdventure(localStorage.getItem("level"));
        };
    }
}, 100);
