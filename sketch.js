var pipes = [];
let gameOver = false;
let gameStarted = false;
let score = 0;
let highScore = 0;
let gap = 200;
let Canvasbackground = { 1: 135, 2: 206, 3: 235 };
let pipforce = 4;
let pipeW = 40;
let jumpforce = -10;
let jumpSound;
let hitSound;
let point

function preload() {
  jumpSound = loadSound("sfx_wing.wav");  
  hitSound = loadSound("sfx_hit.wav");    
  point = loadSound("sfx_point.wav");
}

function setup() {
  highScore = localStorage.getItem("highScore");
  frameRate(60);
  if (highScore > 0) {
    document.getElementById("highScore").textContent = highScore;
  }
  createCanvas(innerWidth, innerHeight);
  bird = new Bird();
  pipes.push(new Pipe());

  for (let i = 0; i < 20; i++) {
    clouds.push(new Cloud());
  }
}

function draw() {
  background(Canvasbackground[1], Canvasbackground[2], Canvasbackground[3]);

  for (let cloud of clouds) {
    cloud.update();
    cloud.show();
  }

  if (!gameStarted) {
    textAlign(CENTER);
    fill(255);
    textSize(25);
    textFont("Courier New");
    text("Presiona para comenzar", width / 2, height / 2);

    return;
  }

  if (gameOver) {
    document.getElementById("score").textContent = 0;
    textAlign(CENTER);
    fill(255);
    textSize(25);
    textFont("Courier New");
    stroke(0);
    text("GAME OVER\nPresiona para reiniciar", width / 2, height / 2);

    score = 0;
    return;
  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0 && !gameOver && gameStarted) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      hitSound.play();
      bird.death();
    }

    if (pipes[i].passed(bird)) {
      score++;
      point.play();
      if (score > highScore) highScore = score;
      updateScore();
      if (score % 10 == 0 && gap > 80) {
        gap -= 10;
      }

      if (score % 2 == 0) {
        Canvasbackground[1] -= 3;
        Canvasbackground[2] -= 3;
        Canvasbackground[3] -= 3;
      }

      if (score === 50) {
        pipeW = 30;
      }

      if (score === 100) {
        pipforce = 5;
        jumpforce = -9;
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
}

function mousePressed() {
  handleInput();
}

function keyPressed() {
  if (keyCode === 32) {
    handleInput();
  }
  if (keyCode === 38) {
    handleInput();
  }
}

function touchStarted() {
  handleInput();
}

function handleInput() {
  if (!gameStarted) {
    gameStarted = true;
    resetStats();
  } else if (gameOver) {
    gameStarted = true;
    gameOver = false;
    pipes = [];
    bird = new Bird();
    resetStats();
    loop();
  } else {
    bird.jump();
    jumpSound.play();
  }
}

function updateScore() {
  document.getElementById("score").textContent = score;
  document.getElementById("highScore").textContent = highScore;
  localStorage.setItem("highScore", highScore);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  resetGame();
}

function resetGame() {
  pipes = [];
  bird = new Bird();
  gameStarted = false;
  gameOver = false;
  score = 0;
  updateScore();
}

function resetStats() {
  score = 0;
  pipforce = 4;
  jumpforce = -10;
  gap = 200;
  Canvasbackground[1] = 135;
  Canvasbackground[2] = 206;
  Canvasbackground[3] = 235;
}

function showStats() {
  console.log("Score: ", score);
  console.log("High Score: ", highScore);
  console.log("Pipforce: ", pipforce);
  console.log("Jumpforce: ", jumpforce);
  console.log("Gap: ", gap);
}
