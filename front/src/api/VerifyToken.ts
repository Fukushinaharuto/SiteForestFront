import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export interface VerifyTokenResponse {
    tokenExists: boolean;
}

export function VerifyToken() {
    const router = useRouter();

    async function useVerifyToken(): Promise<VerifyTokenResponse | undefined> {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/verifyToken`;
        const Token = Cookies.get("AuthToken");

        if (!Token) {
            router.push("/login");
            return;
        }

        try {
            const response = await axios.get(api_url, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error)
            Cookies.remove('AuthToken', { path: '/' });
            router.push("/login");
            return;
        }
    }

    return { useVerifyToken };
}
