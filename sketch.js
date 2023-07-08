// https://coolors.co/242331-533e2d-a27035-b88b4a-ddca7d

let palette = {
    "white": "#DDCA7D",
    "light": "#B88B4A",
    "mid": "#A27035",
    "dark": "#533E2D",
    "black": "#242331",
}

let grid;
let targets = [];
let fallingCells = [];

let cellSize = 40;

let score = -1;

function setup() {

    for (let colour in palette) {
        palette[colour] = color(palette[colour]);
    }

    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);

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
    grid.updateScore();
    targets = [];

    for (let i = 0; i < 3; i++) {
        targets.push(new Target(cellSize, i));
    }
}

function draw() {

    update();
    display();
    displayUI();
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

    background(palette.black);

    grid.display();

    for (let i = 0; i < targets.length; i++) {
        targets[i].display();
    }

    for (let i = 0; i < fallingCells.length; i++) {
        fallingCells[i].display();
    }
}

function displayUI() {

    fill(palette.white);
    textSize(30);
    text("lowest score: "+score, width/2+250, 130);
}

function mousePressed() {

    if (grid.hover()) {

        if (grid.validate()) {
            grid.dropSelected();
            grid.updateScore();
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