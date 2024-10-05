// make sure everything in levelDataToLoad is defined
if (typeof levelDataToLoad === "undefined") {
    alert("Invalid level data!");
    SelectModal(0);
} else {
    // make sure its a table the one with {}
    if (typeof levelDataToLoad !== "object") {
        alert("Invalid level data!");
        SelectModal(0);
    }
    // make sure it has the right keys
    if (
        !levelDataToLoad.hasOwnProperty("plants") ||
        !levelDataToLoad.hasOwnProperty("music") ||
        !levelDataToLoad.hasOwnProperty("sun") ||
        !levelDataToLoad.hasOwnProperty("lfValue") ||
        !levelDataToLoad.hasOwnProperty("stripeCol")
    ) {
        alert("Invalid level data!");
        SelectModal(0);
    }
    // make sure the keys are the right types
    if (
        !Array.isArray(levelDataToLoad.plants) ||
        typeof levelDataToLoad.music !== "string" ||
        typeof levelDataToLoad.sun !== "number" ||
        typeof levelDataToLoad.name !== "string" ||
        !Array.isArray(levelDataToLoad.lfValue) ||
        typeof levelDataToLoad.stripeCol !== "number"
    ) {
        alert("Invalid level data!");
        SelectModal(0);
    }
}
for (let i = 0; i < levelDataToLoad.plants.length; i++) {
    let plant = levelDataToLoad.plants[i];
    if (!pNameValue.includes(window[plant.plantName])) {
        pNameValue.push(window[plant.plantName]);
    }
}
// if lfValue is [0, 1, 1, 2, 2, 1, 1], then we use background4, otherwise background2
backgroundImage =
    levelDataToLoad.lfValue[3] === 2
        ? "images/interface/background4.jpg"
        : "images/interface/background2.jpg";
// if its [0, 1, 1, 2, 2, 1, 1], then we use 6 brains, otherwise 5
brainsNum = levelDataToLoad.lfValue[3] === 2 ? 6 : 5;
// if its [0, 1, 1, 2, 2, 1, 1], then we dont define InitLawnMower, otherwise we do
if (levelDataToLoad.lfValue[3] !== 2) {
    initLawnMowerStored = function () {
        var a = 6;
        while (--a) {
            CustomSpecial(oBrains, a, -1);
        }
    };
} else {
    initLawnMowerStored = undefined;
}
// same for RiddleAutoGrow
if (levelDataToLoad.lfValue[3] !== 2) {
    riddleAutoGrowStored = function () {
        var k = oS.ArP,
            f = k.ArC,
            j = k.ArR,
            e = k.P,
            d = oS.PName,
            c,
            g = f[0],
            b = f[1],
            i = j[0],
            h = j[1],
            a;
        if (k.Auto) {
            while (i <= h) {
                CustomSpecial(oBrains, i, 0);
                for (a = g; a <= b; a++) {
                    CustomSpecial(
                        d[e[(c = Math.floor(Math.random() * e.length))]],
                        i,
                        a
                    );
                    e.splice(c, 1);
                }
                ++i;
            }
        }
        NewImg(
            "iStripe",
            "images/interface/Stripe.png",
            "left:" +
                (GetX1X2(levelDataToLoad.stripeCol)[0] - 11) +
                "px;top:65px",
            EDAll
        );
    };
} else {
    riddleAutoGrowStored = function () {
        var k = oS.ArP,
            f = k.ArC,
            j = k.ArR,
            e = k.P,
            d = oS.PName,
            Arr = [];
        var SummonRange = function (Arr, l, r) {
            for (; l <= r; ++l)
                for (var j = f[0]; j <= f[1]; ++j) Arr.push([j, l]);
        };
        for (var i = f[0]; i <= f[1]; ++i)
            CustomSpecial(oILilyPad, 3, i), CustomSpecial(oLilyPad, 4, i); // 荷叶
        SummonRange(Arr, 3, 4), oS.RandomGrow(Arr, e.Arr); // 处理泳池的植物
        SummonRange(Arr, 1, 2),
            SummonRange(Arr, 5, 6),
            oS.RandomGrow(Arr, e.Arr1),
            oS.RandomGrow(Arr, e.Arr); // 处理剩余的植物
        SummonRange(Arr, 1, 6), oS.RandomGrow(Arr, e.Arr2); // 处理南瓜头
        for (var i = j[0]; i <= j[1]; ++i) CustomSpecial(oBrains, i, 0); // 脑子
        NewImg(
            "iStripe",
            "images/interface/Stripe.png",
            "left:" +
                (GetX1X2(levelDataToLoad.stripeCol)[0] - 11) +
                "px;top:65px",
            EDAll
        );
    };
}

oS.Init({
    PName: pNameValue,
    ZName: [
        oIZombie,
        oIConeheadZombie,
        oIBucketheadZombie,
        oIDuckyTubeZombie1,
        oIDuckyTubeZombie2,
        oIDuckyTubeZombie3,
        oIScreenDoorZombie,
        oIPoleVaultingZombie,
        oIBalloonZombie,
    ],
    PicArr: [
        backgroundImage,
        "images/interface/trophy.png",
        "images/interface/Stripe.png",
    ],
    backgroundImage: backgroundImage,
    Coord: 2,
    DKind: 0,
    LF: levelDataToLoad.lfValue,
    ShowScroll: false,
    ProduceSun: false,
    SunNum: levelDataToLoad.sun,
    BrainsNum: brainsNum,
    CardKind: 1,
    LevelName: levelDataToLoad.name,
    LvlEName: "izombiecustomlevel",
    LoadMusic: levelDataToLoad.music,
    StartGameMusic: levelDataToLoad.music,
    ArP: {
        ArC: [1, levelDataToLoad.stripeCol - 1],
        ArR: [1, brainsNum], // 5 or 6
        Auto: 0, // 🤷
        P: {
            Arr: [],
            Arr1: [],
            Arr2: [],
        },
    },
    InitLawnMower: initLawnMowerStored,
    RandomGrow: function (Point, Arr) {
        Point.sort(function () {
            return Math.random() - 0.5;
        });
        Arr.sort(function () {
            return Math.random() - 0.5;
        });
        /*while (Point.length && Arr.length)
            CustomSpecial(
                oS.PName[Arr[Arr.length - 1]],
                Point[Point.length - 1][1],
                Point[Point.length - 1][0],
                1
            ),
                Point.length--,
                Arr.length--;*/
    },
    RiddleAutoGrow: riddleAutoGrowStored,
    StartGame: function () {
        oP.Monitor(), BeginCool();
        SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
        oS.RiddleAutoGrow();
    },
});

restoreToPlants(levelDataToLoad); // load the plants
