/**
 * Represents a Coin object that extends MovableObject.
 * The Coin has a percentage value, specific dimensions, and offsets for positioning.
 * It also handles animation of the coin images.
 *
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /**
   * Percentage value associated with the Coin.
   * @type {number}
   */
  percentage = 10;

  /**
   * Width of the Coin in pixels.
   * @type {number}
   */
  width = 100;

  /**
   * Height of the Coin in pixels.
   * @type {number}
   */
  height = 100;

  /**
   * Offset values for positioning the Coin.
   * @type {{ top: number, left: number, right: number, bottom: number }}
   */
  offset = {
    top: 40,
    left: 40,
    right: 80,
    bottom: 80,
  };

  /**
   * Array of image paths for the Coin animations.
   * @type {string[]}
   */
  IMAGES_COIN = ["../img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a Coin object and initializes its position and images.
   *
   * @param {number} x - The x-coordinate of the Coin.
   * @param {number} y - The y-coordinate of the Coin.
   */
  constructor(x, y) {
    super().loadImage("../img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the animation of the Coin images at regular intervals.
   * The animation switches between images defined in IMAGES_COIN every 400 milliseconds.
   *
   * @returns {void}
   */
  animate() {
    let interval = setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 400);
    intervalIds.push(interval);
  }
}
