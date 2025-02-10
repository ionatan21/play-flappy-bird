class Bird {
  constructor() {
    this.x = width / 3;
    this.y = height / 2;
    this.img = loadImage("birdimg.webp");
    this.gravity = 0.6;
    this.velocity = 0;
    this.radius = 10;
  }

  show() {
    push(); 
    translate(this.x, this.y); 
  
    
    let angle = constrain(this.velocity * 0.05, -PI / 6, PI / 4); 
  
    rotate(angle);
  

    image(this.img, -25, -25, 50, 50);
  
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
  }

  death() {
    gameOver = true;
    updateScore();
    score = 0;
  }
}
