/**
 * Represents the game world, managing the character, enemies, collectibles,
 * and the game state, including win and lose conditions.
 */
class World {
  /** @type {Character} The main character in the game */
  character = new Character();

  /** @type {HealthBar} The health bar for the character */
  healthBar = new HealthBar();

  /** @type {CoinBar} The coin bar for tracking collected coins */
  coinBar = new CoinBar();

  /** @type {BottleBar} The bottle bar for tracking collected bottles */
  bottleBar = new BottleBar();

  /** @type {EndbossBar} The health bar for the end boss */
  endbossBar = new EndbossBar();

  /** @type {Endscreen} The end screen displayed when the player wins */
  winEndscreen = new Endscreen("./img/9_intro_outro_screens/win/won_2.png", 0, 0);

  /** @type {Endscreen} The end screen displayed when the player loses */
  loseEndscreen = new Endscreen(
    "./img/9_intro_outro_screens/game_over/oh no you lost!.png",
    0,
    0
  );

  /** @type {Object} The current level of the game */
  level = level1;

  /** @type {HTMLCanvasElement} The canvas element used for rendering */
  canvas;

  /** @type {CanvasRenderingContext2D} The 2D rendering context for the canvas */
  ctx;

  /** @type {Object} The keyboard state for player controls */
  keyboard;

  /** @type {number} The x-coordinate of the camera */
  camera_x = 0;

  /** @type {number} The number of collected bottles */
  collectedBottles = 0;

  /** @type {number} The total number of bottles in the level */
  totalBottles = level1.bottles.length;

  /** @type {number} The number of collected coins */
  collectedCoins = 0;

  /** @type {number} The total number of coins in the level */
  totalCoins = level1.coins.length;

  /** @type {boolean} Whether the loop audio should be played */
  loopAudio = true;

  /** @type {boolean} Whether the audio is muted */
  muted = false;

  /** @type {boolean} Whether the player is at the boss fight */
  isAtBoss = false;

  /** @type {boolean} Whether the player has won */
  win = false;

  /** @type {boolean} Whether the player has lost */
  lose = false;

  /** @type {Array} An array to store collected coins */
  collectedCoins = [];

  /** @type {Array} An array to store throwable objects */
  throwableObjects = [];

  /** @type {Array} An array to store collected bottles */
  collectedBottles = [];

  /** @type {Object} Audio elements for sound effects */
  audio = {
    coinCollect_sound: new Audio("audio/collect coin.mp3"),
    bottleCollect_sound: new Audio("audio/collect bottle.mp3"),
  };

