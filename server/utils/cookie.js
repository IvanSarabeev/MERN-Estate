// Cookie Configuration
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000
};


export const cookieAuthOptions = {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'Strict',
    maxAge: 3600000,
};