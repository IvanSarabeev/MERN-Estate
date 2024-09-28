import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? '',
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});