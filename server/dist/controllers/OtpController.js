"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const xss_filters_1 = __importDefault(require("xss-filters"));
const User_1 = __importDefault(require("models/User"));
const ResponseStatus_1 = require("helpers/ResponseStatus");
/**
 * Verifies the OTP provided by the user.
 */
const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        // Sanitize input data
        const sanitizedData = {
            email: xss_filters_1.default.inHTMLData(email),
            otp: xss_filters_1.default.inHTMLData(otp)
        };
        // Find the user by email
        const user = await User_1.default.findOne({ email: sanitizedData.email });
        // If the user does not exist, return a 404 error
        if (!user) {
            res.status(404).json({ success: false, message: ResponseStatus_1.USER_NOT_FOUND });
            return;
        }
        const currentTime = Date.now();
        // Verify the OTP and expiration time
        if (user.otp === otp && user?.otpExpires && user.otpExpires.getTime() > currentTime) {
            // Clear OTP and expiration after successful verification
            user.otp = undefined;
            user.otpExpires = undefined;
            // Save the updated user
            await user.save();
            res.status(200).json({
                success: true,
                message: ResponseStatus_1.OTP_VERIFIED_SUCCESS
            });
            return;
        }
        else {
            // OTP is invalid or expired
            res.status(400).json({
                success: false,
                message: ResponseStatus_1.OTP_FAILED
            });
            return;
        }
    }
    catch (error) {
        console.error('Error occurred during OTP verification:', error);
        next(error); // Forward the error to the middleware handler
    }
};
exports.verifyOtp = verifyOtp;
