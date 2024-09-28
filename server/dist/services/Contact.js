"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
const xss_filters_1 = __importDefault(require("xss-filters"));
const Contact_js_1 = __importDefault(require("../models/Contact.js"));
const EmailProvider_1 = require("utils/EmailProvider");
const sendContactEmail = async (formData) => {
    try {
        const { first_name, last_name, email, phone, text_message } = formData;
        const sanitizedData = {
            first_name: xss_filters_1.default.inHTMLData(first_name),
            last_name: xss_filters_1.default.inHTMLData(last_name),
            email: xss_filters_1.default.inHTMLData(email),
            phone: xss_filters_1.default.inHTMLData(phone),
            text_message: xss_filters_1.default.inHTMLData(text_message),
        };
        const contact = new Contact_js_1.default(sanitizedData);
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
            await EmailProvider_1.transporter.sendMail(mailOptions);
            await contact.save();
        }
        return { success: true, message: 'Message submitted successfully.' };
    }
    catch (error) {
        console.error(`Error occur: ${error}`);
        return { success: false, message: 'Error occur, failed to submit!' };
    }
};
exports.sendContactEmail = sendContactEmail;
