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
    push(); // Guarda la configuración actual del lienzo
    translate(this.x, this.y); // Mueve el punto de origen a la posición del pájaro
  
    // Calcula el ángulo de inclinación basado en la velocidad
    let angle = constrain(this.velocity * 0.05, -PI / 6, PI / 4); // Limitamos la rotación
  
    rotate(angle); // Aplica la rotación
  
    // Dibujar la imagen centrada en (0, 0) en lugar de (this.x, this.y)
    image(this.img, -25, -25, 50, 50);
  
    pop(); // Restaura la configuración del lienzo
  }
  

  jump() {
    this.velocity = -10;
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
