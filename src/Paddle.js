import Sprite from './Sprite';

class Paddle extends Sprite {
  constructor(x = 0, y = 0, width = 100, height = 10, color = '#f00') {
    super(x, y, width, height, color);
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
