import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_HOST,
        to: email,
        subject: "Email Verification",
        text: `Your OTP for email verification is :${otp}`
    };

    await transporter.sendMail(mailOptions);
}