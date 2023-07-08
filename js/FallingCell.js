class FallingCell {

    constructor(x, y, cellSize) {

        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
    }

    update() {

        this.y += 3;

        if (this.y-this.cellSize > height) {
            this.destruct();
        }
    }

    destruct() {

        let index = fallingCells.indexOf(this);
        if (index != -1) fallingCells.splice(index, 1);
    }

    display() {

        push();
        translate(this.x, this.y);

        ellipse(0, 0, this.cellSize);

        pop();
    }
}