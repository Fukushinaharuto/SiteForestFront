import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";



export interface PageNameResponse {
    name: string[];
}

export function PageName() {
    const router = useRouter();

    const checkProject = async () => {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/page/check`;
        const Token = Cookies.get('AuthToken');
        try {
        const response = await axios.get<PageNameResponse>(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
            return response.data;
        } catch {
            router.push('/mypage');
            return null;
        }
    };

    return checkProject;
}