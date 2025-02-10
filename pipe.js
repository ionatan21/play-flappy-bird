class Pipe {
  constructor() {
    this.gap = gap; 
    this.top = random(height - this.gap); 
    this.bottom = height - (this.top + this.gap); 
    this.x = width;
    this.w = pipeW;
    this.passedFlag = false;
    this.color = color(0, 200, 0);
  }

  show() {
    fill(this.color);
    stroke(0); 
    strokeWeight(3);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= pipforce;
  }

  offscreen() {
    return this.x < -this.w;
  }

  passed(bird) {
    if (!this.passedFlag && bird.x > this.x + this.w) { 
      this.passedFlag = true;
      return true;
    }
    return false;
  }

  hits(bird) {
    let birdLeft = bird.x - bird.radius;
    let birdRight = bird.x + bird.radius;
    let birdTop = bird.y - bird.radius;
    let birdBottom = bird.y + bird.radius;
  
    let pipeLeft = this.x;
    let pipeRight = this.x + this.w;
  
    let xOverlap = birdRight > pipeLeft && birdLeft < pipeRight;
  
    let yOverlapTop = birdTop < this.top;
    let yOverlapBottom = birdBottom > height - this.bottom;
  
    return xOverlap && (yOverlapTop || yOverlapBottom);
  }
  
}
