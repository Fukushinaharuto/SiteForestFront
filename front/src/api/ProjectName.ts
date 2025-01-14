import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";



export interface ProjectNameResponse {
    name: string[];
}

export function ProjectName() {
    const router = useRouter();

    const checkProject = async () => {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/check`;
        const Token = Cookies.get('AuthToken');
        try {
        const response = await axios.get<ProjectNameResponse>(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
            return response.data;
        } catch (error) {
            router.push('/mypage');
            return null;
        }
    };

    return checkProject;
}
