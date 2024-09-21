let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let stopGame = false;
let fullscreenActive = false;
let backgroundMusic = new Audio ('audio/background music.mp3');

let soundEffects = [
  backgroundMusic,
];
let intervalIds = [];

function init() {
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  idle();
  toggleElement('.gameButtonContainer');
  toggleElement('#mobileControlButtonContainer');
  mobileButtonsTouchEvents();
  playBackgoundMusic();
  toggleElement('.optionButtons');
}

function restartGame() {
  toggleElement('#restartGameScreen');
  stopGame = false;
  world = null;
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  idle();
  toggleElement('#mobileControlButtonContainer');
  mobileButtonsTouchEvents();
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

function toggleMuteAudio() {
  console.log(soundEffects);
  if (!soundEffects || soundEffects.length === 0) {
    console.error("No sound effects found");
    return;
  }

  if (isMuted === false) {
    soundEffects.forEach((sound) => {
      if (sound) sound.muted = true; // Stelle sicher, dass sound nicht null ist
    });
    isMuted = true;
    document.getElementById("soundIcon").src = "img/12_game_ui/mute.png";
    world.muted = true;
  } else {
    soundEffects.forEach((sound) => {
      if (sound) sound.muted = false; // Überprüfe erneut auf Null
    });
    isMuted = false;
    document.getElementById("soundIcon").src = "img/12_game_ui/volume.png";
    world.muted = false;
  }
}

function playBackgoundMusic() {
  backgroundMusic.play();
  backgroundMusic.volume = 0.02;
}

function toggleFullScreen() {
  let container = document.getElementById('canvasMask');
  let canvas = document.getElementById('canvas');
  let icon = document.getElementById('fullscreenIcon');
  if (fullscreenActive == false) {
      if (container.requestFullscreen) {
          container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
      } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
      }
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      icon.src = 'img/12_game_ui/exit-fullscreen.png';
      fullscreenActive = true;
  } else {
      this.document.exitFullscreen();
      icon.src = 'img/12_game_ui/full-screen.png';
      fullscreenActive = false;
  }
}

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

function mobileButtonsTouchEvents() {
  // Event listeners for touch events on mobile buttons.
  document.getElementById('leftMobileButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
  });

  document.getElementById('leftMobileButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
  });

  document.getElementById('jumpMobileButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
  });

  document.getElementById('jumpMobileButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
  });

  document.getElementById('rightMobileButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
  });

  document.getElementById('rightMobileButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
  });

  document.getElementById('throwMobileButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.D = true;
  });

  document.getElementById('throwMobileButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard.D = false;
  });
}

function toggleElement(elementSelector, displayClass = 'd-flex', hideClass = 'd-none') {
  let element = document.querySelector(elementSelector);
  if (element.classList.contains(hideClass)) {
    element.classList.remove(hideClass);
    element.classList.add(displayClass);
  } else {
    element.classList.remove(displayClass);
    element.classList.add(hideClass);
  }
}