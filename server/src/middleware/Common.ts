import express from "express";
import { submitContactForm } from "controller/DefaultController";
import { validateCommon, validateContactFormData } from "validator/CommonConstraint";

const router = express.Router();

router.post('/contact', validateContactFormData(), validateCommon, submitContactForm);

export default router;