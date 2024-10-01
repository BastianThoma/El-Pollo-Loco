/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object.
   * @type {number}
   * @default 720
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   * @default 480
   */
  height = 480;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image for the background object.
   * @param {number} x - The x-coordinate for positioning the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
