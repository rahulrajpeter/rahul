const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "x";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;
  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!cells.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  return wins.some(([a, b, c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
