import { Document } from "mongoose";

export interface IContact extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    text_message: string;
}