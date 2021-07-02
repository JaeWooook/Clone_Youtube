import express from "express";
import { join, login, logout } from "../controllers/userController";
import { home } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
// globalRouter.get(routes.logout, logout);

export default globalRouter;
