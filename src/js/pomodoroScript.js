var minutes = parseInt(window.prompt("Please enter the amount of minutes you would like to study today: "));
var seconds = "00";
var minutesInterval;
var breaks = parseInt(window.prompt("Please enter the amount of minutes you would like your breaks to be: "));
var countStudy = 0;
var countBreak = 0;
var breakTime = false;
var notify = new Audio("/src/js/breakTime.mp3");

function init(){
    minutes = (minutes < 25 || minutes != typeof(Number)) ? 25 : minutes;
    breaks = (breaks < 5 || breaks != typeof(Number)) ? 5 : breaks;
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

        if((countStudy > 0) && (countStudy % 2) === 0){
            if(breakTime === false){
                breakTime = true;
                notify.play();
                document.getElementById("finished").innerHTML = `Break time! It's time to de-stress for the next ${breaks} minutes.`;
                document.getElementById("finished").classList.add("finishMessage");
            }
        }
    
        if((countBreak > 0) && (countBreak % breaks) === 0){
            if(breakTime === true){
                breakTime = false;
                notify.play();
                document.getElementById("finished").innerHTML = "Break time over! Time to get back to work.";
                document.getElementById("finished").classList.add("finishMessage");
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
                document.getElementById("finished").innerHTML = "Session complete! You have finished your work for the day!";
                document.getElementById("finished").classList.add("finishMessage");

            }
            seconds = 60;
        }
    }
}