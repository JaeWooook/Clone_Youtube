import express from "express";
import { join, login, logout } from "../controllers/userController";
import { trending, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
// globalRouter.get(routes.logout, logout);
globalRouter.get("/search", search);

export default globalRouter;
