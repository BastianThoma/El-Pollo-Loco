class Bottle extends MovableObject {

    width = 70;
    height = 110;
    offset = {
        top: 25,
        left: 25,
        right: 40,
        bottom: 40
    };

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;

    }


}