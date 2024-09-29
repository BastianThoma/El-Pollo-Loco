class Chick extends MovableObject {
    y = 370;
    height = 60;
    width = 50;
    energy = 35;
    currentImage = 0;
    hasPlayedDeathSound = false;
    isJumpedOn = false;
  
    offset = {
      top: 10,
      left: 5,
      right: 10,
      bottom: 20,
    };
  
    IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  
    audio = {
      jumpedOn_sound: new Audio('audio/jump on enemy.mp3'),
      chickDead_sound: new Audio('audio/chick dead.mp3'),
    };
  
    constructor() {
      super().loadImage("");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.AudioToArray(this.audio);
      this.x = 600 + Math.random() * 2800;
  
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
        
        if (!this.hasPlayedDeathSound) {
          this.playAudio('chickDead_sound', 0.2);
          this.hasPlayedDeathSound = true;
        }
    
        this.speed = 0;
      }
  
    update() {
      if (this.isDead() || this.isJumpedOn == true) {
        this.die();
      }
    }
  }
  