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

    canMove(shape: Matrix, position: IPosition): boolean {
        // `shape.every` checks if every row of the shape meets the conditions
        return shape.every((row, rowIndex) => {
            // `row.every` checks if every value (cell) in the row meets the conditions.
            return row.every((value, columnIndex) => {
                // Calculate the actual x and y position on the board for this cell
                let x = position.x + columnIndex;
                let y = position.y + rowIndex;
                return this.isEmpty(value) || this.isInBoundary({ x, y });
            });
        });
    }

    private isInBoundary(position: IPosition): boolean {
        return position.x >= 0
            && position.x < this.config.columns
            && position.y < this.config.rows;
    }

    isEmpty(value: number): boolean {
        return value === 0;
    }
}
