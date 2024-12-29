import axios from "axios";

export interface ProjectProps {
    title: string;
    Token: string;
}

export async function Project({ title, Token }:ProjectProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    try{
        const response = await axios.post(api_url, {
                title,
            },
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                }
            }
        );
        return response
        
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
}