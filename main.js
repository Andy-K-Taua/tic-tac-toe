document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.game-cell');
    const state = { player: 'x', xWins: 0, oWins: 0, moves: 0, gameOver: false };

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const updateScore = (winner) => {
        state[`${winner}Wins`]++;
        document.getElementById(`${winner}Wins`).textContent = 
            `${winner.toUpperCase()} Total: ${state[`${winner}Wins`]}`;
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        if (state.gameOver || cell.classList.contains('x') || cell.classList.contains('o')) return;

        cell.classList.add(state.player);
        state.moves++;

        const isWin = winPatterns.some(pattern => 
            pattern.every(i => cells[i].classList.contains(state.player))
        );

        if (isWin) {
            state.gameOver = true;
            document.getElementById('winMessage').textContent = `${state.player.toUpperCase()} Wins!`;
            updateScore(state.player);
        } else if (state.moves === 9) {
            document.getElementById('winMessage').textContent = "It's a Draw!";
        } else {
            state.player = state.player === 'x' ? 'o' : 'x';
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('resetButton').addEventListener('click', () => {
        cells.forEach(c => c.classList.remove('x', 'o'));
        state.moves = 0;
        state.gameOver = false;
        document.getElementById('winMessage').textContent = '';
    });
});