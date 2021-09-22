import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  // console.log(video);
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Your are not the owner of the video");
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: `Editing ${video.title} `,
    video: video,
  });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({
    _id: id,
  });
  const videoModified = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(videoModified.owner) !== String(video._id)) {
    return res.status(403).redirect("/");
  }

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;

  // console.log(video, thumb, req.files);
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: "/" + thumb[0].destination + thumb[0].filename,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;

  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text: text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id); //비디오 쪽에 comments를 업데이트해주는 것이다.
  video.save();
  return res.status(201).json({ newCommentId: comment._id }); //create상태이다. 201이
  //프론트한테 메시지를 되돌려 보내는 것이다.
};

export const deleteComment = async (req, res) => {
  const {
    session: { user },
    body: { videoId, commentId },
  } = req;
  const video = await Video.findById(videoId);
  const current_user = await User.findById(user._id);
  const comment = await Comment.findById(commentId);

  if (String(comment.owner) !== String(current_user._id)) {
    return res.status(403).redirect("/");
  }
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (current_user === null) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  if (comment === null) {
    return res.status(404).render("404", { pageTitle: "Comment not found." });
  }
  await Comment.findByIdAndDelete(comment._id);
  video.comments.splice(video.comments.indexOf(comment._id), 1);
  video.save();
  return res.sendStatus(200);
};
