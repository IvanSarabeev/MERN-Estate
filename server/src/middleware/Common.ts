import express from "express";
import { submitContactForm } from "controller/DefaultController";

const router = express.Router();

router.post('/contact', submitContactForm);

export default router;