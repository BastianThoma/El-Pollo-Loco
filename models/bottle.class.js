/**
 * Represents a bottle in the game, extending from the MovableObject class.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /** @type {number} Width of the bottle. */
  width = 70;

  /** @type {number} Height of the bottle. */
  height = 110;

  /**
   * @type {Object} Offset for the bottle's position.
   * @property {number} top - The top offset of the bottle.
   * @property {number} left - The left offset of the bottle.
   * @property {number} right - The right offset of the bottle.
   * @property {number} bottom - The bottom offset of the bottle.
   */
  offset = {
    top: 25,
    left: 30,
    right: 50,
    bottom: 30,
  };

  /**
   * Creates an instance of the Bottle class.
   * @param {string} imagePath - The path to the image for the bottle.
   * @param {number} x - The x-coordinate position of the bottle.
   * @param {number} y - The y-coordinate position of the bottle.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath); // Load the bottle image using the parent class method
    this.x = x; // Set the x position of the bottle
    this.y = y; // Set the y position of the bottle
  }
}
