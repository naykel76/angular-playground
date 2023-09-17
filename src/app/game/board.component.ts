import { Component, ElementRef, HostListener, Input, ViewChild, inject } from '@angular/core';
import { AppLayout } from '../views/layouts/app-layout.component';
import { PieceService } from '../services/piece.service';
import { GameService } from '../services/game.service';
import { IConfig, IPosition, Matrix } from '../defs';
import { CommonModule } from '@angular/common';
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

    /**
     * Property to store the ID of the interval
     */
    private intervalId?: any;

    private pieceService = inject(PieceService);
    private gameService = inject(GameService);

    ngOnInit(): void {
        this.initBoard();
        this.subscribeToPiece();
        this.subscribeToGrid();
        this.startInterval();
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

    /**
     * Start a periodic interval with a specified time interval. The time is
     * based on the level of the game. The higher the level, the faster the
     * interval.
     * @param {number} time The time interval in milliseconds
     */
    private startInterval(time: number = 400): void {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.drop();
            }, time);
        }
    }

    /**
     * Stop the currently active interval.
     */
    private stopInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined; // Reset the interval ID
        }
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
            // if the piece can move to the new position
            if (this.gameService.canMove(shape, { x, y })) {
                this.moveAndRenderGrid(shape, { x, y });
            }
        }
    }

    /**
     * Move the piece to the new position and render the grid
     * @param {Matrix} shape The shape of the piece
     * @param {IPosition} position The new position of the piece
     */
    private moveAndRenderGrid(shape: Matrix, position: IPosition): void {
        this.pieceService.move(shape, { x: position.x, y: position.y });
        this.gameService.renderGrid(this.ctx!);
    }

    /**
     * Drop the piece down one row if it can move. If it can't move, lock the
     * piece in place.
     */
    private drop(): void {
        const { shape, x, y } = this.moves["ArrowDown"](this.piece);
        if (this.gameService.canMove(shape, { x, y })) {
            this.moveAndRenderGrid(shape, { x, y });
        } else {
            // make sure you pass in the 'current' position to be locked in!
            this.gameService.lock(shape, { x: this.piece?.x || 0, y: this.piece?.y || 0 });
            this.piece = this.pieceService.getPiece(this.ctx!);
            // this is jittery, but it works. The new piece and clearing of
            // rows needs to happen at the same time
            this.gameService.clearRows();
        }
    }
}
