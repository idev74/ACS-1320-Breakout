import Brick from "./Brick";

class Bricks {
    constructor(columns = 5, rows = 4) {
        this.columns = columns;
        this.rows = rows;
        this.bricks = [];
        this.init()
    }

    init() {
        for (let c = 0; c < this.columns; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
            }
        }
    }

    render(ctx) {
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
