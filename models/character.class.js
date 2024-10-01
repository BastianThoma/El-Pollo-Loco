/**
 * Represents a character in the game.
 * Extends the MovableObject class to implement character-specific behaviors.
 */
class Character extends MovableObject {
  /** @type {number} The vertical position of the character. */
  y = 180;

  /** @type {number} The horizontal position of the character. */
  x = 100;

  /** @type {number} The height of the character. */
  height = 250;

  /** @type {number} The width of the character. */
  width = 150;

  /** @type {number} The movement speed of the character. */
  speed = 6;

  /** @type {{top: number, left: number, right: number, bottom: number}} The offset values for collision detection. */
  offset = {
    top: 110,
    left: 35,
    right: 70,
    bottom: 120,
  };

  /** @type {string[]} An array of image paths for the character's walking animation. */
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} An array of image paths for the character's jumping animation. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} An array of image paths for the character's dead animation. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} An array of image paths for the character's hurt animation. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} An array of image paths for the character's idle animation. */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} An array of image paths for the character's long idle animation. */
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {{[key: string]: HTMLAudioElement}} An object containing audio elements for various character actions. */
  audio = {
    walking_sound: new Audio("audio/walking on gravel.mp3"),
    jumping_sound: new Audio("audio/jump voice.mp3"),
    landing_sound: new Audio("audio/landing on gravel(Jump).mp3"),
    hurting_sound: new Audio("audio/oww sound.mp3"),
    dying_sound: new Audio("audio/huge ow sound.mp3"),
    snoring_sound: new Audio("audio/snoring sound.mp3"),
  };

  /** @type {number} The index of the current image being displayed. */
  currentImage = 0;

  /** @type {World} The world that the character is currently in. */
  world;

  /**
   * Creates an instance of the Character class.
   * Initializes the character with images and sounds, and applies gravity and animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.AudioToArray(this.audio);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the animation and movement intervals for the character.
   */
  animate() {
    let interval = setInterval(() => {
      this.handleMovement();
      this.updateCamera();
    }, 1000 / 60);

    let interval2 = setInterval(() => {
      this.handleAnimations();
    }, 100);

    intervalIds.push(interval, interval2);
  }

  /**
   * Handles character movement based on keyboard input.
   * Checks for right and left movement and handles jumping.
   */
  handleMovement() {
    if (this.isDead()) return;

    this.audio["walking_sound"].pause();
    let { RIGHT, LEFT, SPACE } = this.world.keyboard;
    let canMoveRight = RIGHT && this.x < this.world.level.level_end_x;
    let canMoveLeft = LEFT && this.x > 0;

    if (canMoveRight || canMoveLeft) {
      this[canMoveRight ? "moveRight" : "moveLeft"]();
      this.otherDirection = !canMoveRight;
      this.playAudio("walking_sound", 0.2);
    }

    if (SPACE && !this.isAboveGround()) {
      this.audio["walking_sound"].pause();
      this.jump();
      this.playAudio("jumping_sound", 0.1);
      this.playLandingSound();
    }
  }

  /**
   * Handles character animations based on its current state.
   * Determines whether the character is idle, jumping, hurt, or dead.
   */
  handleAnimations() {
    if (this.isDead()) {
      this.handleDeath();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.playAudio("hurting_sound", 0.2);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.idle) {
      this.playAnimationOnce(this.IMAGES_IDLE);
    } else if (this.world.keyboard.longIdle) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.playAudio("snoring_sound", 0.2);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.audio["snoring_sound"].pause();
    }
  }

  /**
   * Handles the character's death animation and sound effects.
   */
  handleDeath() {
    if (!this.dyingSoundPlayed) {
      this.playAudio("dying_sound", 0.2);
      this.dyingSoundPlayed = true;
    }
    this.playAnimationOnce(this.IMAGES_DEAD);
  }

  /**
   * Updates the camera position based on the character's current x-coordinate.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Plays the landing sound after the character lands from a jump.
   */
  playLandingSound() {
    setTimeout(() => {
      if (this.isOnGround()) this.playAudio("landing_sound", 0.1);
    }, 1000);
  }
}
