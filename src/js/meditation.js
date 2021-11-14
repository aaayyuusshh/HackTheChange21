const meditation = () =>{
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll(".time-select button");
    // Radius of outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength); // out of 1359.759765625

    //Duration
    let timeRemaining = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick Different Sounds
    sounds.forEach(sound =>{
        sound.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
        })
    })

    //Play Sounds
    play.addEventListener('click', () =>{
        checkPlaying(song);
    })

    // Select Sound
    timeSelect.forEach( option =>{
        option.addEventListener("click", function(){
            timeRemaining = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(timeRemaining/60)}:${Math.floor(timeRemaining%60)}0`;
        })
    });

    // Create a function specific to stop and play sounds

    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = '../svg/pause.svg';
        }
        else{
            video.pause();
            song.pause();
            play.src = "../svg/play.svg";
        }
    }
   
    // Animate elements on the screen
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = timeRemaining - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate Time Indicator
        let progress = outlineLength - (currentTime/timeRemaining) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate text content
        timeDisplay.textContent = `${minutes}:${(seconds > 0) ? seconds : 00}` ; // Formatted string with minutes:seconds

        if(currentTime >= timeRemaining){
            song.pause();
            song.currentTime = 0;
            play.src = '../svg/play.svg';
            video.pause();
        }
    }
}

meditation();