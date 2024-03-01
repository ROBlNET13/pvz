// when j is hit print hello world
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 74) {
        AppearSun(
            GetX(Math.floor(1 + Math.random() * oS.C)),
            GetY(Math.floor(1 + Math.random() * oS.R)),
            prompt("sun value", "50"),
            1
        );
    }
});
