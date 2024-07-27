import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
const User = mongoose.model("User", userSchema);

export default User;
