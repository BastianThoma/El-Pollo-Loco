let canvas;
let world;
let keyboard = new Keyboard();

let intervalIds = [];

function startGame() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  idle();
  world.start();
}

function startScreen() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.src = "img/9_intro_outro_screens/start/startscreen_2.png";
  
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }

window.addEventListener("resize", startScreen);

function idle() {
  function shortIdle() {
    keyboard.idle = true;
  }
  function longIdle() {
    keyboard.idle = false;
    keyboard.longIdle = true;
  }
  var shortIdleTimer;
  var longIdleTimer;
  function resetTimer() {
    keyboard.idle = false;
    keyboard.longIdle = false;
    clearTimeout(shortIdleTimer);
    clearTimeout(longIdleTimer);
    shortIdleTimer = setTimeout(shortIdle, 3000);
    longIdleTimer = setTimeout(longIdle, 7000);
  }
  window.addEventListener("mousemove", resetTimer, true);
  window.addEventListener("mousedown", resetTimer, true);
  window.addEventListener("click", resetTimer, true);
  window.addEventListener("keydown", resetTimer, true);
  window.addEventListener("touchstart", resetTimer, true);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
