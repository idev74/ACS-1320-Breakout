/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// let score = 0;
let lives = 3;

// const bricks = [];

function replay() {
  document.location.reload();
}

function keyDownHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = true;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = false;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler({ clientX }) {
  const relativeX = clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

const listener = document.addEventListener;

listener('keydown', keyDownHandler, false);
listener('keyup', keyUpHandler, false);
listener('mousemove', mouseMoveHandler, false);

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        replay();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
