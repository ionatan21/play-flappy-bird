let clouds = [];

class Cloud {
  constructor() {
    this.x = random(0, width + 100);
    this.y = random(50, 300);
    this.speed = random(1, 2);
    this.image = loadImage("cloudimg.png");
  }

  show() {
    image(this.image, this.x, this.y, 50, 50);
  }

  update() {
    this.x -= this.speed;
    if (this.x < -50) {
      this.x = width + 50;
      this.y = random(50, 300);
    }
  }
}