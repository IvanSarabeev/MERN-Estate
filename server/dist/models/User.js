"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dplqrjsty/image/upload/v1711815567/hmkxg5swcu0ssfiwlasf.jpg",
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: "User"
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    }
}, { timestamps: true });
// creating user schema inside MongoDB
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
