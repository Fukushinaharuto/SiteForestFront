import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export interface ProjectNameProps {
    name: string;
}

export interface ProjectNameResponse {
    name: string[];
    page: string[];
}

export function ProjectName({ name }:ProjectNameProps) {
    const router = useRouter();

    const checkProject = async () => {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/check`;
        const Token = Cookies.get('AuthToken');
        try {
            const response = await axios.post<ProjectNameResponse>(
                api_url,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error)
            router.push('/mypage');
            return null;
        }
    };

    return checkProject;
}
