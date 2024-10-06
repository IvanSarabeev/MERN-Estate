import express from "express";
import { verifyOtp } from "controller/OtpController";
import { 
    signUp,
    signIn, 
    googleAuthentication, 
    signOut, 
    githubAuth
} from "controller/AuthenticationController";
import { 
    validationSignUpData, 
    validateUserAuthentication, 
    validateAuth, 
    validateThirdPartyConstraints 
} from "validator/AuthConstraint";
import { validateEmailOtp, validateOtp } from "validator/OtpConstraint";

const router = express.Router();

router.post("/signup", validationSignUpData(), validateAuth, signUp);
router.post("/signin", validateUserAuthentication(), validateAuth, signIn);
router.post("/verify-otp", validateEmailOtp(), validateOtp, verifyOtp);
router.post("/google", validateThirdPartyConstraints(), validateAuth, googleAuthentication);
router.post("/github", validateThirdPartyConstraints(), validateAuth, githubAuth);
router.get("/signout", signOut);

export default router;