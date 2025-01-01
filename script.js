console.time("timer");
const playButton = document.querySelector('.play-btn');
const pauseButton = document.querySelector('.pause-btn');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const slider = document.querySelector('#progress');
const search=document.getElementById("search");

pauseButton.style.display = 'none';

let currentSongIndex = 0;
const songs = [
    { name: "Khairiyat Pucho", artist: "Arijit Singh", url: "musics/khariyat.mp3" },
    { name: "Thik Emon Evhabe", artist: "Arijit Daa", url: "musics/thikemon.mp3" },
    { name: "Zara Si Dosti", artist: "Arijit Singh", url: "musics/dosti.mp3" },
];

const audio = new Audio(songs[currentSongIndex].url);

search.addEventListener("keyup",function(e){
    if(e.keyCode===13){
        const songname=search.value;
        for(let i=0;i<=songs.length;i++){
            if(songname==songs[i].name){
                const sind=i;
                search.value="Playing .....";
                currentSongIndex=sind;
                updateSongInfo();
                audio.play();
                playButton.style.display = 'none';
                pauseButton.style.display = 'inline-block';
            }
        }
    }
});

function updateSongInfo() {
    const song = songs[currentSongIndex];
    document.querySelector('.song-name').textContent = song.name;
    document.querySelector('.artist-name').textContent = song.artist;
    audio.src = song.url;
}

playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
});

pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
});

audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    slider.value = value;
});

slider.addEventListener('input', () => {
    audio.currentTime = (slider.value / 100) * audio.duration;
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    audio.play();
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    audio.play();
});

updateSongInfo();
