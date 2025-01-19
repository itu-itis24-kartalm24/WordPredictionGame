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

function handleGameStart(guess) {
    if (!gameStarted && guess !== '') {
        gameStarted = true;
        resetButton.style.display = 'inline-block';
    }
}

function handleFullWordGuess(guess) {
    if (guess === currentWord) {
        showLetters();
        score = 100;
        updateScore();
        showWinMessage();
        return true;
    } else {
        handleGameOver('Wrong word!');
        return true;
    }
}

function handleSingleLetterGuess(guess) {
    if (currentWord.includes(guess)) {
        let i = currentWord.indexOf(guess);
        if (!revealedLetters.has(i)) {
            revealLetterAt(i);
            if (checkWin()) {
                showWinMessage();
            }
        }
    } else {
        decrementLives();
    }
}

function revealLetterAt(index) {
    revealedLetters.add(index);
    score += 20;
    updateScore();
    const letterImage = document.querySelector(`#box${index} .letter-image`);
    letterImage.style.opacity = '1';
}

function decrementLives() {
    lives--;
    updateLives();
    if (lives === 0) {
        handleGameOver('Game Over!');
    }
}

function showWinMessage() {
    setTimeout(() => {
        alert('Congratulations! You won! Your score: ' + score);
        resetGame();
    }, 100);
}

function handleGameOver(message) {
    lives = 0;
    updateLives();
    alert(message + ' Your score: ' + score);
    resetGame();
}

function resetGame() {
    hideLetters();
    score = 0;
    revealedLetters.clear();
    lives = 3;
    gameStarted = false;
    updateScore();
    updateLives();
    predictionInput.value = '';
    resetButton.style.display = 'none';
}

function handleGuess() {
    const guess = predictionInput.value.toUpperCase();
    predictionInput.value = '';

    handleGameStart(guess);

    if (guess.length === currentWord.length) {
        handleFullWordGuess(guess);
        return;
    }

    if (guess.length === 1) {
        handleSingleLetterGuess(guess);
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