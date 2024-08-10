import { UserSignUpData } from 'types/user';

const postMethod = 'POST';

const urlSignUp: string = "/api/auth/signup";

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

        return data;
    } catch (error) {
        throw new Error(`Error message occur: ${error}`);
    }
};