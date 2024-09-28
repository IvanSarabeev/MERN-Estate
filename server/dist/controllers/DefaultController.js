"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactForm = void 0;
const Contact_1 = require("services/Contact");
const submitContactForm = async (req, res, next) => {
    try {
        const { first_name, last_name, email, phone, text_message } = req.body;
        const result = await (0, Contact_1.sendContactEmail)({ first_name, last_name, email, phone, text_message });
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error:', error);
        next();
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.submitContactForm = submitContactForm;
