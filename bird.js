class Bird {
  constructor() {
    this.x = width / 3;
    this.y = height / 2;
    this.images = [birdicon1, birdicon2];
    this.imgIndex = 0;
    this.frameCount = 0;
    this.gravity = 0.6;
    this.velocity = 0;
    this.radius = 10;
  }

  show() {
    push();
    translate(this.x, this.y);

    let angle = constrain(this.velocity * 0.05, -PI / 6, PI / 4);

    rotate(angle);

    image(this.images[this.imgIndex], -25, -25, 50, 50);

    pop();
  }

  jump() {
    this.velocity = jumpforce;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 15) {
      this.y = height - 15;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.imgIndex = (this.imgIndex + 1) % this.images.length;
    }
  }

  death() {
    gameOver = true;
    updateScore();
    score = 0;
  }
}
