let board = Array(9).fill(null);
let currentPlayer = 'X';
const statusElement = document.getElementById('status');

showBoard(board);
updateStatus();

function showBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;

        cellElement.addEventListener('click', () => {
            handleClick(index);
        });

        if (cell) {
            cellElement.classList.add('taken');
          }

        boardElement.appendChild(cellElement);
    });
}

function handleClick(index) {
    if (board[index]) {
        return;
    }

    board[index] = currentPlayer; //update board state
    showBoard(board);

    const winner = checkWinner(board); 
    if (winner) {                 //checks for winner
        statusElement.textContent = `Player ${winner} wins!`;
        return;
    }

    if (!board.includes(null)) { //checks for draw
        statusElement.textContent = `It's a draw!`;
        return;
      }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //switch player
    updateStatus();
}

function updateStatus() {
    statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner(board) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6] //diagonals
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        const cellA = board[a];
        const cellB = board[b];
        const cellC = board[c];

        if (cellA && cellA === cellB && cellB === cellC) {
            return cellA;
        }
    }

    return null;
}

//restart button functionality
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  showBoard(board);
  updateStatus();
}