const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsMovementTimeout = null;
let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handlePlay = () => (playBtn.innerText = "Pause");
const handlePause = () => (playBtn.innerText = "Play");

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const hanldeFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};
//마우스의 움직임이 멈추면 사라지게 하기위해 마우스를 가져다댔을때부터 timeout을 작동시킨다.
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    //controlsTimeout이 null이 아니면 clear로 timeout초기화해준다.
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    //우리가 움직임을 멈춘다면 이것은 실행되지 않는다. 마우스가 지속적으로 움직이면 handleMouseMove함수가 새로 실행되면서 이전의 timeout이죽는다.
    clearTimeout(controlsMovementTimeout); //예전의 timeout을 죽이고 새로운 timeout을 만들어준다.
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing"); //mouse event에 따라 controls을 보이게한다. 하기위해 class를 추가
  controlsMovementTimeout = setTimeout(hideControls, 3000); //마우스를 움직일때마다 timeout을 만들어준다.
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000); //mouse 가 사라지면 class를 삭제
  //3초 정도 뒤에 사라지게 하기위해 setTimeout을 이용한다.
  //하지만 다시 마우스가 돌아왔을때는 timeout을 중지시켜야한다.
  //timeout에는 id가 존재하는데 clearTimeout(id) 를 넣으면 실행중인 timeout을 중지시켜준다.
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", hanldeFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
