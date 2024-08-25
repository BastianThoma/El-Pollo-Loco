class BottleBar extends StatusBar {

    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    IMAGES = this.IMAGES_BOTTLEBAR;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 25;
        this.y = 0;
        this.setPercentage(0);
    }

    updateBottleBar(throwableObjects, totalBottles) {
        let percentage = Math.round((throwableObjects / totalBottles) * 100);
        console.log(`Collected Bottles: ${throwableObjects}, Total Bottles: ${totalBottles}, Percentage: ${percentage}`);
        this.setPercentage(percentage);
    }
}