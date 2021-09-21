import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); //이렇게하면 전체url이 localhost:4000/api/videos/:id/view가된다.
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
