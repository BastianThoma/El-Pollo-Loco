class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 120;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right')
    }

    moveLeft() {

    }

    }