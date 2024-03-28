import { UserSignInData, UserSignUpData } from 'types/user';

const postMethod = 'POST';

const urlSignUp: string = "/api/auth/signup";
const urlSignIn: string = "/api/auth/signin";

export const registerUser = async (formData: UserSignUpData) => {
    try {
        const response = await fetch(urlSignUp, {
            method: postMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();

        console.log('User created successfully');

        return data;
    } catch (error) {
        throw new Error(`Error message occur: ${error}`);
    }
}

export const signInUser = async (formData: UserSignInData) => {
    try {
        const response = await fetch(urlSignIn, {
            method: postMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }
    
        const data = await response.json();

        console.log('User signed in successfully!');
        
        return data;

        
    } catch (error) {
        throw new Error(`Error message: ${error}`)
    }
}