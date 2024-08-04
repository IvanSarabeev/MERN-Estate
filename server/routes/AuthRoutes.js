import express from "express";
import { signUp, signIn, googleAuthentication, signOut, githubAuth } from "../controllers/AuthenticationController.js";
import { validationSignUpData, validateUserAuthentication, validate } from "../helpers/constaintValidation.js";
import { verifyOtp } from "../controllers/OtpController.js";

const router = express.Router();

router.post("/signup", validationSignUpData(), validate, signUp);
router.post("/signin", validateUserAuthentication(), validate, signIn);
router.post("/verify-otp", verifyOtp);
router.post("/google", googleAuthentication);
router.post("/github", githubAuth);
router.get("/signout", signOut);

export default router;