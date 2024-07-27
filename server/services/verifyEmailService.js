import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

// const createTransporter = (provider) => {
//     switch (provider) {
//       case 'gmail':
//         return nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: process.env.GMAIL_USER,
//             pass: process.env.GMAIL_PASS,
//           },
//         });
//       case 'outlook':
//         return nodemailer.createTransport({
//           service: 'hotmail',
//           auth: {
//             user: process.env.OUTLOOK_USER,
//             pass: process.env.OUTLOOK_PASS,
//           },
//         });
//       // Add more providers here if needed
//       default:
//         throw new Error('Unsupported email provider');
//     }
//   };

// export const sendVerificationEmail = async (email, otp, provider) => {
//     const transporter = createTransporter(provider);

//     const mailOptions = {
//         from: `"MERN Estate" <${process.env[`${provider.toUpperCase()}_USER`]}>`,
//         to: email,
//         subject: "OTP Email Verification",
//         text: `Your OTP for email verification is: ${otp}`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
    
//         console.log("Email send seccesfully");
//     } catch (error) {
//         console.error(`Error sending email: ${error}`);
//         throw error;
//     }
// }

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
      from: `"MERN Estate" <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`
    };
  
    try {
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      
      throw error;
    }
  };