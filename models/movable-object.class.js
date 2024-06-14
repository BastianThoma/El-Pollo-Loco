class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 120;
    imageCache = [];



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    moveRight() {
        console.log('Moving Right')
    }

    moveLeft() {

    }

    }