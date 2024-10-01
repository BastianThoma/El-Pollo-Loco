/**
 * Represents a chicken in the game that can move and be interacted with.
 *
 * The Chicken class extends the MovableObject class and provides functionality
 * for the chicken's behavior, including movement, animations, and interaction
 * with the player. The chicken can be jumped on, die, and play audio effects
 * when these actions occur.
 *
 * @extends {MovableObject}
 */
class Chicken extends MovableObject {
  /**
   * The vertical position of the chicken on the screen.
   * @type {number}
   */
  y = 350;

  /**
   * The height of the chicken.
   * @type {number}
   */
  height = 80;

  /**
   * The width of the chicken.
   * @type {number}
   */
  width = 70;

  /**
   * The energy level of the chicken.
   * @type {number}
   */
  energy = 35;

  /**
   * The index of the current image being displayed for the chicken.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Indicates whether the death sound has been played.
   * @type {boolean}
   */
  hasPlayedDeathSound = false;

  /**
   * Indicates whether the chicken has been jumped on.
   * @type {boolean}
   */
  isJumpedOn = false;

  /**
   * The offset values for positioning the chicken.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 10,
    left: 5,
    right: 10,
    bottom: 20,
  };

  /**
   * The images used for the walking animation of the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * The images used for the death animation of the chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Audio files related to the chicken's actions.
   * @type {{jumpedOn_sound: HTMLAudioElement, chickenDead_sound: HTMLAudioElement}}
   */
  audio = {
    jumpedOn_sound: new Audio("audio/jump on enemy.mp3"),
    chickenDead_sound: new Audio("audio/chicken dead.mp3"),
  };

  /**
   * Creates an instance of the Chicken class and initializes its properties.
   *
   * Loads the walking and dead images, sets the initial position and speed,
   * and starts the animation.
   */
  constructor() {
    super().loadImage("");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.AudioToArray(this.audio);
    this.x = 800 + Math.random() * 2800; // Random horizontal position
    this.speed = 0.15 + Math.random() * 0.5; // Random speed
    this.animate();
  }

  /**
   * Starts the animation for the chicken, updating its position and playing
   * the walking animation at a defined interval.
   */
  animate() {
    let interval = setInterval(() => {
      this.update();
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60); // 60 FPS

    this.walkInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 400); // Update walking animation every 400 ms
    intervalIds.push(interval, this.walkInterval);
  }

  /**
   * Handles the death of the chicken, stopping its animation and playing
   * the death sound if it hasn't been played yet.
   */
  die() {
    clearInterval(this.walkInterval); // Stop walking animation
    this.loadImage(this.IMAGES_DEAD); // Load death image

    if (!this.hasPlayedDeathSound) {
      this.playAudio("chickenDead_sound", 0.2); // Play death sound
      this.hasPlayedDeathSound = true; // Mark sound as played
    }
    this.speed = 0; // Stop movement
  }

  /**
   * Updates the state of the chicken. If the chicken is dead or has been
   * jumped on, it triggers the die method.
   */
  update() {
    if (this.isDead() || this.isJumpedOn == true) {
      this.die(); // Handle death logic
    }
  }
}
