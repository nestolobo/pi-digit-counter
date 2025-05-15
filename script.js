const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
let currentAttempts = parseInt(localStorage.getItem('piAttempts')) || 0;
let currentIndex = 0;
let isIncorrect = false;

const attemptsDisplay = document.getElementById('attempts');
const piDisplay = document.getElementById('pi-display');
const input = document.getElementById('input');

// Initialize attempts display
attemptsDisplay.textContent = `Attempts: ${currentAttempts}`;

input.addEventListener('input', (e) => {
    const value = e.target.value;
    
    if (isIncorrect) {
        // Reset everything if previous attempt was incorrect
        currentIndex = 0;
        isIncorrect = false;
        piDisplay.className = 'correct';
        e.target.value = '';
        return;
    }

    if (value.length > 0) {
        const lastChar = value[value.length - 1];
        
        if (lastChar === PI[currentIndex]) {
            // Correct digit
            piDisplay.textContent = value;
            currentIndex++;
        } else {
            // Incorrect digit
            isIncorrect = true;
            piDisplay.className = 'incorrect';
            currentAttempts++;
            localStorage.setItem('piAttempts', currentAttempts);
            attemptsDisplay.textContent = `Attempts: ${currentAttempts}`;
        }
    } else {
        // Clear display when input is empty
        piDisplay.textContent = '';
    }
});

// Focus input on page load
input.focus(); 