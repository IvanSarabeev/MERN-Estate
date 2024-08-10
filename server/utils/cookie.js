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
    // signed: true,
    // secret: 's%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A',
    sameSite: 'Strict',
    maxAge: 3600000,
};