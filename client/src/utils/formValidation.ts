import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string()
        .min(5, 'Email must be at least 5 characters')
        .max(25, "Email cannot exceed 25 characters")
        .matches(
            emailRegex,
            'Invalid email address !'
        )
        .required("Email is required !"),
    password: Yup.string()
        .min(6, 'Password must contain at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .matches(
            passwordRegex,
            'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required !')
});