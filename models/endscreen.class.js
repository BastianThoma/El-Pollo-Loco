class Endscreen extends DrawableObject {
    audio = {
        win_sound: new Audio('audio/win sound.mp3'),
        lose_sound: new Audio('audio/lose sound.mp3')
    };

    constructor(path, x, y) {
        super().loadImage(path);
        this.AudioToArray(this.audio);
        this.x = x;
        this.y = y;
        this.width = 720;
        this.height = 480;
    }
}