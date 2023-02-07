const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// *********************************************************
// Variables
// *********************************************************

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const PI2 = Math.PI * 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let score = 0;
let lives = 3;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

class Ball {
    constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'white') {

        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, PI2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.status = 1;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Bricks {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.bricks = [];
        this.init()
    }

    init() {
        for (let c = 0; c < this.columns; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
                // ctx.beginPath();
                // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // ctx.fillStyle = "#0095DD";
                // ctx.fill();
                // ctx.closePath();
            }
        }
    }

    render(ctx) {
        for (let c = 0; c < this.columns; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    brick.render(ctx)
                }
            }
        }
    }
}

class Paddle {
    constructor(x, y, width, height, color = 'white') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color - color;
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class GameLabel {
    constructor(text, x, y, color, font = '16px Arial') {
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
        this.font = font
        this.value = 0;
    }

    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`${this.text} ${this.value}`, this.x, this.y)
    }
}

class Game {
    constructor() {
        this.ball = new Ball(0, 0, 2, -2, ballRadius, objectColor);
        this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, objectColor);
        this.bricks = new Bricks(brickColumnCount, brickRowCount);
        this.scoreLabel = new GameLabel('Score: ', 8, 20);
        this.livesLabel = new GameLabel('Lives: ', -65, 20);
        this.rightPressed = false;
        this.leftPressed = false;

        this.restart();
        // setup function instead of restart?
    }

    restart() {
        document.location.reload()
    }

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
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
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
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
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();