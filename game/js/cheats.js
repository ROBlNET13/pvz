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
// when k is pressed, show handbook (almanac)
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 75) {
        ViewHandBook();
    }
});
// when b, l, and n are pressed down at the same time, spawn a balloon
let keysPressed = {};

document.addEventListener('keydown', event => {
  keysPressed[event.key] = true;
  
  if (keysPressed['b'] && keysPressed['l'] && keysPressed['n']) {
    oP.Balloon();
  }
});

document.addEventListener('keyup', event => {
  keysPressed[event.key] = false;
});
