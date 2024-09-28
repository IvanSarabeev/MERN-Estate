import express from "express";
import { verifyOtp } from "controller/OtpController";
import { signUp, signIn, googleAuthentication, signOut, githubAuth } from "controller/AuthenticationController";
import { validationSignUpData, validateUserAuthentication, validate } from "helpers/Constraint";

const router = express.Router();

// TODO: Add validation for Google, GitHub, OtpCode

router.post("/signup", validationSignUpData(), validate, signUp);
router.post("/signin", validateUserAuthentication(), validate, signIn);
router.post("/verify-otp", verifyOtp);
router.post("/google", googleAuthentication);
router.post("/github", githubAuth);
router.get("/signout", signOut);

export default router;