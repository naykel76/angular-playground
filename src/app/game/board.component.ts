import { Component, ElementRef, HostListener, Input, ViewChild, inject } from '@angular/core';
import { AppLayout } from '../views/layouts/app-layout.component';
import { PieceService } from '../services/piece.service';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { IConfig, Matrix } from '../defs';
import { Canvas } from '../models/Canvas';
import { Piece } from '../models/Piece';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, AppLayout],
    template: ` <canvas #board class="bdr bdr-red"></canvas> `
})

export class BoardComponent {

    @ViewChild('board', { static: true }) boardRef!: ElementRef;
    @Input() config!: IConfig;

    ctx: CanvasRenderingContext2D | null = null;
    private piece!: Piece | null;

    private pieceService = inject(PieceService);
    private gameService = inject(GameService);

    ngOnInit(): void {
        this.initBoard();
        this.subscribeToPiece();
        this.subscribeToGrid();
    }

    private initBoard(): void {
        const { rows, columns, blockSize: scale } = this.config;
        const board = new Canvas(columns, rows, this.boardRef.nativeElement, scale);
        this.ctx = board.getContext();
        // Retrieve the initial piece for rendering
        this.piece = this.pieceService.getPiece(this.ctx!);
    }

    private subscribeToPiece(): void {
        this.pieceService.observePiece().subscribe((piece: Piece | null) => {
            this.piece = piece;
        });
    }

    private subscribeToGrid(): void {
        this.gameService.observeGrid().subscribe((grid: Matrix | null) => {
            this.gameService.renderGrid(this.ctx!);
        });
    }

    private moves: any = {
        ArrowLeft: (piece: Piece) => ({ ...piece, x: piece.x - 1 }),
        ArrowRight: (piece: Piece) => ({ ...piece, x: piece.x + 1 }),
        ArrowDown: (piece: Piece) => ({ ...piece, y: piece.y + 1 }),
        ArrowUp: (piece: Piece) => ({ ...piece, y: piece.y - 1 }),
    };

    /**
     * Handle the keydown event and call the moves object, which accepts
     * the current piece and uses a callback to return the updated position
     * in the selected direction or rotation.
     */
    @HostListener('document:keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (this.moves[event.key]) {
            event.preventDefault();
            // decompose the updated piece into its shape, x, and y
            const { shape, x, y } = this.moves[event.key](this.piece);
            // check if the piece can move to the new position
            const canMove = this.gameService.canMove(shape, { x, y });

            if (canMove) {
                this.pieceService.move(shape, { x, y });
                // redraw the grid after each moved to maintain the grid state
                this.gameService.renderGrid(this.ctx!);
            }
        }
    }
}
