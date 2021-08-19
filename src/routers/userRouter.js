import express from "express";
import {
  edit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

// userRouter.get(routes.users, users);
// userRouter.get(routes.editProfile, editProfile);
// userRouter.get(routes.changePassword, changePassword);
// userRouter.get(routes.userDetail, userDetail);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;
