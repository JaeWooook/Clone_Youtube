import express from "express";
import { edit, remove, logout, see } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

// userRouter.get(routes.users, users);
// userRouter.get(routes.editProfile, editProfile);
// userRouter.get(routes.changePassword, changePassword);
// userRouter.get(routes.userDetail, userDetail);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
