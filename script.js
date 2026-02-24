var cells = document.querySelectorAll(".cell");
var statusText = document.getElementById("status");

var currentPlayer = "X";
var gameActive = true;

var winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(function(cell, index) {
    cell.addEventListener("click", function() {

        if (cell.innerHTML !== "" || !gameActive) return;

        cell.innerHTML = "X";
        checkWinner();

        if (gameActive) {
            computerMove();
        }
    });
});

function computerMove() {

    var emptyCells = [];

    cells.forEach(function(cell, index) {
        if (cell.innerHTML === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    var randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    cells[randomIndex].innerHTML = "O";

    checkWinner();
}

function checkWinner() {

    for (var i = 0; i < winningConditions.length; i++) {

        var condition = winningConditions[i];
        var a = cells[condition[0]].innerHTML;
        var b = cells[condition[1]].innerHTML;
        var c = cells[condition[2]].innerHTML;

        if (a === "" || b === "" || c === "") continue;

        if (a === b && b === c) {
            statusText.innerHTML = a + " Wins!";
            gameActive = false;
            return;
        }
    }

    var draw = true;

    cells.forEach(function(cell) {
        if (cell.innerHTML === "") draw = false;
    });

    if (draw) {
        statusText.innerHTML = "Draw!";
        gameActive = false;
    }
}

function restartGame() {
    cells.forEach(function(cell) {
        cell.innerHTML = "";
    });
    statusText.innerHTML = "";
    gameActive = true;
}
