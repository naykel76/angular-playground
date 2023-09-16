import { CONFIG } from "../data";
import { IConfig, IPiece, IPosition, ITetromino, Matrix } from "../defs";

export class Piece implements IPiece {

    public x: number;
    public y: number = 0;
    public shape: Matrix;
    public color: string;

    constructor(
        private ctx: CanvasRenderingContext2D,
        public tetromino: ITetromino,
        private config: IConfig = CONFIG,
        public type: string = 'current'
    ) {
        this.shape = tetromino.shape;
        this.color = tetromino.color;
        this.x = this.centerXPosition(this.shape);
        this.render();
    }

    move(shape: Matrix, position: IPosition): void {
        this.x = position.x;
        this.y = position.y;
        this.shape = shape;
        this.clear();
        this.render();
    }

    private clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    private render() {
        this.ctx!.fillStyle = this.color;
        this.shape.forEach((row, rowIndex) => {
            // tetVal represents the tetromino value. I=1, J=2, ... Z=7
            row.forEach((tetVal, columnIndex) => {
                if (tetVal > 0) {
                    const x = this.x + columnIndex;
                    const y = this.y + rowIndex;
                    this.ctx!.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    private centerXPosition(shape: Matrix): number {
        const columns = this.type === 'next'
            ? this.config.nextGridSize
            : this.config.columns;
        return Math.floor((columns! - this.calculateMaxWidth(shape)) / 2);
    }

    private calculateMaxWidth(shape: Matrix): number {
        let maxWidth = 0;

        for (let row = 0; row < shape.length; row++) {
            let rowWidth = 0;

            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] > 0) {
                    rowWidth = col + 1; // Increment the row width when a non-zero value is encountered
                }
            }

            if (rowWidth > maxWidth) {
                maxWidth = rowWidth; // Update the maximum width if the current row width is greater
            }
        }

        return maxWidth;
    }

}
