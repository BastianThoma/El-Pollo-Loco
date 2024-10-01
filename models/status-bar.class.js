/**
 * Represents a status bar that visually indicates a percentage value.
 * It extends the DrawableObject class and manages its appearance based on
 * the current percentage value.
 *
 * @class
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * The current percentage value of the status bar. Default is 100.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of the StatusBar.
   * Initializes the width and height of the status bar.
   */
  constructor() {
    super();
    this.width = 200; // Width of the status bar
    this.height = 45; // Height of the status bar
  }

  /**
   * Sets the percentage value of the status bar and updates the corresponding image.
   *
   * @param {number} percentage - The percentage value to set (0-100).
   * @throws {RangeError} Will throw an error if percentage is out of range.
   */
  setPercentage(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new RangeError("Percentage must be between 0 and 100");
    }

    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current percentage value.
   *
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
