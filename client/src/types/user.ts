export interface UserSignUpData {
    'username': string,
    'email': string,
    'password': string,
}

export interface SignInCredentials {
    'email': string,
    'password': string
}

export interface UserOtpCredendials {
    'email': string,
    'otp': string,
}

export interface UserUploadData {
    'username': string,
    'email': string,
    'avatar': string
}

export interface CurrentUserInterface {
    '_id'?: string,
    'username'?: string,
    'email'?: string,
    'avatar'?: string,
    'createdAt'?: string,
}

export interface ContactFormInterface {
    'first_name': string,
    'last_name': string,
    'email': string,
    'phone': string,
    'text_message': string,
}

export interface UserDetails {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    verified: boolean
}