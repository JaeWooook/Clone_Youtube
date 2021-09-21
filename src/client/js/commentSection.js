const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer"); //video.dataset을 이용해서 어느 비디오인지 확인

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  //   console.log("icon : ", icon);
  const span = document.createElement("span");
  span.innerText = ` ${text}`; //text는 textarea에서 오는 text이다.
  //   console.log("span : ", span);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  //   console.log(newComment);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault(); //브라우저가하는 기본동작을 못하게 막는것
  const textarea = form.querySelector("textarea"); //내부로 옴겨서 submit할때만 불러오게해준다?
  const text = textarea.value;
  const video = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${video}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //string은 맞는데 json string이라는 사실을 헤더에알려준다.
    },
    body: JSON.stringify({ text: text }), //body에다가 text내용을 보낸다.
  });
  textarea.value = ""; //댓글을 작성한 이후에 비워주기 위함이다
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit); //click이 아니라 제출을 event를 감지해야한다.
}
