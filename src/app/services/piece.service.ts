import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TETROMINOS, TETROMINOS_SIMPLE } from '../data';
import { IConfig, IPosition, Matrix } from '../defs';
import { Injectable } from '@angular/core';
import { Piece } from '../models/Piece';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PieceService {

    private pieceSubject$: BehaviorSubject<Piece | null> = new BehaviorSubject<Piece | null>(null)

    private config!: IConfig;

    observePiece(): Observable<Piece | null> {
        return this.pieceSubject$.asObservable();
    }

    getPiece(ctx: CanvasRenderingContext2D): Piece {
        const shapeKeys = Object.keys(TETROMINOS_SIMPLE);
        const randomIndex = Math.floor(Math.random() * shapeKeys.length);
        const p = TETROMINOS_SIMPLE[shapeKeys[randomIndex]];
        const piece = new Piece(ctx, p, this.config);
        this.pieceSubject$.next(piece);
        return piece;
    }

    move(shape: Matrix, position: IPosition) {
        const currentPiece = this.pieceSubject$.value;
        currentPiece?.move(shape, position);
        this.pieceSubject$.next(currentPiece);
    }

    getRotatedPiece(piece: Piece): Piece {
        const currentMatrix = piece.shape;
        const transposedMatrix = this.transposeMatrix(currentMatrix);
        // Replace existing piece shape with the rotated transposed shape
        piece.shape = transposedMatrix;
        return piece;
    }

    private transposeMatrix(shape: Matrix): Matrix {
        const numRows = shape.length;
        const numCols = shape[0].length;
        // Create a new shape for the rotated values
        const rotatedMatrix = new Array(numCols).fill(null).map(() => new Array(numRows));
        // Loop through rows and columns to perform rotation
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                // Rotate the values by swapping rows and columns
                rotatedMatrix[col][numRows - 1 - row] = shape[row][col];
            }
        }
        return rotatedMatrix;
    }
}
