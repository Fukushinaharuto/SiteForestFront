import axios from "axios";
import { useRouter } from "next/navigation";

export interface ProjectNameProps {
    Token:string;
}

export async function Project({ Token }:ProjectNameProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const router = useRouter();
    try{
        const response = await axios.get(api_url, 
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        return response.data;
        
    }catch (error: any) {
        router.push('/mypage');
    }
}