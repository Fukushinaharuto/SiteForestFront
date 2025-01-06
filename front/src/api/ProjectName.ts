import axios from "axios";
import { useRouter } from "next/navigation";

export interface ProjectNameProps {
    Token: string | undefined;
}

export function ProjectName({Token}:ProjectNameProps) {
    const router = useRouter();

    const checkProject = async () => {
        const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/name`;
        try {
        const response = await axios.get(api_url, {
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
