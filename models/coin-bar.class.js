class CoinBar extends StatusBar {

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];
    IMAGES = this.IMAGES_COINBAR;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 25;
        this.y = 35;
        this.setPercentage(0);
    }

    updateCoinBar(collectedCoins, totalCoins) {
        let percentage = Math.round((collectedCoins / totalCoins) * 100);
        console.log(`Collected Coins: ${collectedCoins}, Total Coins: ${totalCoins}, Percentage: ${percentage}`);
        this.setPercentage(percentage);
    }

}