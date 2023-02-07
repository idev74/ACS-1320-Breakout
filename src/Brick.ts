import Sprite from "./Sprite";

class Brick extends Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    status: number;
    
    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(x, y, width, height, color)
        this.status = 1;
    }

    render(ctx: any) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export default Brick;