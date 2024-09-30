class HealthBar extends StatusBar {
  IMAGES_HEALTHBAR = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  
  IMAGES = this.IMAGES_HEALTHBAR;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR);
    this.x = 25;
    this.y = 70;
    this.setPercentage(100);
  }
}
