/**
 * Represents a health status bar for the end boss.
 * This class extends the StatusBar class and manages the display
 * of the end boss's health status using predefined images.
 *
 * @extends StatusBar
 */
class EndbossBar extends StatusBar {
  /**
   * An array of image paths representing the health states of the end boss.
   * Each image corresponds to a percentage of health remaining.
   *
   * @type {string[]}
   * @constant
   */
  IMAGES_ENDBOSSHEALTHBAR = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * The currently used images for the end boss health bar.
   * This is set to IMAGES_ENDBOSSHEALTHBAR.
   *
   * @type {string[]}
   */
  IMAGES = this.IMAGES_ENDBOSSHEALTHBAR;

  /**
   * Creates an instance of EndbossBar.
   * Initializes the health bar by loading the necessary images,
   * setting the initial position, and setting the health percentage to 100.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSSHEALTHBAR);
    this.x = 410;
    this.y = 0;
    this.setPercentage(100);
  }
}
