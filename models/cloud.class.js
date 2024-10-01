/**
 * Represents a cloud object that moves across the screen.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * The vertical position of the cloud.
   * @type {number}
   * @default 20
   */
  y = 20;

  /**
   * The width of the cloud.
   * @type {number}
   * @default 500
   */
  width = 500;

  /**
   * The height of the cloud.
   * @type {number}
   * @default 250
   */
  height = 250;

  /**
   * Creates an instance of the Cloud class.
   * Initializes the cloud's position and speed, and loads its image.
   */
  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");

    /**
     * The horizontal position of the cloud, randomly set within a range.
     * @type {number}
     */
    this.x = Math.random() * 5000;

    /**
     * The speed at which the cloud moves.
     * @type {number}
     */
    this.speed = 0.05 + Math.random() * 0.2;

    this.animate();
  }

  /**
   * Starts the animation for the cloud, causing it to move left at regular intervals.
   * The animation runs at approximately 60 frames per second.
   * @returns {void}
   */
  animate() {
    let interval = setInterval(() => {
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60);
    intervalIds.push(interval);
  }
}
