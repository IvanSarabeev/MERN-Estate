import dotenv from "dotenv";

dotenv.config();

const sessionLifeTime = process.env.ENV === "production" ? 6000 * 60 : 3600000;

// Cookie Configuration
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000
};


export const cookieAuthOptions = {
    maxAge: sessionLifeTime,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === "production",
};
