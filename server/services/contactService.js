import nodemailer from 'nodemailer';
import xssFilters from "xss-filters";
import dotenv from 'dotenv';
import Contact from '../model/contact.model.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }

});

export const sendContactEmail = async (formData) => {
    try {
        const { first_name, last_name, email, phone, text_message } = formData;

        const sanitizedData = {
            first_name: xssFilters.inHTMLData(first_name),
            last_name: xssFilters.inHTMLData(last_name),
            email: xssFilters.inHTMLData(email),
            phone: xssFilters.inHTMLData(phone),
            text_message: xssFilters.inHTMLData(text_message),
        };

        const contact = new Contact(sanitizedData);
        await contact.save();

        const mailOptions = {
            from: `"Contact Form" <no-reply@yourdomain.com>`,
            to: process.env.EMAIL_ADDRESS, // Replace with your email
            subject: 'New Contact Form Submission',
            html: `
              <p><strong>Name:</strong> ${sanitizedData.first_name} ${sanitizedData.last_name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
              <p><strong>Message:</strong></p>
              <p>${sanitizedData.text_message}</p>
            `,
          };

          await transporter.sendMail(mailOptions);

          return { success: true, message: 'Message submitted. Thank you!' };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: 'Failed to submit contact form' };
    }
};
