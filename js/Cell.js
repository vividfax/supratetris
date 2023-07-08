class Cell {

    constructor(x, y, cellSize) {

        this.x = x;
        this.y = y;
        this.cellSize = cellSize;

        this.xPos = this.x*this.cellSize + width/2 - this.cellSize*grid.w/2 + this.cellSize/2;
        this.yPos = this.y*this.cellSize + height/2 - this.cellSize*grid.h/2 + this.cellSize/2;

        this.dead = false;
        this.selected = false;
    }

    update() {

        if (this.dead && this.selected) this.selected = false;
    }

    hover() {

        if (this.dead) return false;
        if (dist(mouseX, mouseY, this.xPos, this.yPos) < this.cellSize/2) return true;
    }

    display() {

        if (this.dead) return;

        push();
        translate(this.x*this.cellSize, this.y*this.cellSize);

        if (this.selected) fill(palette.white);
        else fill(palette.mid);

        stroke(palette.light);

        rect(0, 0, this.cellSize, this.cellSize);
        line(-this.cellSize/2, -this.cellSize/2, this.cellSize/2, this.cellSize/2)
        line(-this.cellSize/2, this.cellSize/2, this.cellSize/2, -this.cellSize/2)
        rect(0, 0, this.cellSize/2, this.cellSize/2);

        pop();
    }
}