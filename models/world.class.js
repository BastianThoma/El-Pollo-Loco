class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  collectedBottles = [];
  collectedBottles = 0;
  totalBottles = level1.bottles.length;
  collectedCoins = [];
  collectedCoins = 0;
  totalCoins = level1.coins.length;
  loopAudio = true;
  muted = false;
  isAtBoss = false;
  win = false;
  lose = false;
  winEndscreen = new Endscreen("img/9_intro_outro_screens/win/won_2.png", 0, 0);
  loseEndscreen = new Endscreen(
    "img/9_intro_outro_screens/game_over/oh no you lost!.png",
    0,
    0
  );
  audio = {
    coinCollect_sound: new Audio("audio/collect coin.mp3"),
    bottleCollect_sound: new Audio("audio/collect bottle.mp3"),
  };

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

  setWorld() {
    this.character.world = this;
  }

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

  AudioToArray(arr) {
    Object.values(arr).forEach((sound) => {
      soundEffects.push(sound);
    });
  }

  addEndscreen() {
    if (this.lose) {
      this.loseScenario();
    } else if (this.win) {
      this.winScenario();
    }
  }

  loseScenario() {
    setTimeout(() => {
      this.stopGame();
      toggleElementAction('#restartGameScreen', 'show');
      // handleTurnDeviceWarning();
    }, 3000);
    this.addToMap(this.loseEndscreen);
    this.playObjectAudio(this.loseEndscreen, "lose_sound", 0.4);
    this.pauseAudio();
    toggleElementAction('#mobileControlButtonContainer', 'hide')
  }

  winScenario() {
    setTimeout(() => {
      this.stopGame();
      toggleElementAction('#restartGameScreen', 'show');
      handleTurnDeviceWarning();
    }, 3000);
    this.addToMap(this.winEndscreen);
    this.playObjectAudio(this.winEndscreen, "win_sound", 0.4);
    this.pauseAudio();
    toggleElementAction('#mobileControlButtonContainer', 'hide')
  }

  checkWinOrLose() {
    if (this.character.energy == 0) {
      this.lose = true;
    } else if (this.level.endboss[0].energy == 0) {
      this.win = true;
    }
  }

  stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    this.lose = false;
    this.win = false;
    stopGame = true;
  }

  checkCollectables() {
    this.checkCoinCollect();
    this.checkBottleCollect();
  }

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

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      const direction = this.character.otherDirection ? "left" : "right";
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

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
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

  returnCharacterPosition() {
    if (this.character.x > 2450) {
      this.isAtBoss = true;
    }
  }

  revealBossHealth() {
    if (this.isAtBoss == true) {
      this.addToMap(this.endbossBar);
    }
  }

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

  jumpAfterKill() {
    if (this.character.y > 75) {
      this.character.speedY = 25;
      this.playObjectAudio(this.character, "jumping_sound", 0.1);
    }
  }

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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  playObjectAudio(obj, audio, vol) {
    if (this.loopAudio) {
      obj.audio[audio].volume = vol;
      obj.audio[audio].play();
    } else {
      obj.audio[audio].pause();
    }
  }

  pauseAudio() {
    setTimeout(() => {
      this.loopAudio = false;
    }, 3000);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
