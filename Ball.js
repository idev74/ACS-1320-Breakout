import Sprite from "./Sprite";

class Ball extends Sprite {
    constructor(x = 0, y = 0, radius = 10, color = 'white') {
        super(x, y, radius * 2, radius * 2, color)
        this.dx = 2;
        this.dy = -1;
        this.color = color;
        this.radius = radius;
        this.PI2 = Math.PI * 2;
    }

    move() {
        this.moveBy(this.dx, this.dy);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, PI2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export default Ball;