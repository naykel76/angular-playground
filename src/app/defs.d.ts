type Matrix = number[][];

export interface IDrawingContext {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    scale: number;
}

export interface IConfig {
    rows: number;
    columns: number;
    blockSize: number;
    extended: boolean;
    startLevel: number;
    nextGridSize?: number;
}

export interface ITetromino {
    id?: number;
    matrix: Matrix;
    color: string;
}

export interface IPiece extends ITetromino {
    x: number;
    y: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IGameStats {
    score: number;
    lines: number;
    level: number;
    levelUp: number;
}

export interface Point {
    [key: number]: number;
}

export interface HighScore {
    playerName: string;
    score: number;
}
