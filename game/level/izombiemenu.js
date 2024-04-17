oS.Init({
  PicArr: (function () {
    a = "images/interface/";
    return [
      ShadowPNG,
      a + "BackButton.png",
      a + "izombie1.png",
      a + "izombie2.png",
      a + "izombie3.png",
      a + "izombie4.png",
      a + "izombie5.png",
      a + "izombie6.png",
      a + "izombie7.png",
      a + "izombie8.png",
      a + "izombie9.png",
    ];
  })(),
  LevelName: "I, Zombie Menu",
  LevelEName: 150,
  ShowScroll: 1,
  LoadMusic: "cerebrawl",
  StartGameMusic: "cerebrawl",
  AudioArr: ["cerebrawl", "pvzs"],
  backgroundImage: "images/interface/IZombie_Background.png",
  LoadAccess: function (a) {
    NewImg(
      "imgSF",
      "images/interface/BackButton.png",
      "left:785px;top:530px",
      EDAll,
      {
        onclick: function () {
          SelectModal(0);
          SetBlock($("dSurface"), $("iSurfaceBackground"));
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie1.png",
      "left:50px;top:130px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie1' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie2.png",
      "left:200px;top:130px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie2' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie3.png",
      "left:350px;top:130px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie3' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie4.png",
      "left:500px;top:130px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie4' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie5.png",
      "left:650;top:130",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie5' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie6.png",
      "left:50;top:270",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie6' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie7.png",
      "left:200px;top:270px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie7' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie8.png",
      "left:350px;top:270px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie8' + '');
        },
      }
    );
    NewImg(
      "imgSF",
      "images/interface/izombie9.png",
      "left:500px;top:270px",
      EDAll,
      {
        onclick: function () {
          SelectModal('' + 'izombie9' + '');
        },
      }
    );
  },
});