const cells = document.querySelectorAll('.cell');
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('.message');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.querySelector('.game-over-screen');
const gameOverMessage = document.querySelector('.game-over-message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let timer;
let seconds = 0;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'T';
};

const handleClick = (event) => {
    const index = event.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    const winner = checkWinner();
    if (winner) {
        message.textContent = winner === 'T' ? "It's a Tie!" : `${winner} Wins!`;
        messageContainer.style.display = 'block';
        clearInterval(timer);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const startNewGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    messageContainer.style.display = 'none';
    gameOverScreen.style.display = 'none';
    seconds = 0;
    timerDisplay.textContent = '0:00';
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;

    if (seconds === 60) { // 1 minute
        clearInterval(timer);
        showGameOverScreen();
    }
};

const showGameOverScreen = () => {
    const winner = checkWinner();
    gameOverMessage.textContent = winner === 'T' ? "Time's Up! It's a Tie!" : `Time's Up! ${winner} Wins!`;
    gameOverScreen.style.display = 'block';
};

startNewGame();  // Start the timer when the page loads
cells.forEach(cell => cell.addEventListener('click', handleClick));
