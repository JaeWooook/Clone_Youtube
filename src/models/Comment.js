import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, //작성한 유저와의 관계
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" }, //연관된 동영상과의 관계
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
