import Cell from "./Cell";

export default class Field {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.buildNewField();
        this.needRefill = false;
    }

    buildNewField() {
        this.fieldMap = [];
        let previousRowCell, previousColCell;
        previousRowCell = previousColCell = new Cell(0 , 0);
        for (let row = 0; row < this.rows; row++) {
            this.fieldMap[row] = [];
            for(let col = 0; col< this.cols; col++) {
                previousColCell = row <= 1 ? previousColCell : this.fieldMap[row - 2][col];
                previousRowCell = col <= 1 ? previousRowCell : this.fieldMap[row][col - 2];

                this.fieldMap[row][col] = this.generateCell(previousColCell, previousRowCell, col, row);
            }
        }
    }

    /**
     * @private
     * @param previousColCell
     * @param previousRowCell
     * @param col
     * @param row
     * @returns {Cell}
     */
    generateCell(previousColCell, previousRowCell, col, row) {
        let cell = new Cell(col, row);
        while (previousRowCell.color.id === cell.color.id || previousColCell.color.id === cell.color.id) {
            cell = new Cell(col, row);
        }
        return cell;
    }

    performMove(fromCol, fromRow, toCol, toRow) {
        // clone object using weird JS-way
        const clone =  Object.assign(Object.create(Object.getPrototypeOf(this.fieldMap[fromRow][fromCol])), this.fieldMap[fromRow][fromCol]);
        this.fieldMap[toRow][toCol].moveTo(fromRow, fromCol);
        clone.moveTo(toRow, toCol);

        // swap cells
        this.fieldMap[fromRow][fromCol] = this.fieldMap[toRow][toCol];
        this.fieldMap[toRow][toCol] = clone;

        this.analyzeField();
        while (this.needRefill === true) {
            this.refillField();
            this.needRefill = false;
            this.analyzeField();
        }
    }

    analyzeField() {
        this.fieldMap.forEach((col) => {
            col.forEach((cell) => {
                if (!cell.insideMatchLine) {
                    this.analyzeCell(cell);
                }
            });
        });
        this.fieldMap = this.fieldMap.map((col) => col
            .filter(cell => !cell.insideMatchLine)
            .map((cell, i) => {
                cell.row = i;
                return cell;
            }))
    }

    analyzeCell(cell) {
        const { row, col } = cell;

        let [matchedColLine, matchedRowLine] = this.analyzeMatches(col, row);
        if (matchedColLine.length > 2) {
            matchedColLine.forEach(cell => cell.match());
        }
        if (matchedRowLine.length > 2) {
            matchedRowLine.forEach(cell => cell.match());
        }

        if (!this.needRefill) {
            this.needRefill = (matchedRowLine.length > 2 || matchedColLine.length > 2);
        }
    }

    // TODO: refactor
    analyzeMatches(col, row) {
        let colBuffer = [this.fieldMap[col][row]];
        let rowBuffer = [this.fieldMap[col][row]];
        let hasPossibleMatches = true;
        let i = 1;
        let matchRight = true;
        let matchLeft = true;
        let matchUp = true;
        let matchDown = true;

        while (hasPossibleMatches) {
            if (((row + i) < this.rows) && matchRight) {
                matchRight = this.fieldMap[col][row + i].color.id === this.fieldMap[col][row].color.id;
                if (matchRight) {
                    colBuffer.push(this.fieldMap[col][row + i]);
                }
            } else {
                matchRight = false;
            }

            if (((row - i) >= 0) && matchLeft) {
                matchLeft = this.fieldMap[col][row - i].color.id === this.fieldMap[col][row].color.id;
                if (matchLeft) {
                    colBuffer.push(this.fieldMap[col][row - i]);
                }
            } else {
                matchLeft = false;
            }

            if (((col + i) < this.cols) && matchUp) {
                matchUp = this.fieldMap[col + i][row].color.id === this.fieldMap[col][row].color.id;
                if (matchUp) {
                    rowBuffer.push(this.fieldMap[col + i][row]);
                }
            } else {
                matchUp = false;
            }

            if (((col - i) >= 0) && matchDown) {
                matchDown = this.fieldMap[col - i][row].color.id === this.fieldMap[col][row].color.id;
                if (matchDown) {
                    rowBuffer.push(this.fieldMap[col - i][row]);
                }
            } else {
                matchDown = false;
            }

            hasPossibleMatches = (matchLeft || matchRight || matchUp || matchDown);
            i++;
        }
        return [colBuffer, rowBuffer];
    }

    refillField() {
        this.fieldMap.map((col, i) => {
            if (col.length < this.rows) {
                while (col.length < this.rows) {
                    col.push(new Cell(i, col.length))
                }
            }
            return col;
        })
    }
}
