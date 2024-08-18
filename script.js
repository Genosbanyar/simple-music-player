const audioList = document.querySelector(".audio-list");
const audioTag = document.getElementById("audioTag");
const containerTag = document.getElementsByClassName("container")[0];
const playBtn = document.querySelector(".fa-play");
const durationTag = document.querySelector(".timer");
const pauseBtn = document.getElementsByClassName("fa-pause")[0];
const currentProgressTag = document.getElementById("current-progress");
const nextBtn = document.querySelector(".fa-forward");
const backBtn = document.getElementsByClassName("fa-backward")[0];
const musicList = [
  {
    audioId: "musics/mawaytatchitchin.mp3",
    title: "Ma Way That Chit Chin - N kai Yar",
  },
  {
    audioId: "musics/minkothadiyayin.mp3",
    title: "Min Ko Thadiya Yin - Kaung Kaung & Moh Moh Lwin",
  },
  { audioId: "musics/sonemat.m4a", title: "Yin Khone Tan Sone Matt - Gae Gae" },
  {
    audioId: "musics/waytwrma.mp3",
    title: "Way Kwr Ma - Htet Mon & Yadanar Mai",
  },
  {
    audioId: "musics/wine su & hlwan paing.mp3",
    title: "A Chit Takhu Ko Twae P - Wine Su Khaing Thine & Hlwan Paing",
  },
];

for (let i = 0; i < musicList.length; i++) {
  const musicDiv = document.createElement("div");
  musicDiv.classList.add("music-style");
  let musicTitle = (i + 1).toString() + ". " + musicList[i].title;
  musicDiv.addEventListener("click", () => {
    isPlaying = true;
    updatePlayAndPauseBtn();
    audioTag.src = musicList[i].audioId;
    audioTag.play();
    currentSongId = i;
  });
  musicDiv.textContent = musicTitle;
  audioList.append(musicDiv);

  let currentSongId = 0;
  let isPlaying = false;
  playBtn.addEventListener("click", () => {
    isPlaying = true;
    let currentTime = Math.floor(audioTag.currentTime);
    if (currentTime === 0) {
      let songId = musicList[currentSongId].audioId;
      audioTag.src = songId;
      audioTag.play();
      updatePlayAndPauseBtn();
    } else {
      audioTag.play();
      updatePlayAndPauseBtn();
    }
  });

  pauseBtn.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseBtn();
  });

  nextBtn.addEventListener("click", () => {
    isPlaying = true;
    currentSongId += 1;
    if (currentSongId === musicList.length) {
      currentSongId = 0;
    }
    let songId = musicList[currentSongId].audioId;
    audioTag.src = songId;
    audioTag.play();
    updatePlayAndPauseBtn();
  });

  backBtn.addEventListener("click", () => {
    isPlaying = true;
    console.log(currentSongId);
    if (currentSongId === 0) {
      currentSongId += musicList.length;
    }
    currentSongId -= 1;
    let songId = musicList[currentSongId].audioId;
    audioTag.src = songId;
    audioTag.play();
    updatePlayAndPauseBtn();
  });

  const updatePlayAndPauseBtn = () => {
    if (isPlaying) {
      pauseBtn.style.display = "inline";
      playBtn.style.display = "none";
    } else {
      pauseBtn.style.display = "none";
      playBtn.style.display = "inline";
    }
  };

  let createMinuteAndSecondText = "00:00";
  let totalDuration = 0;
  audioTag.addEventListener("loadeddata", () => {
    totalDuration = Math.floor(audioTag.duration);
    createMinuteAndSecondText = totalMinuteAndSecond(totalDuration);
  });

  audioTag.addEventListener("timeupdate", () => {
    let currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = totalMinuteAndSecond(currentTime);
    let minuteAndSeconds = currentTimeText + " / " + createMinuteAndSecondText;
    durationTag.textContent = minuteAndSeconds;
    updateCurrentProgressBar(currentTime);
  });

  const updateCurrentProgressBar = (currentTime) => {
    const currentProgressBarDuration = (530 / totalDuration) * currentTime;
    currentProgressTag.style.width =
      currentProgressBarDuration.toString() + "px";
  };

  const totalMinuteAndSecond = (totalTime) => {
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;
    let minuteText =
      totalMinutes < 10 ? "0" + totalMinutes.toString() : totalMinutes;
    let secondText =
      totalSeconds < 10 ? "0" + totalSeconds.toString() : totalSeconds;
    return minuteText + " : " + secondText;
  };
}
