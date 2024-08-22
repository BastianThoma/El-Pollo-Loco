const level1 = new Level(
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
        new Coin(400, 200),
        new Coin(350, 150),
        new Coin(300, 120),
        new Coin(450, 190),
    ],

    [
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 450, 320),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 675, 350),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1080, 340),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1180, 330),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1380, 330),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1520, 330),

    ]


);