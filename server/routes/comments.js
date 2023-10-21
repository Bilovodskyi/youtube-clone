import express from "express";
import { addComment, getComments } from "../controllers/comment.js";

const router = express.Router();

router.post("/", addComment);
router.get("/:videoId", getComments);

export default router;
