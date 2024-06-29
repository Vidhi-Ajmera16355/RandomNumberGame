document.addEventListener('DOMContentLoaded', () => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const submit = document.querySelector('#subt');
    const userInput = document.querySelector('#guessField');
    const guessSlot = document.querySelector('.guesses');
    const remaining = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const startOver = document.querySelector('.result');
    let prevGuess = [];
    let numGuess = 1;
    let playGame = true;

    if (playGame) {
        submit.addEventListener('click', function (e) {
            e.preventDefault();
            const guess = parseInt(userInput.value);
            validateGuess(guess);
        });
    }

    function validateGuess(guess) {
        if (isNaN(guess)) {
            alert('Please enter a valid number');
        } else if (guess < 1) {
            alert('Please enter a number greater than 0');
        } else if (guess > 100) {
            alert('Please enter a number less than 101');
        } else {
            prevGuess.push(guess);
            if (numGuess === 11) {
                displayGuess(guess);
                displayMsg(`Game over. The number was ${randomNumber}`);
                endGame();
            } else {
                displayGuess(guess);
                checkGuess(guess);
            }
        }
    }

    function checkGuess(guess) {
        if (guess === randomNumber) {
            displayMsg('You guessed it right!');
            endGame();
        } else if (guess < randomNumber) {
            displayMsg('Number is too low');
        } else {
            displayMsg('Number is too high');
        }
    }

    function displayGuess(guess) {
        userInput.value = '';
        guessSlot.innerHTML += `${guess} `;
        numGuess++;
        remaining.innerHTML = `${11 - numGuess}`;
    }

    function displayMsg(message) {
        lowOrHi.innerHTML = `<h2>${message}</h2>`;
    }

    function newGame() {
        const newGameButton = document.querySelector('#newGame');
        newGameButton.addEventListener('click', function () {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            prevGuess = [];
            numGuess = 1;
            guessSlot.innerHTML = '';
            remaining.innerHTML = '10';
            userInput.removeAttribute('disabled');
            startOver.removeChild(newGameButton);
            lowOrHi.innerHTML = '';
            playGame = true;
        });
    }

    function endGame() {
        userInput.value = '';
        userInput.setAttribute('disabled', '');
        const newGameButton = document.createElement('a');
        newGameButton.setAttribute('id', 'newGame');
        newGameButton.innerText = 'Start New Game';
        startOver.appendChild(newGameButton);
        playGame = false;
        newGame();
    }
});
