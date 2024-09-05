class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isOnGround() {
        return this.y > 180;
    }

    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.bottom;
    }

    hit(dmg) {
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    fallDown() {
        setTimeout(() => {
            setInterval(() => {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }, 1000 / 25);
        }, 1000);
    }

    // playAudio(audio, volume) {
    //     this.audio[audio].volume = volume;
    //     this.audio[audio].play();
    // }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        // Check if the current image is the last one
        if (this.currentImage === images.length - 1) {
            // If it is the last image, stop the animation
            // You can add any additional logic here, such as pausing or hiding the animation
            this.currentImage = 0; // Reset currentImage to 0 to restart the animation
            return;
        }
        this.currentImage++; // Increment only if it's not the last image
    }

    playAudio(audio, volume) {
        this.audio[audio].volume = volume;
        this.audio[audio].play();
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    // doNotMove() {
    //     this.x += 0;
    // }

    jump() {
        this.speedY = 30;
    }

}