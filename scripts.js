let startTime, updatedTime, difference, timerInterval;
let paused = false, running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    console.log(`Time Updated: ${display.textContent}`);
}

function startStopwatch() {
    if (!running) {
        console.log("Stopwatch started");
        startTime = new Date().getTime();
        timerInterval = setInterval(function() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;

            updateDisplay(difference);
        }, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        console.log("Stopwatch paused");
        clearInterval(timerInterval);
        running = false;
        paused = true;
    }
}

function resetStopwatch() {
    console.log("Stopwatch reset");
    clearInterval(timerInterval);
    display.textContent = "00:00:00";
    running = false;
    paused = false;
    laps = [];
    lapTimes.innerHTML = '';
}

function recordLap() {
    if (running || paused) {
        console.log("Lap recorded");
        laps.push(difference);
        let li = document.createElement('li');
        li.textContent = display.textContent;
        lapTimes.appendChild(li);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

console.log("Script loaded and event listeners added");
