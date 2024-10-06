import { Request, Response, NextFunction } from "express";
import { sendContactEmail } from "services/Contact";

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, email, phone, text_message } = req.body;
        
        const result = await sendContactEmail({ first_name, last_name, email, phone, text_message });
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);

        next();

        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};