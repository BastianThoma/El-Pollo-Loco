class Bottle extends MovableObject {
  width = 70;
  height = 110;
  offset = {
    top: 25,
    left: 30,
    right: 50,
    bottom: 30,
  };

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
