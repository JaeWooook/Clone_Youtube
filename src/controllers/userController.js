import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { username, name, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("Join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  console.log(user.password);
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true; //각 유저마다 req.session에 object를 가지고 있다. 서버에서 미들웨어를 통해서 생성해주었다.
  req.session.user = user; //위에서 찾은 user를 추가해준다.

  return res.redirect("/");
};
// res.render("Login", { pageTitle: "Login" });
export const logout = (req, res) => res.end("Logout");
// res.render("Logout", { pageTitle: "Logout" });
export const edit = (req, res) =>
  res.render("Edit User", { pageTitle: "Edit Users" });
export const remove = (req, res) =>
  res.render("Remove User", { pageTitle: "Remove User" });
export const see = (req, res) =>
  res.render("See User", { pageTitle: "See User" });
