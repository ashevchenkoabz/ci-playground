import { PALETTE } from './../constants';

export default class Cell {
    constructor(col, row) {
        this.row = row;
        this.col = col;
        this.insideMatchLine = false;
        this.randomizeColor();
    }

    randomizeColor() {
        const totalColors = PALETTE.length;
        // randomize number between 0 and (PALETTE.length - 1)
        const index = Math.floor(totalColors * Math.random());
        this.color = PALETTE[index];
    }

    moveTo(row, col) {
        this.row = row;
        this.col = col;
    }

    match() {
        this.insideMatchLine = true;
    }
}
