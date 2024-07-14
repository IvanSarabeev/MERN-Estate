import express from "express";
import { submitContactForm } from "../controller/common.controller.js";

const router = express.Router();

router.post('/contact', submitContactForm);

export default router;