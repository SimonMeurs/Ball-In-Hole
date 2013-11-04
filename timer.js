var tijd = 0;
var timer;
var running = false;

function continueTimer(){
    timer = setInterval(addTime,1000);
    running = true;
}

function startTimer(){
    clearInterval(timer);
    tijd = 0;
    setInhoud();
    timer = setInterval(addTime,1000);
    running = true;
}

function addTime(){
    tijd++;
    setInhoud();
}

function stopTimer(){
    clearInterval(timer);
    running = false;
}

function setInhoud() {
    document.getElementById("countText").innerHTML = tijd;
}