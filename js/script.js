//DOM ELEMENTS
const vid = document.querySelector('video');
const vidContainer = document.querySelector('.video');
const playBtn = document.querySelector('.video__dock-control--play');
const step = document.querySelectorAll('.video__dock-control--step');
const volume = document.querySelector('.fa-volume-up');
const volumeOutter = document.querySelector('.video__volume');
const volumeInner = document.querySelector('.video__volume--inner');
const screenSize = document.querySelector('.fa-arrows-alt');
const progressBar = document.querySelector('.video__dock-progress');
const progressBarInner = document.querySelector('.video__dock-progress--inner');


//FUNCTIONALITY
//set volume inner to video volume
volumeInner.style.width = vid.volume * 100;

//play/pause video + change icon
function playPause(){
    if(vid.paused){
        vid.play();
        playBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }else{
        vid.pause();
        playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }    
}

//skip forward/backward 10 secs
function plusMinusTime(){
    if(this.classList.contains('fa-step-backward')){
        vid.currentTime = vid.currentTime - 10;
        updateProgress();
    }else{
        vid.currentTime = vid.currentTime + 10;
        updateProgress();
    }
}

//toggle screen size
function toggleScreen(){
    vidContainer.classList.toggle('video--enlarge');
}

//update progress bar
function updateProgress(){
    progressBarInner.style.width = (vid.currentTime / vid.duration) * 100 + '%';
}

//scrub video
function scrubVideo(e){
    let vidPercentage = e.offsetX / progressBar.offsetWidth;
    vid.currentTime = vid.duration * vidPercentage;
    updateProgress();
}

//toggle volume bar
function toggleVolume(){
    volume.classList.toggle('open');
}

//adjust volume
function adjustVolume(e){
    let volPercentage = Math.round((e.offsetX / volumeOutter.offsetWidth) * 10) / 10;
    vid.volume = volPercentage;
    volumeInner.style.width = volPercentage * 100 + '%';
}

//update progress every second
setInterval(function(){
    updateProgress();
}, 1000);


//LISTENERS
playBtn.addEventListener('click', playPause);
vid.addEventListener('click', playPause);
step.forEach(btn => btn.addEventListener('click', plusMinusTime));
screenSize.addEventListener('click', toggleScreen);
progressBar.addEventListener('click', scrubVideo);
volume.addEventListener('click', toggleVolume);
volumeOutter.addEventListener('click', adjustVolume);

let mousedown = false;
progressBar.addEventListener('mousemove', (e) => mousedown && scrubVideo(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);