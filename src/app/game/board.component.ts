import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppLayout } from '../views/layouts/app-layout.component';
import { CommonModule } from '@angular/common';
import { Canvas } from '../models/Canvas';
import { IConfig } from '../defs';

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

    ngOnInit(): void {
        this.boardInit();
        this.draw();
    }

    boardInit(): void {

        const { rows, columns, blockSize: scale } = this.config;
        const board = new Canvas(columns, rows, this.boardRef.nativeElement, scale);
        this.ctx = board.getContext();
    }

    draw() {
        this.ctx!.fillStyle = 'red';
        this.ctx!.fillRect(1, 1, 1, 1);
    }
}
