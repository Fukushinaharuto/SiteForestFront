import axios from "axios";

export interface ProjectProps {
    name: string;
    description?: string;
    Token: string | undefined;
}

export interface ProjectIndexProps {
    Token: string | undefined;
}

export interface ProjectIndexResponse {
    name: string;
    description:string;
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
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
}

export async function ProjectIndex({Token}:ProjectIndexProps): Promise<ProjectIndexResponse[] | undefined> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    try{
        const response = await axios.get<ProjectIndexResponse[]>(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}