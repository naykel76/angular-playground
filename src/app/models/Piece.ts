import { CONFIG } from "../data";
import { IConfig, IPiece, IPosition, ITetromino, Matrix } from "../defs";

export class Piece implements IPiece {

    public x: number;
    public y: number = 0;
    public matrix: Matrix;
    public color: string;

    constructor(
        private ctx: CanvasRenderingContext2D,
        public tetromino: ITetromino,
        private config: IConfig = CONFIG,
        public type: string = 'current'
    ) {
        this.matrix = tetromino.matrix;
        this.color = tetromino.color;
        this.x = this.centerXPosition(this.matrix);
        this.render();
    }

    move(matrix: Matrix, position: IPosition): void {
        this.x = position.x;
        this.y = position.y;
        this.matrix = matrix;
        this.clear();
        this.render();
    }

    private clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    private render() {
        this.ctx!.fillStyle = this.color;
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx!.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    private centerXPosition(matrix: Matrix): number {
        const columns = this.type === 'next'
            ? this.config.nextGridSize
            : this.config.columns;
        return Math.floor((columns! - this.calculateMaxWidth(matrix)) / 2);
    }

    private calculateMaxWidth(matrix: Matrix): number {
        let maxWidth = 0;

        for (let row = 0; row < matrix.length; row++) {
            let rowWidth = 0;

            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] > 0) {
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
