import Sprite from './Sprite';

class Ball extends Sprite {
  constructor(x = 0, y = 0, width = 100, radius = 10, color = '#f00') {
    super(x, y, width, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  moveTo() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
