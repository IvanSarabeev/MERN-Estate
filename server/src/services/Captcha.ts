import axios from "axios";

export const verifyCaptcha = async (token: string) => {
    try {
        const secret = process.env.CAPTCHA_SECRET ?? '';
        
        const response = await axios.post(
            `https://hcaptcha.com/siteverify`, new URLSearchParams({
                secret: secret,
                response: token
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data.success;
    } catch (error) {
        console.error('Error verifying CAPTCHA:', error);
        return false;
    }
};