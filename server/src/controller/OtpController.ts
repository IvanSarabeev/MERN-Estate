import { NextFunction, Request, Response } from 'express';
import xssFilters from 'xss-filters';
import User from "models/User";
import {
    OTP_FAILED,
    OTP_VERIFIED_SUCCESS,
    USER_NOT_FOUND 
} from "helpers/ResponseStatus";

/**
 * Verifies the OTP provided by the user.
 */
export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, otp } = req.body;

        // Sanitize input data
        const sanitizedData = {
            email: xssFilters.inHTMLData(email),
            otp: xssFilters.inHTMLData(otp)
        };

        // Find the user by email
        const user = await User.findOne({ email: sanitizedData.email });

        // If the user does not exist, return a 404 error
        if (!user) {
            res.status(404).json({ success: false, message: USER_NOT_FOUND });
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
                message: OTP_VERIFIED_SUCCESS
            });
            return;
        } else {
            // OTP is invalid or expired
            res.status(400).json({
                success: false,
                message: OTP_FAILED
            });
            return;
        }
    } catch (error) {
        console.error('Error occurred during OTP verification:', error);
        next(error);  // Forward the error to the middleware handler
    }
};
