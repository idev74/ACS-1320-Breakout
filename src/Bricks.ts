import Brick from "./Brick";

class Bricks extends Brick {
   columns: number;
   rows: number;
   bricks: any[];
   brickWidth: number;
   brickHeight: number;
   brickPadding: number;
   brickOffsetLeft: number;
   brickOffsetTop: number;
   color: string;

    constructor(columns: number = 5, rows: number = 4, color: string) {
        super(color: string)
        this.columns = columns;
        this.rows = rows;
        this.bricks = [];
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetLeft = 30;
        this.brickOffsetTop = 30;
        this.color = color;
        
        this.init();
    }

    init(): any {
        for (let c = 0; c < this.columns; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, this.brickWidth, this.brickHeight, this.color);
            }
        }
    }

    render(ctx: any) {
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

export default Bricks;
