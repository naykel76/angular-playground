import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
        // create a simple square piece
        const p = { id: 1, matrix: [[1]], color: 'rgba(0, 128, 128, 1)' }
        const piece = new Piece(ctx, p, this.config);
        this.pieceSubject$.next(piece); // update the subject
        return piece;
    }

    move(matrix: Matrix, position: IPosition) {
        const currentPiece = this.pieceSubject$.value;
        currentPiece?.move(matrix, position);
        this.pieceSubject$.next(currentPiece); // Update the subject
    }
}
