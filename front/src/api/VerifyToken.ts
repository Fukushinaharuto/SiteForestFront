import axios from "axios";
import Cookies from "js-cookie";

export interface VerifyTokenResponse {
    tokenExists: boolean;
}

export function VerifyToken() {
    async function useVerifyToken(): Promise<VerifyTokenResponse | undefined> {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/verifyToken`;
        const Token = Cookies.get("AuthToken");

        

        try {
            const response = await axios.get(api_url, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });
            return response.data;
        } catch {
            Cookies.remove('AuthToken', { path: '/' });
            return;
        }
    }
    return { useVerifyToken };
}
