let keysPressed = {};
console.log("test")
document.addEventListener('keydown', event => {
  keysPressed[event.key] = true;
   // super fast
  if (keysPressed['s'] && keysPressed['f']) {
    CSpeed(1000,10,1000);
  }
  // balloon
  if (keysPressed['b'] && keysPressed['l'] && keysPressed['n']) {
    oP.Balloon();
  }
  // restart
  if (keysPressed['r']) {
    document.querySelector('#btnNextLevel').click();
  }
  // almanac (handbook)
  if (keysPressed['k']) {
    ViewHandBook();
  }
  // sun
  if (keysPressed['j']) {
    AppearSun(
        GetX(Math.floor(1 + Math.random() * oS.C)),
        GetY(Math.floor(1 + Math.random() * oS.R)),
        25,
        1
    );
  }
});

document.addEventListener('keyup', event => {
  keysPressed[event.key] = false;
});
