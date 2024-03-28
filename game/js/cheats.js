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
// when b, l, and n are pressed down at the same time, run oP.Balloon()
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 66) {
        document.addEventListener("keydown", function (event) {
            if (event.keyCode == 76) {
                document.addEventListener("keydown", function (event) {
                    if (event.keyCode == 78) {
                        oP.Balloon();
                    }
                });
            }
        });
    }
});