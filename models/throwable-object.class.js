class ThrowableObject extends MovableObject {
    offset = {
        top: 15,
        left: 10,
        right: 20,
        bottom: 15
    };

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    shattering_sound = new Audio('audio/shattering bottle.mp3');

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 65;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.startMovement();
        this.startRotation();
    }

    startMovement() {
        this.throwInterval = setInterval(() => {
            this.move();
            this.checkBottleHit();
        }, 25);
    }

    startRotation() {
        this.rotationInterval = setInterval(() => this.playAnimation(this.IMAGES_ROTATING), 80);
    }

    startSplashing() {
        let splashIndex = 0;
        const splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASHING);
    
            splashIndex++;
            // Überprüfen, ob das letzte Bild erreicht wurde
            if (splashIndex >= this.IMAGES_SPLASHING.length) {
                clearInterval(splashInterval); // Stoppe das Intervall nach dem letzten Bild
                this.remove(); // Entferne die Flasche nach dem letzten Bild
            }
        }, 100); // Zeit zwischen den Bildern
    }

    move() {
        if (this.direction === 'left') {
            this.x -= 10; // Bewege nach links
        } else {
            this.x += 10; // Bewege nach rechts
        }
    }

    checkBottleHit() {
        world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                this.handleCollision();
                enemy.hit(35);
            }
        });
    }

    handleCollision() {
        clearInterval(this.throwInterval);
        clearInterval(this.rotationInterval);
        this.speedY = 0;
        this.acceleration = 0;
        this.playSplashAnimation();
    }

    playSplashAnimation() {
        this.startSplashing();
        this.shattering_sound.volume = 0.2;
        this.shattering_sound.play();
    }

    remove() {
        this.isRemoved = true; // Setze ein Flag, um die Flasche als entfernt zu kennzeichnen
    }
}