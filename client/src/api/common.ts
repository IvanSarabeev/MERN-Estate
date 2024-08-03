import { ContactFormInterface } from "types/user";

const postMethod = 'POST';

const headerOptions = {
    'Content-Type': 'application/json',
};

const apiUrl = "/api/contact";

export const sendContactMessage = async (formData: ContactFormInterface) => {
    try {
        const response = await fetch(apiUrl, {
            method: postMethod,
            headers: headerOptions,
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Status cdoe: ${response.status}, status message: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(`Type error occur: ${error.message}`);
        } else if (error instanceof ReferenceError) {
            console.error(`Reference error occur: ${error.message}`);
        } else {
            throw new Error(`Error message: ${error}`)
        }
    }
};