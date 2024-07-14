export interface UserSignUpData {
    'username': string,
    'email': string,
    'password': string,
}

export interface UserSignInData {
    'email': string,
    'password': string,
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