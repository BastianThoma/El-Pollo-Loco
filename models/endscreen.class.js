/**
 * Represents an end screen in the game, displaying the result of a game session.
 * Inherits from the `DrawableObject` class and provides functionality to load images
 * and play sound effects based on the game outcome.
 *
 * @extends {DrawableObject}
 */
class Endscreen extends DrawableObject {
  /**
   * @type {{ win_sound: HTMLAudioElement, lose_sound: HTMLAudioElement }}
   * @property {HTMLAudioElement} win_sound - The audio element for the win sound effect.
   * @property {HTMLAudioElement} lose_sound - The audio element for the lose sound effect.
   */
  audio = {
    win_sound: new Audio("audio/win sound.mp3"),
    lose_sound: new Audio("audio/lose sound.mp3"),
  };

  /**
   * Creates an instance of the Endscreen class.
   *
   * @param {string} path - The path to the image to be displayed on the end screen.
   * @param {number} x - The x-coordinate for positioning the end screen.
   * @param {number} y - The y-coordinate for positioning the end screen.
   */
  constructor(path, x, y) {
    super().loadImage(path);
    this.AudioToArray(this.audio);
    this.x = x;
    this.y = y;
    this.width = 720;
    this.height = 480;
  }
}
