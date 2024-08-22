class Bottle extends MovableObject {

    width = 70;
    height = 110;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;

    }


}