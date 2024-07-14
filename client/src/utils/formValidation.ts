import { string, object } from "yup";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signInValidationSchema = object().shape({
    email: string()
        .min(5, 'Email must be at least 5 characters')
        .max(35, "Email cannot exceed 35 characters")
        .matches(
            emailRegex,
            'Invalid email address !'
        )
        .required("Email is required !"),
    password: string()
        .min(6, 'Password must contain at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .required('Password is required !')
});

export const signUpSchema = object().shape({
    username: string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, "Username cannot exceed 20 characters")
        .matches(
            usernameRegex,
            'Username can only contain letters, numbers, and underscores !'
        )
        .required("Username is required !"),
    email: string()
        .min(5, 'Email must be at least 5 characters')
        .max(35, "Email cannot exceed 35 characters")
        .matches(
            emailRegex,
            'Invalid email address !'
        )
        .required("Email is required !"),
    password: string()
        .min(6, 'Password must contain at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .matches(
            passwordRegex,
            'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required("Password is required !")
});

export const contactSchema = object().shape({
    first_name: string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, "Username cannot exceed 20 characters")
        .matches(
            usernameRegex,
            'Username can only contain letters, numbers, and underscores !'
        ),
    last_name: string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, "Username cannot exceed 20 characters")
        .matches(
            usernameRegex,
            'Username can only contain letters, numbers, and underscores !'
        ),
    email: string()
        .min(5, 'Email must be at least 5 characters')
        .max(35, "Email cannot exceed 35 characters")
        .matches(
            emailRegex,
            'Invalid email address !'
        )
        .required("Email is required !"),
    phone: string()
        .matches(phoneRegex, 'Invalid phone number')
        .required('Phone number is required')
    ,
    text_message: string()
        .min(5, 'Description must be at least 5 characters')
        .max(500, 'Description cannot exceed 500 characters')
        .required('Description is required')
    ,
});