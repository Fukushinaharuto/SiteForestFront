import axios from "axios";

export interface ProjectProps {
    name: string;
    description?: string;
    Token: string | undefined;
}

export async function Project({ name, description, Token }:ProjectProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    try{
        const response = await axios.post(api_url, {
                name,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        return response.data;
        
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
}