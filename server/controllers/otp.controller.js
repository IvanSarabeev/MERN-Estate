import User from "../models/user.model.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Middleware} next 
 * @returns 
 */
export const verifyOtp = async (req, res, next) => {
    try {
        let { email, otp } = req.body;

        email = email.trim();
        otp = otp.trim();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error('Error occur:', error);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}