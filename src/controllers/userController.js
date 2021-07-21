import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { username, name, email, password, location } = req.body;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const login = (req, res) => {
  return res.end("Login");
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
