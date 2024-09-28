export interface CookieConfig {
    maxAge: number;
    httpOnly: boolean;
    sameSite: boolean | "strict" | "lax" | "none";
    secure: boolean;
}