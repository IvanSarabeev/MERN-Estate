import { timeStamp } from "console";
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },    
}, 
    {timeStamp: true}
);

// creating user schema inside MongoDB
const User = mongoose.model("User", userSchema);

export default User;