class ThrowableObject extends MovableObject {
  offset = {
    top: 15,
    left: 10,
    right: 20,
    bottom: 15,
  };

  IMAGES_ROTATING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASHING = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  audio = {
    shattering_sound: new Audio("audio/shattering bottle.mp3"),
  };

  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.AudioToArray(this.audio);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASHING);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.height = 65;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.startMovement();
    this.startRotation();
  }

  startMovement() {
    this.throwInterval = setInterval(() => {
      this.move();
      this.checkBottleHit();
      intervalIds.push(this.throwInterval);
    }, 25);
  }

  startRotation() {
    this.rotationInterval = setInterval(
      () => this.playAnimation(this.IMAGES_ROTATING),
      80
    );
    intervalIds.push(this.rotationInterval);
  }

  startSplashing() {
    let splashIndex = 0;
    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASHING);
      splashIndex++;
      this.checkSplashEnd(splashIndex, splashInterval);
    }, 100);
    intervalIds.push(splashInterval);
  }
  
  checkSplashEnd(splashIndex, splashInterval) {
    if (splashIndex >= this.IMAGES_SPLASHING.length) {
      clearInterval(splashInterval);
      this.remove();
    }
  }

  move() {
    if (this.direction === "left") {
      this.x -= 10;
    } else {
      this.x += 10;
    }
  }

  checkBottleHit() {
    world.level.enemies.forEach((enemy) => {
      this.checkCollisionWithEnemy(enemy);
    });
  
    world.level.endboss.forEach((boss) => {
      this.checkCollisionWithBoss(boss);
    });
  }
  
  checkCollisionWithEnemy(enemy) {
    if (this.isColliding(enemy)) {
      this.handleCollision();
      enemy.hit(35);
    }
  }
  
  checkCollisionWithBoss(boss) {
    if (this.isColliding(boss)) {
      this.handleCollision();
      boss.hit(35);
      world.endbossBar.setPercentage(boss.energy);
    }
  }

  handleCollision() {
    clearInterval(this.throwInterval);
    clearInterval(this.rotationInterval);
    this.speedY = 0;
    this.acceleration = 0;
    this.playSplashAnimation();
  }

  playSplashAnimation() {
    if (!world.muted) {
      this.startSplashing();
      this.playAudio("shattering_sound", 0.2);
    }
  }

  remove() {
    this.isRemoved = true;
  }
}
