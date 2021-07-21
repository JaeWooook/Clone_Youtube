import express from "express";
import { join, login, logout } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.get("/search", search);
// globalRouter.get(routes.logout, logout);

export default rootRouter;
