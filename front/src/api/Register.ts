import axios from "axios";

export interface RegisterProps {
    email: string;
    password: string;
    password_confirmation: string;
}

export const RegisterApi = async ({
    email,
    password,
    password_confirmation,
}: RegisterProps): Promise<void> => {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/register`;

    try {
        const response = await axios.post(api_url, {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
};
