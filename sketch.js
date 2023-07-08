let grid;
let targets = [];
let fallingCells = [];

let cellSize = 40;

function setup() {

    createCanvas(windowWidth, windowHeight);

    setupButtons();
    newGame();
}

function setupButtons() {

    let respinButton = select("#respin-button");
    respinButton.mousePressed(respin);
}

function newGame() {

    grid = new Grid(10, 14, cellSize);
    grid.createGrid();
    targets = [];

    for (let i = 0; i < 3; i++) {
        targets.push(new Target(cellSize, i));
    }
}

function draw() {

    update();
    display();
}

function update() {

    grid.update();

    for (let i = 0; i < targets.length; i++) {
        targets[i].update();
    }

    for (let i = 0; i < fallingCells.length; i++) {
        fallingCells[i].update();
    }
}

function display() {

    background(50);

    grid.display();

    for (let i = 0; i < targets.length; i++) {
        targets[i].display();
    }

    for (let i = 0; i < fallingCells.length; i++) {
        fallingCells[i].display();
    }
}

function mousePressed() {

    if (grid.hover()) {

        if (grid.validate()) {
            grid.dropSelected();
        }
    }
}

function keyPressed() {

    if (key == "R" || key == "r") {
        respin();
    }
}

function respin() {

    for (let i = 0; i < targets.length; i++) {
        targets[i].newShape();
    }
    grid.addNewRow();
}