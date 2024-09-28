import dotenv from "dotenv";
import { CookieConfig } from "types/common/cookie";
import { CookieSiteEnum } from "types/enums/CookieEnum";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const sessionLifeTime = isProduction ? (6000 * 60) : 3600000;

// Cookie Configuration
export const cookieOptions: CookieConfig = {
    maxAge: sessionLifeTime,
    httpOnly: true,
    sameSite: isProduction ? CookieSiteEnum.Strict : 'strict',
    secure: isProduction,
};

export const cookieAuthOptions: CookieConfig = {
    maxAge: sessionLifeTime,
    httpOnly: true,
    sameSite: isProduction ? CookieSiteEnum.Lax : 'lax',
    secure: isProduction,
};
