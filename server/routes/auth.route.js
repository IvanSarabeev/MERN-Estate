import express from "express";
import { signUp, signIn, googleAuth } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);

export default router;