let level1;
function initLevel() {
    // Creates a new Level instance with specified entities.
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('../img/5_background/layers/air.png', -719),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('../img/5_background/layers/air.png', 0),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('../img/5_background/layers/air.png', 719),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('../img/5_background/layers/air.png', 1438),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 1438),
        ],
        [
            new Coin(400, 300),
            new Coin(800, 150),
            new Coin(1200, 200),
            new Coin(2000, 150),
            new Coin(2100, 300)
        ],

        [
            new Bottle(300, 350),
            new Bottle(700, 350),
            new Bottle(800, 350),
            new Bottle(1400, 350),
            new Bottle(1600, 350),
            new Bottle(2000, 350),
            new Bottle(2200, 350),
            new Bottle(2800, 350),
        ]
    );
}