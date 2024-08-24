import xssFilters from 'xss-filters';
import User from "../models/user.model.js";
import { OTP_FAILED, OTP_VERIFIED_SUCCESS, SERVER_ERROR, USER_NOT_FOUND } from "../helpers/ResponseStatus.js";

/**
 * Verifies the OTP provided by the user.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request containing the OTP data.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.otp - The OTP code provided by the user.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * 
 * @returns {Promise<void>} - Sends a JSON response with the result of the OTP verification.
 */
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const SanitizeData = {
            email: xssFilters.inHTMLData(email),
            otp: xssFilters.inHTMLData(otp)
        };

        const user = await User.findOne({ email: SanitizeData.email });

        if (!user) {
            return res.status(404).json({ success: false, message: USER_NOT_FOUND });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            // OTP is valid
            user.otp = null; // Clear OTP after successful verification
            user.otpExpires = null;

            await user.save();
            
            return res.status(200).json({ success: true, message: OTP_VERIFIED_SUCCESS });
        } else {
            // OTP is invalid or expired
            return res.status(400).json({ success: false, message: OTP_FAILED });
        }
    } catch (error) {
        console.error('Error occur:', error);

        res.status(500).json({ success: false, message: SERVER_ERROR });
    }
}