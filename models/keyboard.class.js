/**
 * Represents the state of a keyboard for game controls.
 *
 * The `Keyboard` class maintains boolean properties that indicate
 * whether specific keys are pressed or in an idle state.
 *
 * @class
 */
class Keyboard {
  /**
   * Indicates whether the LEFT key is pressed.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Indicates whether the RIGHT key is pressed.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Indicates whether the UP key is pressed.
   * @type {boolean}
   */
  UP = false;

  /**
   * Indicates whether the DOWN key is pressed.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Indicates whether the SPACE key is pressed.
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Indicates whether the D key is pressed.
   * @type {boolean}
   */
  D = false;

  /**
   * Indicates whether the keyboard is in an idle state.
   * @type {boolean}
   */
  idle = false;

  /**
   * Indicates whether the keyboard is in a long idle state.
   * @type {boolean}
   */
  longIdle = false;
}
