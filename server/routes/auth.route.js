import express from "express";
import { signUp, signIn, googleAuth, signOut, githubAuth } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);
router.post("/github", githubAuth);
router.get("/signout", signOut);

export default router;