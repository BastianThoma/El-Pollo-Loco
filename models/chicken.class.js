class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 70;
    energy = 35;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    currentImage = 0;
    

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 400;

        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 400);
    }


}