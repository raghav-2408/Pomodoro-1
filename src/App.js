import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const startButtonRef = useRef(null);
  const pauseButtonRef = useRef(null);
  const resetButtonRef = useRef(null);
  const minutesDisplayRef = useRef(null);
  const secondsDisplayRef = useRef(null);

  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    const startButton = startButtonRef.current;
    const pauseButton = pauseButtonRef.current;
    const resetButton = resetButtonRef.current;

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    return () => {
      startButton.removeEventListener('click', startTimer);
      pauseButton.removeEventListener('click', pauseTimer);
      resetButton.removeEventListener('click', resetTimer);
    };
  }, [isRunning, isPaused, timeLeft]);

  function startTimer() {
    if (!isRunning) {
      const newTimer = setInterval(countdown, 1000);
      setTimer(newTimer);
      setIsRunning(true);
      setIsPaused(false);
    }
  }

  function pauseTimer() {
    if (isRunning && !isPaused) {
      clearInterval(timer);
      setIsPaused(true);
    } else if (isRunning && isPaused) {
      const newTimer = setInterval(countdown, 1000);
      setTimer(newTimer);
      setIsPaused(false);
    }
  }

  function resetTimer() {
    clearInterval(timer);
    setTimeLeft(25 * 60);
    updateDisplay(25 * 60);
    setIsRunning(false);
    setIsPaused(false);
  }

  function countdown() {
    setTimeLeft(prevTimeLeft => {
      if (prevTimeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up!');
        return 0;
      }
      return prevTimeLeft - 1;
    });
  }

  function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    minutesDisplayRef.current.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplayRef.current.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  useEffect(() => {
    updateDisplay(timeLeft);
  }, [timeLeft]);

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <span ref={minutesDisplayRef}>25</span>:<span ref={secondsDisplayRef}>00</span>
      </div>
      <div className="buttons">
        <button ref={startButtonRef} id="start">Start</button>
        <button ref={pauseButtonRef} id="pause">Pause</button>
        <button ref={resetButtonRef} id="reset">Reset</button>
      </div>
    </div>
  );
}

export default App;
