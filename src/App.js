import './App.css';

function App() {
  let timer;
let isPaused = false;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    if (!isRunning) {
        timer = setInterval(countdown, 1000);
        isRunning = true;
        isPaused = false;
    }
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(timer);
        isPaused = true;
    } else if (isRunning && isPaused) {
        timer = setInterval(countdown, 1000);
        isPaused = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateDisplay();
    isRunning = false;
    isPaused = false;
}

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up!');
        return;
    }
    timeLeft--;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

  return (
    <>
    
    <div class="container">
        <h1>Pomodoro Timer</h1>
        <div class="timer">
            <span id="minutes">25</span>:<span id="seconds">00</span>
        </div>
        <div class="buttons">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
        </div>
    </div>
    </>
  );
}

export default App;
