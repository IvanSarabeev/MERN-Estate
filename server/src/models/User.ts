import mongoose from "mongoose";
import { IUser } from "types/model/user";

interface UserModel extends IUser {
    createdAt: Date;
    updatedAt: Date;
} 

const userSchema = new mongoose.Schema<UserModel>({
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
}, { timestamps: true }
);

// creating user schema inside MongoDB
const User = mongoose.model<UserModel>("User", userSchema);

export default User;
