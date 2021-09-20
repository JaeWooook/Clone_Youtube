import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "Myrecording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a"); //링크를생성하고
  a.href = fileUrl; //videoFile로 갈 수 있는 url과 연결한다.
  a.download = fileName; //사용자로 부터 url을 다운로드 하도록 해준다.
  document.body.appendChild(a);
  a.click();
};
const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/static/ffmpeg-core.js",
  });
  await ffmpeg.load(); //await을 하는 이유는 사용자가 소프트웨어를 사용할 것이기 때문이다.

  //ffmpeg파일을 만든다.
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile)); //writeFile은 ffmpeg의 가상 세계에 파일을 생성해준다.
  //타입 , 파일명, 바이너리data를 넣어준다

  await ffmpeg.run("-i", files.input, "-r", "60", files.output); //ffmpeg실행
  //webm이 mp4로 변환되는 것이다. -r 60은  초당 60프레임으로 인코딩 해주라는 명령어이다. 더 빠른 영상을 인코딩을 가능하게해준다.

  await ffmpeg.run(
    "-i",
    "Myrecording.webm",
    "-ss",
    "00:00:01", //시간대를 찾고
    "-frames:v",
    "1",
    "thumbnail.jpg" //썸네일jpg를 output으로하는것이다.
  ); //녹화한 영상의 1초때를 캡처한다.
  //-frames:v 1이라는 명령어는 첫프레임을 캡처한다는 명령어이다.
  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  const mp4File = ffmpeg.FS("readFile", files.output); //파일을 읽는다. output.mp4라는 파일을

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" }); //type이 mp4라는것을 알려줘야한다.
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blob); //이것을 통해서 url을 생성해준다,
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(thumbUrl); //url을 삭제해준다. 메모리를지워준다.
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(videoFile);
  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart); //다시 시작할 수 있도록해준다.
};

//버튼이 하나이기 때문에 remove하고 add하는 방법을 사용한다.
const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop); //handleStart처럼 클릭시 반대로 보이게 하기 위함
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart); //stop을 누르면 start라고 안보이게 하기위함이다.
  actionBtn.addEventListener("click", handleStop); //stop을 누르면 start라고 보이게하기 위해

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
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  //카메라를 가져오는 기능의 함수를 사용한다.
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 1024, height: 576 },
  });
  video.srcObject = stream; //video를 넣고 srcObject는 비디오가 가질수 있는 무언가
  video.play(); //video를 실행
  //   console.log(stream);
};
init();
actionBtn.addEventListener("click", handleStart);
