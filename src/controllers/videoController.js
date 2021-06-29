import { videos } from "../db";

const fakeUser = {
  username: "JaeWook",
  loggedIn: false,
};

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser });
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

export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });

export const deleteVideo = (req, res) =>
  res.render("DeleteVideo", { pageTitle: "Delete Video" });
