/**
 * Represents a movable object in a game or simulation that can be drawn and manipulated.
 * This class extends from `DrawableObject`.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * The speed at which the object moves horizontally.
   * @type {number}
   * @default 0.15
   */
  speed = 0.15;

  /**
   * Indicates if the object is facing the opposite direction.
   * @type {boolean}
   * @default false
   */
  otherDirection = false;

  /**
   * The vertical speed of the object.
   * @type {number}
   * @default 0
   */
  speedY = 0;

  /**
   * The acceleration applied to the object when affected by gravity.
   * @type {number}
   * @default 2.5
   */
  acceleration = 2.5;

  /**
   * The current energy level of the object.
   * @type {number}
   * @default 100
   */
  energy = 100;

  /**
   * The timestamp of the last hit the object received.
   * @type {number}
   * @default 0
   */
  lastHit = 0;

  /**
   * Applies gravity to the object, updating its vertical position based on speed and acceleration.
   * This method runs continuously at a set interval.
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks if the object is on the ground.
   * @returns {boolean} True if the object is on the ground, false otherwise.
   */
  isOnGround() {
    return this.y > 180;
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check collision against.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left + this.width - this.offset.right >
        mo.x + mo.offset.left &&
      this.y + this.offset.top + this.height - this.offset.bottom >
        mo.y + mo.offset.top &&
      this.x + this.offset.left <
        mo.x + mo.offset.left + mo.width - mo.offset.right &&
      this.y + this.offset.top <
        mo.y + mo.offset.top + mo.height - mo.offset.bottom
    );
  }

  /**
   * Applies damage to the object, reducing its energy.
   * If the energy falls below zero, it is set to zero.
   * @param {number} dmg - The amount of damage to apply.
   * @returns {void}
   */
  hit(dmg) {
    this.energy -= dmg;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt based on the time since the last hit.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead (energy is zero).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation using the provided image array.
   * The current image is updated based on the animation sequence.
   * @param {string[]} images - An array of image paths to use for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation once using the provided image array.
   * Resets the animation when the last image is reached.
   * @param {string[]} images - An array of image paths to use for the animation.
   * @returns {void}
   */
  playAnimationOnce(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    if (this.currentImage === images.length - 1) {
      this.currentImage = 0;
      return;
    }
    this.currentImage++;
  }

  /**
   * Plays audio associated with the object at a specified volume.
   * @param {string} audio - The name of the audio to play.
   * @param {number} volume - The volume level (0 to 1) for the audio playback.
   * @returns {void}
   */
  playAudio(audio, volume) {
    this.audio[audio].volume = volume;
    this.audio[audio].play();
  }

  /**
   * Pauses the audio playback.
   * @returns {void}
   */
  pauseAudio() {
    setTimeout(() => {
      this.loopAudio = false;
    }, 50);
  }

  /**
   * Moves the object to the right by the object's speed.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by the object's speed.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 30;
  }
}
