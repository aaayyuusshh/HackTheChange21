var minutes = parseInt(window.prompt("Please enter the amount of minutes you would like to study today: "));
var seconds = "00";
var breaks = parseInt(window.prompt("Please enter the amount of minutes you would like your breaks to be: "));
var countStudy = 0;
var countBreak = 0;
var breakTime = false;

function init(){
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function startTime(){
    minutes -= 1;
    seconds = 59;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    var minutesInterval = setInterval(minutesElapsed, 60000);
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
            breakTime = true;
            document.getElementById("finished").innerHTML = `Break time! It's time to do something de-stressing for the next ${breaks} minutes.`;
            document.getElementById("finished").classList().add("finishMessage");
        }
    
        if((countBreak > 0) && (countBreak % breaks) === 0){
            breakTime = false;
            document.getElementById("finished").innerHTML = "Break time over! Time to get back to work.";
            document.getElementById("finished").classList().add("finishMessage");
        }
    }
    function secondsElapsed(){
        seconds -=1;
        document.getElementById("seconds").innerHTML = (seconds < 10) ? ("0" + seconds) : seconds;

        if(seconds <= 0){
            if(minutes <= 0){
                clearInterval(minutesInterval);
                clearInterval(secondsInterval);
                document.getElementById("finished").innerHTML = "Session complete! You have finished your work for the day!";
                document.getElementById("finished").classList().add("finishMessage");

            }
            seconds = 60;
        }
    }

}