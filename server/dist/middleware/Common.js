"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DefaultController_1 = require("controller/DefaultController");
const router = express_1.default.Router();
router.post('/contact', DefaultController_1.submitContactForm);
exports.default = router;
