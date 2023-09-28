import { Matrix, IConfig, IPosition } from '../defs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CONFIG, GRID, TETROMINOS } from '../data';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private gridSubject$: BehaviorSubject<Matrix | null> = new BehaviorSubject<Matrix | null>(GRID)

    private config: IConfig = CONFIG;

    observeGrid(): Observable<Matrix | null> {
        return this.gridSubject$.asObservable();
    }

    renderGrid(ctx: CanvasRenderingContext2D) {
        const grid = this.gridSubject$.value;
        grid!.forEach((row, y) => {
            // tetVal represents the tetromino value. I = 1, J=2 ... Z=7
            row.forEach((tetVal, x) => {
                if (tetVal > 0) {
                    const tetromino = Object.values(TETROMINOS).find(t => t.id === tetVal);
                    ctx.fillStyle = tetromino!.color;
                    ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    canMove(shape: Matrix, position: IPosition): boolean {
        // `shape.every` checks if every row of the shape meets the conditions
        return shape.every((row, rowIndex) => {
            // `row.every` checks if every value (cell) in the row meets the conditions.
            return row.every((tetVal, columnIndex) => {
                // Calculate the actual x and y position on the grid for this cell
                let x = position.x + columnIndex;
                let y = position.y + rowIndex;
                return tetVal === 0 ||
                    this.isInBoundary({ x, y }) && this.isVacant(x, y);
            });
        });
    }

    lock(matrix: Matrix, position: IPosition): void {
        const currentGrid = this.gridSubject$.value;
        matrix.forEach((row, rowIndex) => {
            row.forEach((tetVal, columnIndex) => {
                if (tetVal > 0) {
                    let x = position.x + columnIndex;
                    let y = position.y + rowIndex;
                    currentGrid![y][x] = tetVal;
                }
            });
        });
    }

    private isInBoundary(position: IPosition): boolean {
        return position.x >= 0
            && position.x < this.config.columns
            && position.y < this.config.rows;
    }

    private isVacant(x: number, y: number): boolean {
        const grid = this.gridSubject$.value;
        // this hurts my brain, why is y and x reversed?
        return grid![x] && grid![y][x] === 0;
    }
}
