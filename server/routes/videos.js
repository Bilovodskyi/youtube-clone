import express from "express";
import {
    addVideo,
    addView,
    deleteVideo,
    getByTag,
    getVideo,
    random,
    search,
    sub,
    trend,
    updateVideo,
} from "../controllers/video.js";

const router = express.Router();

router.post("/", addVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);
router.get("/find/:id", getVideo);
router.get("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
