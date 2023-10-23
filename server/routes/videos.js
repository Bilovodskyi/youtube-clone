import express from "express";
import {
    addVideo,
    addView,
    getByTag,
    getVideo,
    random,
    search,
    sub,
    trend,
} from "../controllers/video.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/find/:id", getVideo);
router.get("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