  /**
   * Creates an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.AudioToArray(this.audio);
    if (!stopGame) {
      this.draw();
      this.setWorld();
      this.run();
    }
  }

  /**
   * Sets the world property of the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop.
   */
  run() {
    let interval = setInterval(() => {
      this.killByJump();
    }, 1000 / 60);

    let interval2 = setInterval(() => {
      this.checkCollisions();
      this.returnCharacterPosition();
    }, 300);

    let interval3 = setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectables();
      this.checkWinOrLose();
    }, 100);

    intervalIds.push(interval, interval2, interval3);
  }

  /**
   * Adds audio effects to the sound effects array.
   * @param {Object} arr - An object containing audio elements.
   */
  AudioToArray(arr) {
    Object.values(arr).forEach((sound) => {
      soundEffects.push(sound);
    });
  }

  /**
   * Displays the end screen based on the game's outcome.
   */
  addEndscreen() {
    if (this.lose) {
      this.loseScenario();
    } else if (this.win) {
      this.winScenario();
    }
  }

  /**
   * Handles the scenario when the player loses the game.
   */
  loseScenario() {
    setTimeout(() => {
      this.stopGame();
      toggleElementAction("#restartGameScreen", "show");
      handleTurnDeviceWarning();
    }, 3000);
    toggleElementAction(".optionButtons", "hide");
    this.addToMap(this.loseEndscreen);
    this.playObjectAudio(this.loseEndscreen, "lose_sound", 0.4);
    this.pauseAudio();
    toggleElementAction("#mobileControlButtonContainer", "hide");
  }

  /**
   * Handles the scenario when the player wins the game.
   */
  winScenario() {
    setTimeout(() => {
      this.stopGame();
      toggleElementAction("#restartGameScreen", "show");
      handleTurnDeviceWarning();
    }, 3000);
    toggleElementAction(".optionButtons", "hide");
    this.addToMap(this.winEndscreen);
    this.playObjectAudio(this.winEndscreen, "win_sound", 0.4);
    this.pauseAudio();
    toggleElementAction("#mobileControlButtonContainer", "hide");
  }

  /**
   * Checks if the player has won or lost the game.
   */
  checkWinOrLose() {
    if (this.character.energy == 0) {
      this.lose = true;
    } else if (this.level.endboss[0].energy == 0) {
      this.win = true;
    }
  }

  /**
   * Stops the game and clears all intervals.
   */
  stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    this.lose = false;
    this.win = false;
    stopGame = true;
  }

  /**
   * Checks for collectible items in the game.
   */
  checkCollectables() {
    this.checkCoinCollect();
    this.checkBottleCollect();
  }

  /**
   * Checks for collected coins and updates the coin bar.
   */
  checkCoinCollect() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins++;
        this.coinBar.updateCoinBar(this.collectedCoins, this.totalCoins);
        this.level.coins.splice(i, 1);
        this.playObjectAudio(world, "coinCollect_sound", 0.2);
      }
    });
  }

  /**
   * Checks for collected bottles and updates the bottle bar.
   */
  checkBottleCollect() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.collectedBottles++;
        this.bottleBar.updateBottleBar(
          this.collectedBottles,
          this.totalBottles
        );
        this.level.bottles.splice(i, 1);
        this.playObjectAudio(world, "bottleCollect_sound", 0.2);
      }
    });
  }

  /**
   * Checks if the player is throwing objects.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let direction = this.character.otherDirection ? "left" : "right";
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        direction
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottleBar.updateBottleBar(this.collectedBottles, this.totalBottles);
    }
  }

  /**
   * Checks for collisions between the character and enemies or the boss.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isJumpedOn) {
        this.character.hit(10);
        this.healthBar.setPercentage(this.character.energy);
      }
    });

    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.hit(20);
        this.healthBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Returns the character's position to determine if they are at the boss.
   */
  returnCharacterPosition() {
    if (this.character.x > 2450) {
      this.isAtBoss = true;
    }
  }

  /**
   * Reveals the boss health bar if the player is at the boss.
   */
  revealBossHealth() {
    if (this.isAtBoss == true) {
      this.addToMap(this.endbossBar);
    }
  }

  /**
   * Handles the killing of enemies by jumping on them.
   */
  killByJump() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        enemy.isJumpedOn = true;
        setTimeout(() => {
          this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 300);
        this.playObjectAudio(enemy, "jumpedOn_sound", 1);
        this.jumpAfterKill();
      }
    });
  }

  /**
   * Executes a jump after killing an enemy.
   */
  jumpAfterKill() {
    if (this.character.y > 70) {
      this.character.speedY = 25;
      this.playObjectAudio(this.character, "jumping_sound", 0.1);
    }
  }

  /**
   * Draws the game elements on the canvas.
   */
  draw() {
    if (stopGame) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);

    this.throwableObjects = this.throwableObjects.filter(
      (obj) => !obj.isRemoved
    );
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.revealBossHealth();
    this.addEndscreen();
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - An array of objects to be added.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   * @param {Object} mo - The object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // Uncomment to display hitboxes.
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Plays the audio for a specific object.
   * @param {Object} obj - The object associated with the audio.
   * @param {string} audio - The name of the audio element.
   * @param {number} vol - The volume of the audio.
   */
  playObjectAudio(obj, audio, vol) {
    if (this.loopAudio) {
      obj.audio[audio].volume = vol;
      obj.audio[audio].play();
    } else {
      obj.audio[audio].pause();
    }
  }

  /**
   * Pauses the audio for a specified duration.
   */
  pauseAudio() {
    setTimeout(() => {
      this.loopAudio = false;
    }, 3000);
  }

  /**
   * Flips the image of an object horizontally.
   * @param {Object} mo - The object whose image will be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the flipping of the image of an object.
   * @param {Object} mo - The object whose image flip will be reverted.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
