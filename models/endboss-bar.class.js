class EndbossBar extends StatusBar {
  IMAGES_ENDBOSSHEALTHBAR = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];
  IMAGES = this.IMAGES_ENDBOSSHEALTHBAR;

  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSSHEALTHBAR);
    this.x = 500;
    this.y = 0;
    this.setPercentage(100);
  }
}
