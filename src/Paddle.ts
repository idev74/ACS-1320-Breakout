import Sprite from "./Sprite";

class Paddle extends Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(x: number = 0, y: number = 0, width: number = 75, height: number = 10, color: string = 'white') {
        super(x, y, width, height, color)
    }

    moveTo(x: number): any {
        this.x = x;
    }
    
    moveBy(dx: number) {
        this.x += dx;
    }
}

export default Paddle;
