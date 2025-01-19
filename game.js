let currentWord = 'ADIEU';
let revealedLetters = new Set();
let score = 0;
let lives = 3;
let gameStarted = false;

const boxes = document.querySelectorAll('.word-box');
const letterImages = document.querySelectorAll('.letter-image');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const predictionInput = document.getElementById('prediction');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

resetButton.style.display = 'none';

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
    return revealedLetters.size === currentWord.length;
}

function hideLetters() {
    letterImages.forEach(img => {
        img.style.opacity = '0';
    });
}

function showLetters() {
    letterImages.forEach(img => {
        img.style.opacity = '1';
    });
}

function resetGame() {
    hideLetters();
    score = 0;
    revealedLetters.clear();
    lives = 3;
    gameStarted = false;
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

    if (guess.length === currentWord.length) {
        if (guess === currentWord) {
            showLetters();
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
        if (currentWord.includes(guess)) {
            let i = currentWord.indexOf(guess);
            if (!revealedLetters.has(i)) {
                revealedLetters.add(i);
                score += 20;
                updateScore();
                const letterImage = document.querySelector(`#box${i} .letter-image`);
                letterImage.style.opacity = '1';

                if (checkWin()) {
                    setTimeout(() => {
                        alert('Congratulations! You won! Your score: ' + score);
                        resetGame();
                    }, 100);
                }
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
predictionInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

hideLetters(); 