let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let stopGame = false;
let fullscreenActive = false;

let backgroundMusic = new Audio("audio/background music.mp3");

let soundEffects = [backgroundMusic];
let intervalIds = [];

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  idle();
  toggleElementAction(".gameButtonContainer", "hide");
  handleMobileButtons();
  handleTurnDeviceWarning();
  mobileButtonsTouchEvents();
  playBackgoundMusic();
  toggleElementAction(".optionButtons", "show");
  initializeSoundSettings();
}

function restartGame() {
  toggleElementAction("#restartGameScreen", "hide");
  soundEffects = [backgroundMusic];
  stopGame = false;
  world = null;
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  idle();
  handleMobileButtons();
  handleTurnDeviceWarning();
  mobileButtonsTouchEvents();
  initializeSoundSettings();
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

function muteSounds() {
  soundEffects.forEach((sound) => {
    if (sound) sound.muted = true;
  });
  world.muted = true;
}

function unmuteSounds() {
  soundEffects.forEach((sound) => {
    if (sound) sound.muted = false;
  });
  world.muted = false;
}

function updateSoundIcon(isMuted) {
  const iconSrc = isMuted ? "img/12_game_ui/mute.png" : "img/12_game_ui/volume.png";
  document.getElementById("soundIcon").src = iconSrc;
}

function toggleMuteAudio() {
  if (isMuted === false) {
    muteSounds();
  } else {
    unmuteSounds();
  }
  isMuted = !isMuted;
  updateSoundIcon(isMuted);

  localStorage.setItem('isMuted', isMuted);
}

function initializeSoundSettings() {
  let savedMuteStatus = localStorage.getItem('isMuted');

  if (savedMuteStatus !== null) {
    isMuted = savedMuteStatus === 'true';
  } else {
    isMuted = false;
  }

  if (isMuted) {
    muteSounds();
  } else {
    unmuteSounds();
  }
  updateSoundIcon(isMuted);
}

function playBackgoundMusic() {
  backgroundMusic.play();
  backgroundMusic.volume = 0.02;
}

function toggleFullScreen() {
  let container = document.getElementById("canvasMask");
  let canvas = document.getElementById("canvas");
  let icon = document.getElementById("fullscreenIcon");
  if (fullscreenActive == false) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    icon.src = "img/12_game_ui/exit-fullscreen.png";
    fullscreenActive = true;
  } else {
    this.document.exitFullscreen();
    icon.src = "img/12_game_ui/full-screen.png";
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
  document
    .getElementById("leftMobileButton")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });

  document
    .getElementById("leftMobileButton")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });

  document
    .getElementById("jumpMobileButton")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });

  document
    .getElementById("jumpMobileButton")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });

  document
    .getElementById("rightMobileButton")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });

  document
    .getElementById("rightMobileButton")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });

  document
    .getElementById("throwMobileButton")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.D = true;
    });

  document
    .getElementById("throwMobileButton")
    .addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.D = false;
    });
}

function toggleElementAction(
  elementSelector,
  action,
  displayClass = "d-flex",
  hideClass = "d-none"
) {
  let element = document.querySelector(elementSelector);
  if (action === "show") {
    element.classList.remove(hideClass);
    element.classList.add(displayClass);
  } else if (action === "hide") {
    element.classList.remove(displayClass);
    element.classList.add(hideClass);
  }
}

function handleMobileButtons(){
  setInterval(() => {
      if (window.innerWidth < 1000) {
        toggleElementAction("#mobileControlButtonContainer", "show");
      } else {
        toggleElementAction("#mobileControlButtonContainer", "hide");
      }
  }, 100);
}

function handleTurnDeviceWarning(){
  setInterval(() => {
      if (window.innerWidth < 600) {
        toggleElementAction("#turnDeviceMessage", "show");
      } else {
        toggleElementAction("#turnDeviceMessage", "hide");
      }
  }, 100);
}