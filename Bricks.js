class Bricks {
  constructor() {
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.bricks = [];
    this.score = 0;

    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const x = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        const y = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
        this.bricks[c][r] = { x, y, status: 1 }; // new brick
      }
    }
  }

  draw(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  replay() {
    document.location.reload();
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = bricks[c][r];
        const { x: brickX, y: brickY, status } = b;
        if (status === 1) {
          if (
            x > brickX
            && x < x + brickWidth
            && y > brickY
            && y < brickY + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            this.score += 1;
            if (this.score === this.brickRowCount * this.brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              replay();
            }
          }
        }
      }
    }
  }
}

export default Bricks;
