let level1;

/**
 * Initializes the first level of the game by creating various game objects.
 * @function
 * @returns {void}
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
    ],
    [new Endboss()],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],
    [
      new BackgroundObject("../img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        -719
      ),

      new BackgroundObject("../img/5_background/layers/air.png", 0),
      new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("../img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        719
      ),

      new BackgroundObject("../img/5_background/layers/air.png", 1438),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/1.png",
        1438
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        1438
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/1.png",
        1438
      ),

      new BackgroundObject("../img/5_background/layers/air.png", 2157),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/2.png",
        2157
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/2.png",
        2157
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/2.png",
        2157
      ),

      new BackgroundObject("../img/5_background/layers/air.png", 2876),
      new BackgroundObject(
        "../img/5_background/layers/3_third_layer/1.png",
        2876
      ),
      new BackgroundObject(
        "../img/5_background/layers/2_second_layer/1.png",
        2876
      ),
      new BackgroundObject(
        "../img/5_background/layers/1_first_layer/1.png",
        2876
      ),
    ],
    [
      new Coin(800, 150),
      new Coin(1450, 300),
      new Coin(1700, 120),
      new Coin(2150, 150),
      new Coin(2400, 120),
    ],
    [
      new Bottle("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 555, 320),
      new Bottle("../img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 975, 350),
      new Bottle("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1300, 340),
      new Bottle("../img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 1850, 330),
      new Bottle("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 2250, 330),
    ]
  );
}
