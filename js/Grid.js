class Grid {

    constructor(w, h, cellSize) {

        this.w = w;
        this.h = h;
        this.cellSize = cellSize;

        this.grid = [];
    }

    createGrid() {

        for (let i = 0; i < this.w; i++) {

            let col = [];

            for (let j = 0; j < this.h; j++) {
                col.push(new Cell(i, j, this.cellSize));
            }

            this.grid.push(col);
        }

        let lastRow = [];

        for (let i = 0; i < this.w; i++) {
            if (i > this.w*0.6) lastRow.push(true);
            else lastRow.push(false);
        }

        shuffle(lastRow, true);

        for (let i = 0; i < this.w; i++) {
            this.grid[i][this.h-1].dead = lastRow[i];
        }
    }

    update() {

    }

    validate() {

        let numberSelected = 0;

        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.grid[i][j].selected) numberSelected++;
            }
        }

        if (numberSelected != 4) return false;

        for (let i = 0; i < targets.length; i++) {
            if (this.gridContains(targets[i].shape)) {
                targets[i].newShape();
                return true;
            }
        }

        return false;
    }

    gridContains(shape) {

        let firstGridCell = -1;

        dance: for (let j = 0; j < this.h; j++) {
            for (let i = 0; i < this.w; i++) {

                if (this.grid[i][j].selected) {
                    firstGridCell = [i, j];
                    break dance;
                }
            }
        }

        let firstTargetCell = -1;
        let targetShapeCount = 0;

        for (let i = 0; i < shape[0].length; i++) {
            for (let j = 0; j < shape.length; j++) {

                if (shape[i][j]) {

                    targetShapeCount++;

                    if (firstTargetCell == -1) {
                        firstTargetCell = [j, i];
                    } else {

                        if (firstGridCell[0]+j-firstTargetCell[0] >= this.w || firstGridCell[0]+j-firstTargetCell[0] < 0) return false;
                        let cell = this.grid[firstGridCell[0]+j-firstTargetCell[0]][firstGridCell[1]+i-firstTargetCell[1]];

                        if (cell instanceof Cell && !cell.selected) {
                            return false;
                        }
                    }

                    let potentialX = firstGridCell[0]+j-firstTargetCell[0];
                    let potentialY = firstGridCell[1]+i-firstTargetCell[1];

                    let cellBelow = this.grid[potentialX][potentialY+1];

                    if (cellBelow instanceof Cell && !cellBelow.selected && !cellBelow.dead) {
                        return false;
                    }

                    if (targetShapeCount == 4) return true;
                }
            }
        }
    }

    dropSelected() {

        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {

                if (this.grid[i][j].selected) {
                    this.grid[i][j].selected = false;
                    this.grid[i][j].dead = true;
                    fallingCells.push(new FallingCell(this.grid[i][j].xPos, this.grid[i][j].yPos, this.cellSize));
                }
            }
        }
    }

    addNewRow() {

        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {

                if (this.grid[i][j].dead) {
                    if (random() < 0.5) this.grid[i][j].dead = false;
                    break;
                }
            }
        }
    }

    hover() {

        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {

                if (this.grid[i][j].hover()) {

                    this.grid[i][j].selected = !this.grid[i][j].selected;
                    return true;
                }
            }
        }
    }

    display() {

        push();
        translate(width/2, height/2);
        translate(-this.cellSize*this.w/2, -this.cellSize*this.h/2);

        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                this.grid[i][j].display();
            }
        }

        pop();
    }
}