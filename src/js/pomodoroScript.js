var minutes = 30;
var seconds = "00";
var minutesInterval;
var breaks = 5;
var countStudy = 0;
var countBreak = 0;
var breakTime = false;
var notify = new Audio("/src/js/breakTime.mp3");

function init(){
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function player(){
    if(minutesInterval === undefined){
        startTime();
    } 
}

function startTime(){
    minutes -= 1;
    document.getElementById("minutes").innerHTML = (minutes < 10) ? ("0" + minutes) : minutes;
    seconds = 59;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("finished").innerHTML = `Time started! It's time to work for the next 25 minutes.`;
    document.getElementById("finished").classList.add("finishMessage");

    minutesInterval = setInterval(minutesElapsed, 60000);
    var secondsInterval = setInterval(secondsElapsed, 1000);

    function minutesElapsed(){
        minutes -=1;
        document.getElementById("minutes").innerHTML = (minutes < 10) ? ("0" + minutes) : minutes;

        if(breakTime){
            countBreak+=1;
        } else{
            countStudy+=1;
        }

        if(countStudy === 25){
            if(breakTime === false){
                breakTime = true;
                notify.play();
                document.getElementById("finished").innerHTML = `Break time! It's time to de-stress for the next 5 minutes.`;
                document.getElementById("finished").classList.add("finishMessage");
            }
        }
    
        if(countBreak === 5){
            if(breakTime === true){
                breakTime = false;
            }
        }
    }
    function secondsElapsed(){
        seconds -=1;
        document.getElementById("seconds").innerHTML = (seconds < 10) ? ("0" + seconds) : seconds;

        if(seconds <= 0){
            if(minutes <= 0){
                notify.play();
                clearInterval(minutesInterval);
                clearInterval(secondsInterval);
                document.getElementById("finished").innerHTML = "Session complete! Click the restart button to start another cycle.";
                document.getElementById("finished").classList.add("finishMessage");

            }
            seconds = 60;
        }
    }
}