const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a"); //링크를생성하고
  a.href = videoFile; //videoFile로 갈 수 있는 url과 연결한다.
  a.download = "MyRecording.webm"; //사용자로 부터 url을 다운로드 하도록 해준다.
  document.body.appendChild(a);
  a.click();
};

//버튼이 하나이기 때문에 remove하고 add하는 방법을 사용한다.
const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop); //handleStart처럼 클릭시 반대로 보이게 하기 위함
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart); //stop을 누르면 start라고 안보이게 하기위함이다.
  startBtn.addEventListener("click", handleStop); //stop을 누르면 start라고 보이게하기 위해

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data); //createObjectURL은 브라우저 메모리에서만 가능한 URL을 만들어준다.
    //URL은 파일을 가리키고 있는 url이라고 생각하면 쉽다. 웹상에 존재하지는 않는다.
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    console.log(videoFile);
  };
  recorder.start();
};

const init = async () => {
  //카메라를 가져오는 기능의 함수를 사용한다.
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 200, height: 200 },
  });
  video.srcObject = stream; //video를 넣고 srcObject는 비디오가 가질수 있는 무언가
  video.play(); //video를 실행
  //   console.log(stream);
};
init();
startBtn.addEventListener("click", handleStart);
