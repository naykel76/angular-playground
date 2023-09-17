import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IConfig, IPosition, Matrix } from '../defs';
import { Injectable } from '@angular/core';
import { Piece } from '../models/Piece';
import { TETROMINOS } from '../data';
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
        const shapeKeys = Object.keys(TETROMINOS);
        const randomIndex = Math.floor(Math.random() * shapeKeys.length);
        const p = TETROMINOS[shapeKeys[randomIndex]];
        const piece = new Piece(ctx, p, this.config);
        this.pieceSubject$.next(piece); // update the subject
        return piece;
    }

    move(shape: Matrix, position: IPosition) {
        const currentPiece = this.pieceSubject$.value;
        currentPiece?.move(shape, position);
        this.pieceSubject$.next(currentPiece); // Update the subject
    }
}
