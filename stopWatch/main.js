const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const milisecondsLabel = document.getElementById('miliseconds');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const lapList = document.getElementById('lapList');

// stopwatch variables

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer(){
    interval = setInterval(updateTimer, 10);
    startBtn.disabled = true;
}

function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startBtn.disabled = false;
}

function pauseTimer(){
    clearInterval(interval);
    startBtn.disabled = false;
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startBtn.disabled = false;
}

function updateTimer(){
    miliseconds++;
    if(miliseconds === 100){ //1000 -> 1s=1000ms
        miliseconds = 0;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer(){
    minutesLabel.textContent = padTime(minutes);
    secondsLabel.textContent = padTime(seconds);
    milisecondsLabel.textContent = padTime(miliseconds);
}

function padTime(time){
    return String(time).padStart(2, '0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    miliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(miliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount+1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}