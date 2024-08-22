class Bottle extends MovableObject {


    height = 120;
    width = 120;

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    // audio = {
    //     item_pickup_sound: new Audio('audio/item-pickup.mp3'),
    // }

    randomBottleImg = this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)];

    constructor(x, y) {
        super().loadImage(this.randomBottleImg);
        // this.AudioToArray(this.audio);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        let increasing = true;
        let interval = setInterval(() => {
            if (increasing) {
                this.y += 3;
                if (this.y >= 363) {
                    increasing = false;
                }
            } else {
                this.y -= 3;
                if (this.y >= 360) {
                    increasing = true;
                }
            }
        }, 300);
        intervalIds.push(interval);
    }

}