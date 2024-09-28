"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("controller/UserController");
const AuthUserCookie_1 = require("utils/AuthUserCookie");
const router = express_1.default.Router();
router.post('/update/:id', AuthUserCookie_1.verifyToken, UserController_1.updateUser);
router.delete('/delete/:id', AuthUserCookie_1.verifyToken, UserController_1.deleteUser);
router.get('/listings/:id', AuthUserCookie_1.verifyToken, UserController_1.getUserListing);
router.get('/:id', AuthUserCookie_1.verifyToken, UserController_1.getUser);
// router.get('/get/user-details', smallUserDetails);
exports.default = router;
