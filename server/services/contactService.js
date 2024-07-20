import nodemailer from 'nodemailer';
import xssFilters from "xss-filters";
import dotenv from 'dotenv';
import Contact from '../model/contact.model.js';
// import { verifyCaptcha } from './verifyCaptcha.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendContactEmail = async (formData) => {
    try {
        const { first_name, last_name, email, phone, text_message } = formData;

        // const isCaptchaValid = await verifyCaptcha(captcha);

        // if (!isCaptchaValid) {
        //     throw new Error(`Invalid captcha!`);
        // }

        const sanitizedData = {
            first_name: xssFilters.inHTMLData(first_name),
            last_name: xssFilters.inHTMLData(last_name),
            email: xssFilters.inHTMLData(email),
            phone: xssFilters.inHTMLData(phone),
            text_message: xssFilters.inHTMLData(text_message),
        };

        const contact = new Contact(sanitizedData);
        
        const mailOptions = {
            from: `"Contact Form Submission:" ${email}`,
            to: '<no-reply@mern-esatate.com>',
            subject: 'New Contact Form Submission',
            html: `
            <p>Dear Team,</p>
            <p>You have received a new message from the contact form on your website. Here are the details:</p>
            <p><strong>Name:</strong> ${sanitizedData.first_name} ${sanitizedData.last_name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedData.text_message}</p>
            <p>Best Regards,<br>Your Website</p>
            `,
        };

        if (sanitizedData !== null) {
            await transporter.sendMail(mailOptions);
            
            await contact.save();            
        }

        return { success: true, message: 'Message submitted successfully.' };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: 'Error occur, failed to submit!' };
    }
};
