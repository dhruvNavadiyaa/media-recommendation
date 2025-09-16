import { Router } from "express";
import {
  createVideo,
  getUploadSignature,
} from "../controller/video.controller";

const videoRouter = Router();

videoRouter.get("/url", getUploadSignature);
videoRouter.post("/", createVideo);

export default videoRouter;
