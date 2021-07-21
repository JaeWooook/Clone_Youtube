export const join = (req, res) =>
  res.render("createAccount", { pageTitle: "Create Account" });
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
