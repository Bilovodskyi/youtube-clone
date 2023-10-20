import express from "express";
import {
    googleAuth,
    signin,
    signup,
    logout,
    // refreshToken,
} from "../controllers/auth.js";

const router = express.Router();

//create a user
router.post("/signup", signup);
//sign in
router.post("/signin", signin);
//Google auth
router.post("/google", googleAuth);
//logout
router.get("/logout", logout);

export default router;
