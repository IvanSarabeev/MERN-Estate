import { Document } from "mongoose";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    avatar?: string,
    role?:  "Admin" | "User",
    verified?: boolean,
    otp?: string,
    otpExpires?: Date
};
