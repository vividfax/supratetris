class FallingCell {

    constructor(x, y, cellSize, colour) {

        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.colour = colour;
    }

    update() {

        this.y += 1;

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

        fill(this.colour);
        stroke(0, 0, 0, 50);

        rect(0, 0, this.cellSize, this.cellSize);
        line(-this.cellSize/2, -this.cellSize/2, this.cellSize/2, this.cellSize/2)
        line(-this.cellSize/2, this.cellSize/2, this.cellSize/2, -this.cellSize/2)
        rect(0, 0, this.cellSize/2, this.cellSize/2);

        pop();
    }
}