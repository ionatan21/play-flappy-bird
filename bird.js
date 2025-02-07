class Bird {
  constructor() {
    this.x = width / 3;
    this.y = height / 2;
    this.img = loadImage("birdimg.webp");
    this.gravity = 0.6;
    this.velocity = 0;
  }

  show() {
    image(this.img, this.x, this.y, 50, 50); // Dibuja la imagen en lugar del círculo
  }

  jump() {
    this.velocity = -10;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 30) {
      this.y = height - 30;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  death() {
    gameOver = true;
    updateScore();
    score = 0;
  }
}
