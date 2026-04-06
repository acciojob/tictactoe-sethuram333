let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;

const winningCombinations = [
    ["1","2","3"], ["4","5","6"], ["7","8","9"],
    ["1","4","7"], ["2","5","8"], ["3","6","9"],
    ["1","5","9"], ["3","5","7"]
];

const submitBtn = document.getElementById("submit");
const board = document.getElementById("board");
const message = document.querySelector(".message");

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if (!player1 || !player2) return;

    document.getElementById("player-form").style.display = "none";
    board.style.display = "grid";

    currentPlayer = player1;
    message.textContent = `${currentPlayer}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || cell.textContent !== "") return;

        cell.textContent = currentSymbol;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} congratulations you won!`;
            gameActive = false;
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentSymbol = "o";
        } else {
            currentPlayer = player1;
            currentSymbol = "x";
        }

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    return winningCombinations.some(combo => {
        const [a, b, c] = combo;
        return (
            document.getElementById(a).textContent === currentSymbol &&
            document.getElementById(b).textContent === currentSymbol &&
            document.getElementById(c).textContent === currentSymbol
        );
    });
}