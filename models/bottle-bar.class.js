/**
 * Class representing a bottle status bar.
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
  /**
   * Array of image paths representing different states of the bottle bar.
   * @type {string[]}
   */
  IMAGES_BOTTLEBAR = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Array of images for the bottle bar.
   * @type {string[]}
   */
  IMAGES = this.IMAGES_BOTTLEBAR;

  /**
   * Creates an instance of BottleBar.
   * Calls the parent class's constructor and initializes the bottle bar.
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLEBAR);
    this.x = 25;
    this.y = 0;
    this.setPercentage(0);
  }

  /**
   * Updates the bottle bar based on the number of throwable objects and total bottles.
   * Calculates the percentage of bottles collected and sets it on the bar.
   * @param {number} throwableObjects - The number of throwable objects collected.
   * @param {number} totalBottles - The total number of bottles available.
   */
  updateBottleBar(throwableObjects, totalBottles) {
    let percentage = Math.round((throwableObjects / totalBottles) * 100);
    this.setPercentage(percentage);
  }
}
