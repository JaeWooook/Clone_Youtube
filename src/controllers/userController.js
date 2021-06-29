export const join = (req, res) => res.render("Join", { pageTitle: "Join" });
export const login = (req, res) => res.render("Login", { pageTitle: "Login" });
export const logout = (req, res) =>
  res.render("Logout", { pageTitle: "Logout" });
export const edit = (req, res) =>
  res.render("Edit User", { pageTitle: "Users" });
export const remove = (req, res) =>
  res.render("Remove User", { pageTitle: "User Detail" });
export const see = (req, res) =>
  res.render("See User", { pageTitle: "Edit Profile" });
