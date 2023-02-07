import Sprite from "./Sprite";

class GameLabel extends Sprite {
    value: number;
    font: string;
    text: string;
    x: number;
    y: number;
    constructor(text: string, x: number, y: number, color: string, font: string = '16px Arial') {
        super(x, y, 0, 0, color)
        this.text = text;
        this.font = font
        this.value = 0;
    }

    render(ctx: any) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`${this.text} ${this.value}`, this.x, this.y)
    }
}

export default GameLabel;
