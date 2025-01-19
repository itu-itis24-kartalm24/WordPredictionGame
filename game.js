let currentWord = 'ADIEU';
let revealedLetters = new Set();
let score = 0;
let lives = 3;
let gameStarted = false;
let isCross = false;

const boxes = document.querySelectorAll('.word-box');
const letterImages = document.querySelectorAll('.letter-image');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const predictionInput = document.getElementById('prediction');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

resetButton.style.display = 'none';

function updateLives() {
    const hearts = livesDisplay.querySelectorAll('.heart-icon');
    hearts.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.remove('inactive');
        } else {
            heart.classList.add('inactive');
        }
    });
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function checkWin() {
    return revealedLetters.size === currentWord.length;
}

function handleResetStyling() {
    boxes.forEach(box => {
        box.classList.remove('revealed');
    });
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
    const box = document.querySelector(`#box${index}`);
    const letterImage = box.querySelector('.letter-image');
    letterImage.style.opacity = '1';
    box.classList.add('revealed');
}

function showCrossesTemporarily() {
    const boxes = document.querySelectorAll('.word-box');
    isCross = true;
    boxes.forEach((box, index) => {
        if (!revealedLetters.has(index)) {
            const cross = box.querySelector('.cross-image');
            cross.style.opacity = '1';
            setTimeout(() => {
                cross.style.opacity = '0';
                isCross = false;
            }, 1000);
        }
    });
}

function decrementLives() {
    lives--;
    updateLives();
    showCrossesTemporarily();
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

function handleInvalidGuess() {
    alert('Invalid guess! Please enter a single letter or the full word (5 letters).');
}

function resetGame() {
    handleResetStyling();
    hideLetters();
    document.querySelectorAll('.cross-image').forEach(cross => {
        cross.style.opacity = '0';
    });
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
    if (isCross ) 
        return;
    
    const guess = predictionInput.value.toUpperCase();
    predictionInput.value = '';

    if(guess.length !== 1 && guess.length !== currentWord.length){
        handleInvalidGuess();
        return;
    }
    
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