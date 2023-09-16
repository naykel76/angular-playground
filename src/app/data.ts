import { IConfig, IGameStats, ITetromino, Matrix } from "./defs";

export const DEFAULT_CONFIG: IConfig = {
    rows: 20,
    columns: 10,
    blockSize: 20,
    extended: false,
    startLevel: 1,
    nextGridSize: 4
}

export const GAME_STATS: IGameStats = {
    score: 0,
    lines: 0,
    level: 1,
    levelUp: 10
}

/**
 * default tetrominos each with 4 squares for `normal` game
 */
export const TETROMINOS: { [key: string]: ITetromino } = {
    I: { id: 1, matrix: [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]], color: 'rgba(0, 128, 128, 1)' },
    J: { id: 2, matrix: [[2, 0, 0], [2, 2, 2], [0, 0, 0]], color: 'rgba(0, 0, 255, 1)' },
    L: { id: 3, matrix: [[0, 0, 3], [3, 3, 3], [0, 0, 0]], color: 'rgba(255, 165, 0, 1)' },
    O: { id: 4, matrix: [[4, 4], [4, 4]], color: 'rgba(255, 255, 0, 1)' },
    S: { id: 5, matrix: [[0, 5, 5], [5, 5, 0], [0, 0, 0]], color: 'rgba(0, 128, 0, 1)' },
    T: { id: 6, matrix: [[0, 6, 0], [6, 6, 6], [0, 0, 0]], color: 'rgba(128, 0, 128, 1)' },
    Z: { id: 7, matrix: [[7, 7, 0], [0, 7, 7], [0, 0, 0]], color: 'rgba(255, 0, 0, 1)' },
};

/**
 * extended tetrominos each with 3 squares for 'extended' game
 */
export const EXT_TETROMINOS: { [key: string]: ITetromino } = {
    IE: { id: 8, matrix: [[0, 0, 0, 0], [8, 8, 8, 0], [0, 0, 0, 0], [0, 0, 0, 0]], color: 'sky' },
    LE: { id: 9, matrix: [[9, 0, 0], [9, 9, 0], [0, 0, 0]], color: 'pink' }
};

export const GRID: Matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
    [0, 0, 0, 0, 7, 7, 6, 6, 6, 3],
    [1, 1, 1, 5, 5, 7, 6, 5, 3, 3],
    [0, 0, 5, 5, 4, 4, 2, 0, 5, 5],
    [1, 1, 1, 1, 4, 4, 2, 2, 2, 5],
];
