/**
 * Represents a chick that can move and interact within the game.
 * The chick has energy, images for different states (walking and dead),
 * and audio clips for interactions.
 *
 * @extends MovableObject
 */
class Chick extends MovableObject {
  /**
   * The vertical position of the chick.
   * @type {number}
   * @default 370
   */
  y = 370;

  /**
   * The height of the chick.
   * @type {number}
   * @default 60
   */
  height = 60;

  /**
   * The width of the chick.
   * @type {number}
   * @default 50
   */
  width = 50;

  /**
   * The energy level of the chick.
   * @type {number}
   * @default 35
   */
  energy = 35;

  /**
   * The index of the current image being displayed.
   * @type {number}
   * @default 0
   */
  currentImage = 0;

  /**
   * Indicates if the death sound has been played.
   * @type {boolean}
   * @default false
   */
  hasPlayedDeathSound = false;

  /**
   * Indicates if the chick has been jumped on.
   * @type {boolean}
   * @default false
   */
  isJumpedOn = false;

  /**
   * The offset for rendering the chick.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 10,
    left: 5,
    right: 10,
    bottom: 20,
  };

  /**
   * The array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * The array of image paths for the dead state.
   * @type {string[]}
   */
  IMAGES_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * The audio clips associated with the chick.
   * @type {{jumpedOn_sound: HTMLAudioElement, chickDead_sound: HTMLAudioElement}}
   */
  audio = {
    jumpedOn_sound: new Audio("audio/jump on enemy.mp3"),
    chickDead_sound: new Audio("audio/chick dead.mp3"),
  };

  /**
   * Creates an instance of the Chick class and initializes its properties.
   * Loads the walking and dead images and sets a random position and speed.
   */
  constructor() {
    super().loadImage("");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.AudioToArray(this.audio);
    this.x = 600 + Math.random() * 2800;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Starts the animation for the chick.
   * Moves the chick to the left and plays the walking animation at regular intervals.
   * @returns {void}
   */
  animate() {
    let interval = setInterval(() => {
      this.update();
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60);

    this.walkInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 400);
    intervalIds.push(interval, this.walkInterval);
  }

  /**
   * Handles the death of the chick, stopping its movement and playing the death sound.
   * @returns {void}
   */
  die() {
    clearInterval(this.walkInterval);
    this.loadImage(this.IMAGES_DEAD);

    if (!this.hasPlayedDeathSound) {
      this.playAudio("chickDead_sound", 0.2);
      this.hasPlayedDeathSound = true;
    }
    this.speed = 0;
  }

  /**
   * Updates the state of the chick.
   * If the chick is dead or has been jumped on, it calls the die method.
   * @returns {void}
   */
  update() {
    if (this.isDead() || this.isJumpedOn == true) {
      this.die();
    }
  }
}
