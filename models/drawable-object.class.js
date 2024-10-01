/**
 * Represents a drawable object in a 2D context.
 * This class serves as a base for objects that can be rendered on a canvas.
 *
 * @class DrawableObject
 */
class DrawableObject {
  /**
   * The image associated with the drawable object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * The index of the current image in the image cache.
   * @type {number}
   * @default 0
   */
  currentImage = 0;

  /**
   * The x-coordinate of the drawable object.
   * @type {number}
   * @default 120
   */
  x = 120;

  /**
   * The y-coordinate of the drawable object.
   * @type {number}
   * @default 290
   */
  y = 290;

  /**
   * The height of the drawable object.
   * @type {number}
   * @default 150
   */
  height = 150;

  /**
   * The width of the drawable object.
   * @type {number}
   * @default 120
   */
  width = 120;

  /**
   * Cache for loaded images.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = [];

  /**
   * Loads an image from a given path and sets it to the img property.
   *
   * @param {string} path - The path to the image file.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image of the drawable object onto the specified canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the drawable object if it is an instance of specific subclasses.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   * @returns {void}
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Bottle ||
      this instanceof Coin ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Chick
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "green";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Loads an array of images and stores them in the imageCache.
   *
   * @param {string[]} arr - An array of image paths to load.
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = "transform: scaleX(-1)";
      this.imageCache[path] = img;
    });
  }

  /**
   * Converts an array of sound effects and adds them to the global soundEffects array.
   *
   * @param {Object<string, string>} arr - An object where keys are sound identifiers and values are sound paths.
   * @returns {void}
   */
  AudioToArray(arr) {
    Object.values(arr).forEach((sound) => {
      soundEffects.push(sound);
    });
  }
}
