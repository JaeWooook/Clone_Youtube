import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

// videoRouter.get(routes.videos, videos);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
