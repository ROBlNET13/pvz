// when j is pressed, let the user spawn a sun at a random location
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 74) {
        AppearSun(
            GetX(Math.floor(1 + Math.random() * oS.C)),
            GetY(Math.floor(1 + Math.random() * oS.R)),
            25,
            1
        );
    }
});
// when k is pressed, show handbook
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 75) {
        ViewHandBook();
    }
});