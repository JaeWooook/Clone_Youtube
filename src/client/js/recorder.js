import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/static/ffmpeg-core.js",
  });
  await ffmpeg.load(); //await을 하는 이유는 사용자가 소프트웨어를 사용할 것이기 때문이다.

  //ffmpeg파일을 만든다.
  ffmpeg.FS("writeFile", "Myrecording.webm", await fetchFile(videoFile)); //writeFile은 ffmpeg의 가상 세계에 파일을 생성해준다.
  //타입 , 파일명, 바이너리data를 넣어준다

  await ffmpeg.run("-i", "Myrecording.webm", "-r", "60", "output.mp4"); //ffmpeg실행
  //webm이 mp4로 변환되는 것이다. -r 60은  초당 60프레임으로 인코딩 해주라는 명령어이다. 더 빠른 영상을 인코딩을 가능하게해준다.

  const mp4File = ffmpeg.FS("readFile", "output.mp4"); //파일을 읽는다. output.mp4라는 파일을

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" }); //type이 mp4라는것을 알려줘야한다.

  const mp4Url = URL.createObjectURL(mp4Blob); //이것을 통해서 url을 생성해준다,
  console.log(mp4File);
  console.log(mp4File.buffer);
  const a = document.createElement("a"); //링크를생성하고
  a.href = mp4Url; //videoFile로 갈 수 있는 url과 연결한다.
  a.download = "MyRecording.mp4"; //사용자로 부터 url을 다운로드 하도록 해준다.
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
