const word = "ADIEU";
let score = 0;
let lives = 3;
let revealedLetters = new Set();
let gameStarted = false;

const boxes = document.querySelectorAll('.word-box');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const predictionInput = document.getElementById('prediction');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

resetButton.style.display = 'none';

function hideLetters() {
    boxes.forEach(box => {
        box.style.color = 'transparent';
    });
}

function updateLives() {
    let livesString = ''
    for (let i = 0; i < lives; i++) {
        livesString += '❤️ ';
    }
    livesDisplay.textContent = livesString;
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function checkWin() {
    return revealedLetters.size === word.length;
}

function resetGame() {
    score = 0;
    lives = 3;
    gameStarted = false;
    revealedLetters = new Set();
    hideLetters();
    updateScore();
    updateLives();
    predictionInput.value = '';
    resetButton.style.display = 'none';
}

function handleGuess() {
    const guess = predictionInput.value.toUpperCase();
    predictionInput.value = '';

    if (!gameStarted && guess !== '') {
        gameStarted = true;
        resetButton.style.display = 'inline-block';
    }

    if (guess.length === word.length) {
        if (guess === word) {
            boxes.forEach(box => {
                box.style.color = 'black';
            });
            setTimeout(() => {
                alert('Congratulations! You won! Your score: ' + score);
                resetGame();
            }, 1000);
        } else {
            lives = 0;
            updateLives();
            alert('Wrong word! Game Over! Your score: ' + score);
            resetGame();
        }
        return;
    }

    if (guess.length === 1) {
        if (word.includes(guess)) {
            let i = word.indexOf(guess);
            boxes[i].style.color = 'black';
            if (!revealedLetters.has(i)) {
                revealedLetters.add(i);
                score += 20;
                updateScore();
            }

            if (checkWin()) {
                setTimeout(() => {
                    alert('Congratulations! You won! Your score: ' + score);
                    resetGame();
                }, 100);
            }
        } else {
            lives--;
            updateLives();
            if (lives === 0) {
                alert('Game Over! Your score: ' + score);
                resetGame();
            }
        }
    }
}

submitButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);
predictionInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

hideLetters(); 