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
  throwableObjects = [];
  bottleCollect_sound = new Audio("audio/collect bottle.mp3");
  collectedBottles = [];
  collectedBottles = 0;
  totalBottles = level1.bottles.length;
  collectedCoins = [];
  collectedCoins = 0;
  coinCollect_sound = new Audio("audio/collect coin.mp3");
  totalCoins = level1.coins.length;
  loopAudio = true;
  muted = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.start = function () {
      this.draw();
      this.setWorld();
      this.run();
    };
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.killByJump();
    }, 1000 / 60);
    setInterval(() => {
      this.checkCollisions();
    }, 300);
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectables();
    }, 100);
  }

  checkCollectables() {
    this.checkCoinCollect();
    this.checkBottleCollect();
  }

  checkCoinCollect() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coinCollect_sound.volume = 1;
        this.coinCollect_sound.playbackRate = 1.5;
        this.coinCollect_sound.play();
        this.collectedCoins++;
        this.coinBar.updateCoinBar(this.collectedCoins, this.totalCoins);
        this.level.coins.splice(i, 1);
      }
    });
  }

  checkBottleCollect() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.bottleCollect_sound.volume = 1;
        this.bottleCollect_sound.playbackRate = 1.5;
        this.bottleCollect_sound.play();
        this.collectedBottles++;
        this.bottleBar.updateBottleBar(
          this.collectedBottles,
          this.totalBottles
        );
        this.level.bottles.splice(i, 1);
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
        // this.playAudio(enemy, 'jumped_on_sound', 0.2);
        this.jumpAfterKill();
      }
    });
  }

  jumpAfterKill() {
    if (this.character.y > 75) {
      this.character.speedY = 25;
      // this.playAudio(this.character, 'bouncing_sound', 0.2);
    }
  }

  draw() {
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
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    // draw wird immer wieder aufgerufen.
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

  playAudio(obj, audio, vol) {
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

  //   playAudio(obj, audio, vol) {
  //     if (this.loopAudio) {
  //       obj.audio[audio].volume = vol;
  //       obj.audio[audio].play();
  //     } else {
  //       obj.audio[audio].pause();
  //     }
  //   }

  //   pauseAudio() {
  //     setTimeout(() => {
  //       this.loopAudio = false;
  //     }, 3000);
  //   }
}
