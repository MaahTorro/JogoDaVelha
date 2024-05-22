document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameMode = 'friend';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const setGameMode = (mode) => {
        gameMode = mode;
        document.getElementById('mode-selection').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        resetGame();
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.innerText = '');
        document.getElementById('back').classList.add('hidden');
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            isGameActive = false;
            alert(`Jogador ${currentPlayer} ganhou!`);
            document.getElementById('back').classList.remove('hidden');
            return;
        }

        if (!board.includes('')) {
            isGameActive = false;
            alert('Empate!');
            document.getElementById('back').classList.remove('hidden');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const computerPlay = () => {
        if (!isGameActive) return;

        let availableCells = [];
        board.forEach((cell, index) => {
            if (cell === '') availableCells.push(index);
        });

        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomCell] = currentPlayer;
        cells[randomCell].innerText = currentPlayer;

        handleResultValidation();
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = clickedCell.getAttribute('data-index');

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        handleResultValidation();

        if (gameMode === 'computer' && currentPlayer === 'O') {
            setTimeout(computerPlay, 500);
        }
    };

    const backToModeSelection = () => {
        document.getElementById('mode-selection').classList.remove('hidden');
        document.getElementById('game').classList.add('hidden');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Exposing functions to global scope for button click handlers
    window.setGameMode = setGameMode;
    window.resetGame = resetGame;
    window.backToModeSelection = backToModeSelection;
});
