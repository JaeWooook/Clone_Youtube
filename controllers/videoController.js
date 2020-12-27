import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("Search", { pageTitle: "Search", searchingBy });
};

export const upload = (req, res) =>
  res.render("Upload", { pageTitle: "Upload" });

// export const videos = (req, res) =>
//   res.render("Videos", { pageTitle: "Videos" });

export const videoDetail = (req, res) =>
  res.render("VideoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("EditVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("DeleteVideo", { pageTitle: "Delete Video" });
