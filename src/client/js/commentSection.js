const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer"); //video.dataset을 이용해서 어느 비디오인지 확인
const deleteBtns = document.getElementsByClassName("deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  icon.innerText = ` ${text}`;
  //   console.log("icon : ", icon);
  //   const span = document.createElement("span");
  //   span.innerText = ` ${text}`; //text는 textarea에서 오는 text이다.
  const span2 = document.createElement("span");
  span2.innerText = " ❌";
  span2.className = "deleteBtn";
  //   console.log("span : ", span);
  newComment.appendChild(icon);
  //   newComment.appendChild(span);
  newComment.appendChild(span2);
  //   console.log(newComment);
  videoComments.prepend(newComment);
  span2.addEventListener("click", deleteComment);
};
const deleteComment = async (e) => {
  e.preventDefault();
  const videoId = videoContainer.dataset.id;
  const comment = e.target.parentNode;
  const commentId = comment.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId, commentId }),
  });
  if (response.status === 200) {
    window.location.reload();
  }
};

const handleSubmit = async (e) => {
  console.log("test");
  e.preventDefault(); //브라우저가하는 기본동작을 못하게 막는것
  const textarea = form.querySelector("#video__comment-reply"); //내부로 옴겨서 submit할때만 불러오게해준다?
  const text = textarea.value;
  const video = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${video}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //string은 맞는데 json string이라는 사실을 헤더에알려준다.
    },
    body: JSON.stringify({ text: text }), //body에다가 text내용을 보낸다.
  });
  textarea.value = ""; //댓글을 작성한 이후에 비워주기 위함이다
  //   console.log(response);
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit); //click이 아니라 제출을 event를 감지해야한다.
}

if (deleteBtns) {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteComment);
  }
}
