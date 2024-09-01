class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;


    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 5000;
        this.speed = 0.05 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }


}