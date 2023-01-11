const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-continer');
const prevBTN = document.getElementById('prev');
const playBTN = document.getElementById('play');
const nextBTN = document.getElementById('next');

// Music
const  songs = [
    {
        name:'Jhené_Aiko',
        displayName: 'The Worst',
        artist: 'Jhené Aiko',
    },
    {
        name: 'Uncle_Lucius_Keep_The_Wolves_Away',
        displayName: 'Keep The Wolves Away',
        artist: 'Uncle Lucius',
    },
    {
        name:'Miley-Cyrus1',
        displayName: 'Heart Of Glass',
        artist: 'Miley Cyrus',
    },
    {
        name:'Taylor_Swift_Karma',
        displayName: 'Karma',
        artist: 'Taylor Swift',
        
    }
]

// Check if Playing
  isPlaying = false;

// Play
function playSong() {
     isPlaying = true;
    playBTN.classList.replace('fa-play', 'fa-pause');
    playBTN.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBTN.classList.replace('fa-pause', 'fa-play');
    playBTN.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBTN.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent =song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src = `image/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; 
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
        
// Delay switching duration Element to avoid NaN
    if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
// Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10 ) {
        currentSeconds = `0${currentSeconds}`;
        }
        console.log('seconds', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const  { duration } = music;
    music.currentTime = (clickX / width) * duarion;

}
     
// Event Listeners
prevBTN.addEventListener('click', prevSong);
nextBTN.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);





