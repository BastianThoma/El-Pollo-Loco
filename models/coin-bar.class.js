/**
 * Represents a coin status bar in the game UI.
 *
 * The CoinBar class extends the StatusBar class and provides functionality to display
 * the current coin status as a percentage. It initializes with a set of predefined images
 * representing different coin levels and updates the bar based on collected and total coins.
 *
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
  /**
   * Array of image paths representing the different states of the coin bar.
   * Each image corresponds to a specific percentage of collected coins.
   *
   * @type {string[]}
   * @default
   */
  IMAGES_COINBAR = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Array of images used for the coin bar.
   *
   * @type {string[]}
   */
  IMAGES = this.IMAGES_COINBAR;

  /**
   * Creates an instance of the CoinBar class.
   *
   * Initializes the coin bar's position and loads the necessary images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COINBAR);
    this.x = 25;
    this.y = 35;
    this.setPercentage(0);
  }

  /**
   * Updates the coin bar based on the collected and total coins.
   *
   * Calculates the percentage of collected coins relative to the total and
   * updates the coin bar's visual representation accordingly.
   *
   * @param {number} collectedCoins - The number of coins collected by the player.
   * @param {number} totalCoins - The total number of coins available in the game.
   */
  updateCoinBar(collectedCoins, totalCoins) {
    let percentage = Math.round((collectedCoins / totalCoins) * 100);
    this.setPercentage(percentage);
  }
}
