import Ball from './Ball';
import Bricks from './Bricks';
import Paddle from './Paddle';
import GameLabel from './GameLabel';

// *********************************************************
// Canvas Setup
// *********************************************************
const canvas = <HTMLCanvasElement> document.getElementById('myCanvas');
const ctx: any = canvas.getContext('2d');
const x = canvas.width / 2;
const y = canvas.height - 30;
const listener = document.addEventListener

class Game {
    canvas: any;
    ctx: any;
    x: number;
    y: number;
    paddleWidth: number;
    paddleX: number;
    ball: Ball;
    paddle: Paddle;
    bricks: Bricks;
    scoreLabel: GameLabel;
    livesLabel: GameLabel;
    rightPressed: Boolean;
    leftPressed: Boolean;
    color: string;

    constructor(canvas: any, ctx: any) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = '#301934'
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

        // instantiation
        this.ball = new Ball(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
        this.paddle = new Paddle(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height, this.paddle.color);
        this.bricks = new Bricks(this.bricks.rows, this.bricks.columns, this.color);
        this.scoreLabel = new GameLabel('Score: ', 8, 20, this.color);
        this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20, this.color);

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

    keyDownHandler({ key }: any) {
        if (key === 'Right' || key === 'ArrowRight') {
            this.rightPressed = true;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            this.leftPressed = true;
        }
    }

    keyUpHandler({ key }: any) {
        if (key === 'Right' || key === 'ArrowRight') {
            this.rightPressed = false;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler({ clientX }: any) {
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
                            this.restart();
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
                    this.restart();
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
