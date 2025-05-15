const FULL_PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
const PI_CHUNKS = {
    'full': FULL_PI,
    '1-25': FULL_PI.slice(0, 27),  // Includes "3." and first 25 digits
    '26-50': FULL_PI.slice(27, 52),
    '51-75': FULL_PI.slice(52, 77),
    '76-100': FULL_PI.slice(77, 102)
};

let currentAttempts = parseInt(localStorage.getItem('piAttempts')) || 0;
let highScore = parseInt(localStorage.getItem('piHighScore')) || 0;
let currentIndex = 0;
let isIncorrect = false;
let currentChunk = 'full';

const attemptsDisplay = document.getElementById('attempts');
const highScoreDisplay = document.getElementById('high-score');
const currentStreakDisplay = document.getElementById('current-streak');
const piDisplay = document.getElementById('pi-display');
const input = document.getElementById('input');
const chunkSelect = document.getElementById('chunk-select');

// Initialize displays
attemptsDisplay.textContent = `Attempts: ${currentAttempts}`;
highScoreDisplay.textContent = `High Score: ${highScore} digits`;
currentStreakDisplay.textContent = `Current: 0 digits`;

function updateCurrentStreak() {
    const digitsAfterDecimal = Math.max(0, currentIndex - 2);
    currentStreakDisplay.textContent = `Current: ${digitsAfterDecimal} digits`;
}

function handleIncorrectInput() {
    // Update high score if needed (only counting digits after decimal)
    const digitsAfterDecimal = Math.max(0, currentIndex - 2);
    if (digitsAfterDecimal > highScore) {
        highScore = digitsAfterDecimal;
        localStorage.setItem('piHighScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore} digits`;
    }
    
    // Show incorrect animation
    input.classList.add('incorrect');
    piDisplay.className = 'incorrect';
    
    // Update attempts
    currentAttempts++;
    localStorage.setItem('piAttempts', currentAttempts);
    attemptsDisplay.textContent = `Attempts: ${currentAttempts}`;
    
    // Reset after animation
    setTimeout(() => {
        currentIndex = 0;
        isIncorrect = false;
        input.value = '';
        piDisplay.textContent = '';
        input.classList.remove('incorrect');
        piDisplay.className = 'correct';
        updateCurrentStreak();
    }, 1000);
}

// Handle chunk selection
chunkSelect.addEventListener('change', (e) => {
    currentChunk = e.target.value;
    currentIndex = 0;
    input.value = '';
    piDisplay.textContent = '';
    updateCurrentStreak();
});

input.addEventListener('input', (e) => {
    const value = e.target.value;
    const currentPI = PI_CHUNKS[currentChunk];
    
    if (isIncorrect) {
        return; // Ignore input while incorrect animation is playing
    }

    if (value.length > 0) {
        const lastChar = value[value.length - 1];
        
        if (lastChar === currentPI[currentIndex]) {
            // Correct digit
            piDisplay.textContent = value;
            currentIndex++;
            updateCurrentStreak();
            
            // Update high score if needed (only counting digits after decimal)
            const digitsAfterDecimal = Math.max(0, currentIndex - 2);
            if (digitsAfterDecimal > highScore) {
                highScore = digitsAfterDecimal;
                localStorage.setItem('piHighScore', highScore);
                highScoreDisplay.textContent = `High Score: ${highScore} digits`;
            }
        } else {
            // Incorrect digit
            isIncorrect = true;
            handleIncorrectInput();
        }
    } else {
        // Clear display when input is empty
        piDisplay.textContent = '';
        currentIndex = 0;
        updateCurrentStreak();
    }
});

// Focus input on page load
input.focus(); 