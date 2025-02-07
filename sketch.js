var pipes = [];
let gameOver = false;
let gameStarted = false;
let score = 0;
let highScore = 0;

function setup() {
  highScore = localStorage.getItem("highScore");
  if (highScore > 0) {
    document.getElementById("highScore").textContent = highScore;
  }
  createCanvas(innerWidth, innerHeight);
  bird = new Bird();
  pipes.push(new Pipe());

  for (let i = 0; i < 25; i++) {
    clouds.push(new Cloud());
  }
}



function draw() {
  background(135, 206, 235);

  for (let cloud of clouds) {
    cloud.update();
    cloud.show();
  }

  if (!gameStarted) {
    textAlign(CENTER);
    fill(255);
    textSize(25);
    text("Presiona para comenzar", width / 2, height / 2);

    return;
  }

  if (gameOver) {
    document.getElementById("score").textContent = 0;
    textAlign(CENTER);
    fill(255);
    textSize(25);
    text("GAME OVER\nPresiona para reiniciar", width / 2, height / 2);
    noLoop();
    score = 0;
    return;
  }

  bird.update();
  bird.show();

  if (frameCount % 80 == 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      bird.death();
    }

    if (pipes[i].passed(bird)) {
      score++;
      if (score > highScore) highScore = score;
      updateScore();

      console.log("Score: " + score + " High Score: " + highScore);
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
}

function mousePressed() {
  handleInput();
}

function touchStarted() {
  handleInput();
}

function handleInput() {
  if (!gameStarted) {
    gameStarted = true;
  } else if (!isLooping()) {
    gameStarted = true;
    gameOver = false;
    pipes = [];
    bird = new Bird();
    loop();
  } else {
    bird.jump();
  }
}

function updateScore() {
  document.getElementById("score").textContent = score;
  document.getElementById("highScore").textContent = highScore;
  localStorage.setItem("highScore", highScore);
}
