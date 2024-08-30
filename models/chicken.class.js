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
        super().loadImage('');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 800;

        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
            this.update(); // Aufruf der update()-Methode
        }, 1000 / 60);
    
        this.walkInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 400);
    }

    die() {
        clearInterval(this.walkInterval);
        this.loadImage(this.IMAGES_DEAD);
        this.speed = 0;
    }

    update() {
        if (this.isDead()) {
            this.die();
            setTimeout(() => {
                let index = world.level.enemies.indexOf(this);
                if (index !== -1) {
                  // Entferne den getroffenen Chicken aus dem Array
                  world.level.enemies.splice(index, 1);
                }
              }, 400);
        }
    }


}