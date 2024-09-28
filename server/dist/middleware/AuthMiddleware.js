"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OtpController_1 = require("controller/OtpController");
const AuthenticationController_1 = require("controller/AuthenticationController");
const Constraint_1 = require("helpers/Constraint");
const router = express_1.default.Router();
// TODO: Add validation for Google, GitHub, OtpCode
router.post("/signup", (0, Constraint_1.validationSignUpData)(), Constraint_1.validate, AuthenticationController_1.signUp);
router.post("/signin", (0, Constraint_1.validateUserAuthentication)(), Constraint_1.validate, AuthenticationController_1.signIn);
router.post("/verify-otp", OtpController_1.verifyOtp);
router.post("/google", AuthenticationController_1.googleAuthentication);
router.post("/github", AuthenticationController_1.githubAuth);
router.get("/signout", AuthenticationController_1.signOut);
exports.default = router;
