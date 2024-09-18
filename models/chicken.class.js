class Chicken extends MovableObject {
  y = 350;
  height = 80;
  width = 70;
  energy = 35;
  currentImage = 0;

  offset = {
    top: 10,
    left: 5,
    right: 10,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  audio = {
    jumpedOn_sound: new Audio('audio/jump on enemy.mp3'),
  };

  constructor() {
    super().loadImage("");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.AudioToArray(this.audio);
    this.x = 500 + Math.random() * 800;

    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    let interval = setInterval(() => {
      this.moveLeft();
      this.otherDirection = false;
      this.update();
    }, 1000 / 60);

    this.walkInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 400);
    intervalIds.push(interval, this.walkInterval);
  }

  die() {
    clearInterval(this.walkInterval);
    this.loadImage(this.IMAGES_DEAD);
    this.speed = 0;
  }

  update() {
    if (this.isDead() || this.isJumpedOn == true) {
      this.die();
      setTimeout(() => {
        let index = world.level.enemies.indexOf(this);
        if (index !== -1) {
          world.level.enemies.splice(index, 1);
        }
      }, 400);
    }
  }
}
