import express from "express";
import {
    addComment,
    deleteComment,
    getComments,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/", addComment);
router.delete("/:id", deleteComment);
router.get("/:videoId", getComments);

export default router;
