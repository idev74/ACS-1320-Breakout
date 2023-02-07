import Ball from './Ball.js';
import Bricks from './Bricks.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';

// *********************************************************
// Canvas Setup
// *********************************************************
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const x = canvas.width / 2;
const y = canvas.height - 30;
const listener = document.addEventListener

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = '#301934'
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

        // instantiation
        this.ball = new Ball(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
        this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, objectColor);
        this.bricks = new Bricks(this.bricks.rows, this.bricks.columns);
        this.scoreLabel = new GameLabel('Score: ', 8, 20, this.color);
        this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20);

        this.rightPressed = false;
        this.leftPressed = false;

        this.restart();
        this.draw();
        this.resetItems();
    }

    // methods
    eventListeners() {
        listener('keydown', this.keyDownHandler.bind(this), false);
        listener('keyup', this.keyUpHandler.bind(this), false);
        listener('mousemove', this.mouseMoveHandler.bind(this), false);
    }

    restart() {
        document.location.reload()
    }

    paddleMovement() {
        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.moveTo(7);
        }
        else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.moveTo(-7);
        }
    }

    keyDownHandler({ key }) {
        if (key === 'Right' || key === 'ArrowRight') {
            this.rightPressed = true;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            this.leftPressed = true;
        }
    }

    keyUpHandler({ key }) {
        if (key === 'Right' || key === 'ArrowRight') {
            this.rightPressed = false;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler({ clientX }) {
        const relativeX = clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
            this.paddle.moveBy(relativeX - this.paddle.width / 2);
        }
    }

    resetItems() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 30;
        this.ball.dx = 2;
        this.ball.dy = -2;
        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
    }

    collisionDetection() {
        for (let c = 0; c < this.bricks.columns; c += 1) {
            for (let r = 0; r < this.bricks.rows; r += 1) {
                const b = this.bricks.bricks[c][r];
                // const { x: brickX, y: brickY } = b;
                if (b.status === 1) {
                    if (
                        this.ball.x > b.x
                        && this.ball.x < this.ball.x + this.bricks.brickWidth
                        && this.ball.y > b.y
                        && this.ball.y < b.y + this.bricks.brickHeight
                    ) {
                        this.ball.dy = -this.ball.dy;
                        b.status = 0;
                        this.scoreLabel.value += 1;
                        if (this.scoreLabel.value === this.bricks.rows * this.bricks.columns) {
                            alert('YOU WIN, CONGRATULATIONS!');
                            restart();
                        }
                    }
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bricks.render(this.ctx)
        this.ball.render(this.ctx)
        this.ball.move();
        this.paddle.render(this.ctx)
        this.scoreLabel.render(this.ctx)
        this.livesLabel.render(this.ctx)
        this.collisionDetection();

        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        }
        else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            } else {
                this.livesLabel.value -= 1;
                if (!this.livesLabel.value) {
                    alert('GAME OVER');
                    restart();
                } else {
                    this.resetItems();
                }

            }
        }
        this.paddleMovement();
        requestAnimationFrame(this.draw.bind(this));
    }
}

export default Game;
