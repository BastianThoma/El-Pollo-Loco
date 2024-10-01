/**
 * Represents a throwable object in the game, extending the MovableObject class.
 * The object can be thrown, rotate during its flight, and splash upon collision.
 *
 * @class
 * @extends {MovableObject}
 */
class ThrowableObject extends MovableObject {
  /**
   * @type {{ top: number, left: number, right: number, bottom: number }}
   * @description The offset for the throwable object in pixels.
   */
  offset = {
    top: 15,
    left: 10,
    right: 20,
    bottom: 15,
  };

  /**
   * @type {string[]}
   * @description Array of image URLs for the rotating animation of the object.
   */
  IMAGES_ROTATING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * @type {string[]}
   * @description Array of image URLs for the splashing animation of the object.
   */
  IMAGES_SPLASHING = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * @type {{ shattering_sound: HTMLAudioElement }}
   * @description Object containing audio elements for the throwable object.
   */
  audio = {
    shattering_sound: new Audio("audio/shattering bottle.mp3"),
  };

  /**
   * Creates an instance of ThrowableObject.
   *
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   * @param {string} direction - The direction in which the object is thrown ("left" or "right").
   */
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

  /**
   * Initiates the throwing motion of the object.
   * Sets the vertical speed and starts the movement and rotation animations.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.startMovement();
    this.startRotation();
  }

  /**
   * Starts the movement of the object at regular intervals.
   * Checks for collisions with enemies and bosses.
   */
  startMovement() {
    this.throwInterval = setInterval(() => {
      this.move();
      this.checkBottleHit();
      intervalIds.push(this.throwInterval);
    }, 25);
  }

  /**
   * Starts the rotation animation of the object at regular intervals.
   */
  startRotation() {
    this.rotationInterval = setInterval(
      () => this.playAnimation(this.IMAGES_ROTATING),
      80
    );
    intervalIds.push(this.rotationInterval);
  }

  /**
   * Starts the splashing animation after the object collides.
   */
  startSplashing() {
    let splashIndex = 0;
    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASHING);
      splashIndex++;
      this.checkSplashEnd(splashIndex, splashInterval);
    }, 100);
    intervalIds.push(splashInterval);
  }

  /**
   * Checks if the splashing animation has ended and removes the object if so.
   *
   * @param {number} splashIndex - The current index of the splash animation.
   * @param {number} splashInterval - The interval ID for the splash animation.
   */
  checkSplashEnd(splashIndex, splashInterval) {
    if (splashIndex >= this.IMAGES_SPLASHING.length) {
      clearInterval(splashInterval);
      this.remove();
    }
  }

  /**
   * Moves the object based on its direction.
   */
  move() {
    if (this.direction === "left") {
      this.x -= 10;
    } else {
      this.x += 10;
    }
  }

  /**
   * Checks for collisions with enemies and the boss.
   */
  checkBottleHit() {
    world.level.enemies.forEach((enemy) => {
      this.checkCollisionWithEnemy(enemy);
    });

    world.level.endboss.forEach((boss) => {
      this.checkCollisionWithBoss(boss);
    });
  }

  /**
   * Checks for collision with a given enemy and handles it.
   *
   * @param {Object} enemy - The enemy object to check collision with.
   */
  checkCollisionWithEnemy(enemy) {
    if (this.isColliding(enemy)) {
      this.handleCollision();
      enemy.hit(35);
    }
  }

  /**
   * Checks for collision with a given boss and handles it.
   *
   * @param {Object} boss - The boss object to check collision with.
   */
  checkCollisionWithBoss(boss) {
    if (this.isColliding(boss)) {
      this.handleCollision();
      boss.hit(35);
      world.endbossBar.setPercentage(boss.energy);
    }
  }

  /**
   * Handles the collision event by stopping movement and playing the splash animation.
   */
  handleCollision() {
    clearInterval(this.throwInterval);
    clearInterval(this.rotationInterval);
    this.speedY = 0;
    this.acceleration = 0;
    this.playSplashAnimation();
  }

  /**
   * Plays the splash animation and sound upon collision.
   */
  playSplashAnimation() {
    if (!world.muted) {
      this.startSplashing();
      this.playAudio("shattering_sound", 0.2);
    }
  }

  /**
   * Marks the object as removed from the game.
   */
  remove() {
    this.isRemoved = true;
  }
}
