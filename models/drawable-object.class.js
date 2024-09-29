class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 290;
    height = 150;
    width = 120;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Chick) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    AudioToArray(arr) {
        Object.values(arr).forEach(sound => {
            soundEffects.push(sound);
        });
    }
}