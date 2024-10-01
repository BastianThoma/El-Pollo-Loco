/**
 * Represents a game level containing various elements such as enemies, endboss, clouds, background objects, coins, and bottles.
 */
class Level {
  /**
   * The array of enemies present in the level.
   * @type {Array}
   */
  enemies;

  /**
   * The end boss of the level.
   * @type {Object}
   */
  endboss;

  /**
   * The array of clouds present in the level.
   * @type {Array}
   */
  clouds;

  /**
   * The array of background objects present in the level.
   * @type {Array}
   */
  backgroundObjects;

  /**
   * The array of coins present in the level.
   * @type {Array}
   */
  coins;

  /**
   * The array of bottles present in the level.
   * @type {Array}
   */
  bottles;

  /**
   * The x-coordinate representing the end of the level.
   * @type {number}
   * @default 2950
   */
  level_end_x = 2950;

  /**
   * Creates an instance of the Level class.
   * @param {Array} enemies - The enemies in the level.
   * @param {Object} endboss - The end boss of the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} coins - The coins in the level.
   * @param {Array} bottles - The bottles in the level.
   */
  constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
