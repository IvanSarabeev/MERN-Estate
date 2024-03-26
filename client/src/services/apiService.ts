import { UserData } from 'types/user';

const postMethod = 'POST';

const url: string = "/api/auth/signup";

export const registerUser = async (formData: UserData) => {
    try {
        const response = await fetch(url, {
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