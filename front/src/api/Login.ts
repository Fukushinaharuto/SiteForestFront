import axios from "axios";

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export const LoginApi = async ({
    email,
    password,
}: LoginProps): Promise<LoginResponse> => {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

    try {
        const response = await axios.post<LoginResponse>(api_url, {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
};
