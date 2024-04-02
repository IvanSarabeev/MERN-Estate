import express from "express";
import { signUp, signIn, googleAuth, signOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);
router.get("/signout", signOut);

export default router;