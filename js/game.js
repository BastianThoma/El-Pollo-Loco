/**
 * Global variables for the game.
 * @type {HTMLCanvasElement} canvas - The game canvas element.
 * @type {World} world - The game world instance.
 * @type {Keyboard} keyboard - The keyboard input object for controlling the game.
 * @type {boolean} isMuted - Indicates whether the game audio is muted.
 * @type {boolean} stopGame - Controls whether the game should stop.
 * @type {boolean} fullscreenActive - Indicates whether the game is in fullscreen mode.
 * @type {number} shortIdleTimer - Timer for short idle period.
 * @type {number} longIdleTimer - Timer for long idle period.
 * @type {HTMLAudioElement} backgroundMusic - Background music audio element.
 * @type {HTMLAudioElement[]} soundEffects - Array of sound effect elements.
 * @type {number[]} intervalIds - Stores interval IDs for clearing intervals.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let stopGame = false;
let fullscreenActive = false;
let shortIdleTimer;
let longIdleTimer;

let backgroundMusic = new Audio("audio/background music.mp3");
let soundEffects = [backgroundMusic];
let intervalIds = [];

/**
 * Initializes the game by setting up the world, event listeners, and sound settings.
 * @function
 */
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

/**
 * Restarts the game by resetting the world, sounds, and UI elements.
 * @function
 */
function restartGame() {
  toggleElementAction("#restartGameScreen", "hide");
  soundEffects = [backgroundMusic];
  stopGame = false;
  world = null;
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  idle();
  playBackgoundMusic();
  handleMobileButtons();
  handleTurnDeviceWarning();
  mobileButtonsTouchEvents();
  initializeSoundSettings();
}

/**
 * Displays the start screen image on the canvas.
 * @function
 */
function startScreen() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let img = new Image();
  img.src = "../img/9_intro_outro_screens/start/startscreen_2.png";

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

window.addEventListener("resize", startScreen);

/**
 * Mutes all sounds in the game.
 * @function
 */
function muteSounds() {
  soundEffects.forEach((sound) => {
    if (sound) sound.muted = true;
  });
  world.muted = true;
}

/**
 * Unmutes all sounds in the game.
 * @function
 */
function unmuteSounds() {
  soundEffects.forEach((sound) => {
    if (sound) sound.muted = false;
  });
  world.muted = false;
}

/**
 * Updates the sound icon based on the mute status.
 * @function
 * @param {boolean} isMuted - Whether the game is currently muted.
 */
function updateSoundIcon(isMuted) {
  const iconSrc = isMuted
    ? "../img/12_game_ui/mute.png"
    : "../img/12_game_ui/volume.png";
  document.getElementById("soundIcon").src = iconSrc;
}

/**
 * Toggles mute/unmute for the game audio and updates the local storage.
 * @function
 */
function toggleMuteAudio() {
  if (isMuted === false) {
    muteSounds();
  } else {
    unmuteSounds();
  }
  isMuted = !isMuted;
  updateSoundIcon(isMuted);

  localStorage.setItem("isMuted", isMuted);
}

/**
 * Initializes sound settings from local storage and updates the mute status.
 * @function
 */
function initializeSoundSettings() {
  let savedMuteStatus = localStorage.getItem("isMuted");

  if (savedMuteStatus !== null) {
    isMuted = savedMuteStatus === "true";
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

/**
 * Plays the background music with a low volume.
 * @function
 */
function playBackgoundMusic() {
  backgroundMusic.play();
  backgroundMusic.volume = 0.02;
}

/**
 * Toggles fullscreen mode for the canvas and updates the UI accordingly.
 * @function
 */
function toggleFullScreen() {
  let container = document.getElementById("canvasMask");
  let canvas = document.getElementById("canvas");
  let icon = document.getElementById("fullscreenIcon");
  let restartGameScreen = document.getElementById("restartGameScreen");

  if (!fullscreenActive) {
    enterFullScreen(container);
    adjustCanvasForFullScreen(canvas, restartGameScreen, true);
    updateFullScreenIcon(icon, true);
    fullscreenActive = true;
  } else {
    exitFullScreen();
    adjustCanvasForFullScreen(canvas, restartGameScreen, false);
    updateFullScreenIcon(icon, false);
    fullscreenActive = false;
  }
}

/**
 * Requests fullscreen for the specified HTML element.
 * @function
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 * @function
 */
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

/**
 * Adjusts the canvas and restart screen for fullscreen mode.
 * @function
 * @param {HTMLElement} canvas - The game canvas.
 * @param {HTMLElement} restartGameScreen - The restart game screen element.
 * @param {boolean} isFullScreen - Whether fullscreen is active.
 */
function adjustCanvasForFullScreen(canvas, restartGameScreen, isFullScreen) {
  if (isFullScreen) {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.classList.remove("br-16");
    restartGameScreen.classList.remove("br-16");
  } else {
    canvas.style.width = "";
    canvas.style.height = "";
    canvas.classList.add("br-16");
    restartGameScreen.classList.add("br-16");
  }
}

/**
 * Updates the fullscreen icon based on whether fullscreen is active.
 * @function
 * @param {HTMLElement} icon - The icon element.
 * @param {boolean} isFullScreen - Whether fullscreen is active.
 */
function updateFullScreenIcon(icon, isFullScreen) {
  icon.src = isFullScreen
    ? "../img/12_game_ui/exit-fullscreen.png"
    : "../img/12_game_ui/full-screen.png";
}

/**
 * Sets the keyboard to idle after a short period of inactivity.
 * @function
 */
function shortIdle() {
  keyboard.idle = true;
}

/**
 * Sets the keyboard to a long idle state after a longer period of inactivity.
 * @function
 */
function longIdle() {
  keyboard.idle = false;
  keyboard.longIdle = true;
}

/**
 * Resets the idle timers and the keyboard state.
 * @function
 */
function resetTimer() {
  keyboard.idle = false;
  keyboard.longIdle = false;
  clearTimeout(shortIdleTimer);
  clearTimeout(longIdleTimer);
  startTimers();
}

/**
 * Starts the timers for short and long idle periods.
 * @function
 */
function startTimers() {
  shortIdleTimer = setTimeout(shortIdle, 3000);
  longIdleTimer = setTimeout(longIdle, 7000);
}

/**
 * Initializes idle detection by listening to user activity events.
 * @function
 */
function idle() {
  const events = ["mousemove", "mousedown", "click", "keydown", "touchstart"];
  events.forEach((event) => {
    window.addEventListener(event, resetTimer, true);
  });

  startTimers();
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

/**
 * Displays or hides mobile control buttons based on screen width.
 * @function
 */
function handleMobileButtons() {
  setInterval(() => {
    if (window.innerWidth < 1000) {
      toggleElementAction("#mobileControlButtonContainer", "show");
    } else {
      toggleElementAction("#mobileControlButtonContainer", "hide");
    }
  }, 100);
}

/**
 * Displays or hides a message to turn the device based on screen width.
 * @function
 */
function handleTurnDeviceWarning() {
  setInterval(() => {
    if (window.innerWidth < 600) {
      toggleElementAction("#turnDeviceMessage", "show");
    } else {
      toggleElementAction("#turnDeviceMessage", "hide");
    }
  }, 100);
}

/**
 * Reloads the page.
 * @function
 */
function reloadPage() {
  location.reload();
}
