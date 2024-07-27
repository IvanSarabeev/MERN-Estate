import express from "express";
import { signUp, signIn, googleAuth, signOut, githubAuth } from "../controllers/auth.controller.js";
import { validationSignUpData, validateUserAuthentication, validate } from "../helpers/constaintValidation.js";
import { verifyOtp } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/signup", validationSignUpData(), validate, signUp);
router.post("/signin", validateUserAuthentication(), validate, signIn);
router.post("/verify-otp", verifyOtp);
router.post("/google", googleAuth);
router.post("/github", githubAuth);
router.get("/signout", signOut);

export default router;