/**
 * Represents a health bar that extends the StatusBar class.
 * The health bar displays the player's health status with visual images.
 *
 * @class HealthBar
 * @extends StatusBar
 *
 * @property {string[]} IMAGES_HEALTHBAR - An array of image paths representing different health levels.
 * Each image corresponds to a health percentage, from 0% to 100%.
 * @property {string[]} IMAGES - An alias for the IMAGES_HEALTHBAR array.
 *
 * @constructor
 * Initializes the health bar by loading images and setting its initial position and health percentage.
 * The health bar is positioned at (25, 70) on the canvas and starts with a full health percentage of 100%.
 */
class HealthBar extends StatusBar {
  IMAGES_HEALTHBAR = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES = this.IMAGES_HEALTHBAR;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR);
    this.x = 25;
    this.y = 70;
    this.setPercentage(100);
  }
}
