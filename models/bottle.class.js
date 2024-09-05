class Bottle extends MovableObject {

    width = 70;
    height = 110;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;

    }

}