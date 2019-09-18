import Cell from "./Cell";

export default class Field {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.buildNewField();
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
    }

    analyzeField() {
        this.fieldMap.forEach((col) => {
            col.forEach((cell) => {
                if (!cell.insideMathchLine) {
                    this.analyzeCell(cell);
                }
            })
        })
    }

    analyzeCell(cell) {

    }
}
