import { ExpirationError, RuntimeError, TypeError } from "utils/customErrors";

const url = "/api/auth/verify-otp";

type VerifyOTPEmailProps = {
    email: string,
    otp: string,
}

export const verifyOtpEmail = async ({email, otp}: VerifyOTPEmailProps) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });

        if (!response.ok) {
            const errorData = await response.json();

            throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error occur, ${error}`);

        if (error instanceof TypeError) {
            // Handle TypeError
            return { success: false, message: 'Type error occurred.' };
        } else if (error instanceof RuntimeError) {
            // Handle RuntimeError
            return { success: false, message: 'Runtime error occurred.' };
        } else if (error instanceof ExpirationError) {
            // Handle ExpirationError
            return { success: false, message: 'OTP expired.' };
        } else {
            // Handle generic errors
            return { success: false, message: 'An unexpected error occurred.' };
        }

    }
};