/**
 * Represents the Endboss character in the game, extending the MovableObject class.
 * The Endboss has various states such as walking, alert, attacking, hurting, and dead,
 * with specific images associated with each state.
 *
 * @class Endboss
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * The vertical position of the Endboss on the game canvas.
   * @type {number}
   */
  y = 50;

  /**
   * The height of the Endboss.
   * @type {number}
   */
  height = 400;

  /**
   * The width of the Endboss.
   * @type {number}
   */
  width = 300;

  /**
   * The energy level of the Endboss.
   * @type {number}
   */
  energy = 100;

  /**
   * The movement speed of the Endboss.
   * @type {number}
   */
  speed = 5;

  /**
   * A flag indicating whether the character has had first contact with the Endboss.
   * @type {boolean}
   */
  hadFirstContact = false;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offset = {
    top: 90,
    left: 40,
    right: 60,
    bottom: 140,
  };

  /**
   * The array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * The array of image paths for the alert animation.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * The array of image paths for the attack animation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * The array of image paths for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * The array of image paths for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of the Endboss and initializes its properties.
   * Loads images for various animations and sets the initial position.
   */
  constructor() {
    super().loadImage("/img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2950;
    this.animate();
  }

  /**
   * Starts the animation loop for the Endboss.
   * Checks the state of the Endboss and plays the appropriate animation based on its condition.
   * If the Endboss is dead, it will play the dead animation and fall down.
   * If the Endboss is hurt, it will play the hurt animation.
   * If the Endboss has had first contact, it will move and potentially attack.
   * Otherwise, it will play the alert animation if the character is within range.
   *
   * @returns {void}
   */
  animate() {
    let interval = setInterval(() => {
      this.checkIfCharacterIsAtBoss();
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.fallDown();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.hadFirstContact) {
        this.moveEndboss();
      } else if (world.character.x < 2550) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 100);
    intervalIds.push(interval);
  }

  /**
   * Moves the Endboss based on its energy level.
   * If energy is above 60, it plays the walking animation; otherwise, it plays the attack animation.
   * The Endboss moves left on the screen.
   *
   * @returns {void}
   */
  moveEndboss() {
    if (this.energy > 60) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_ATTACK);
    }
    this.moveLeft();
  }

  /**
   * Checks if the character has reached the Endboss.
   * If the character's x position exceeds 2550, it sets the hadFirstContact flag to true
   * and increases the speed of the Endboss.
   *
   * @returns {void}
   */
  checkIfCharacterIsAtBoss() {
    if (world.character.x > 2550) {
      this.hadFirstContact = true;
      this.speed += 0.4;
    }
  }
}
