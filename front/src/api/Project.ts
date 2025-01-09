import axios from "axios";
import Cookies from "js-cookie";

export interface ProjectProps {
    name: string;
    description?: string;
}


export interface ProjectIndexResponse {
    id: number;
    name: string;
    description:string;
}

export interface ProjectUpdateProps {
    id: number;
    name: string;
    description: string;
}

export interface ProjectDestroyResponse { 
    message: string;
}
export async function Project({ name, description }:ProjectProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const Token = Cookies.get('AuthToken');
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

export async function ProjectIndex(): Promise<ProjectIndexResponse[] | null> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const Token = Cookies.get('AuthToken');
    try{
        const response = await axios.get<ProjectIndexResponse[]>(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function ProjectUpdate({ id, name, description }: ProjectUpdateProps) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`;
    const Token = Cookies.get('AuthToken');

    try {
        const response = await axios.patch(api_url, {
            name,
            description,
        }, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response;
        }
        throw error;
    }
}

export async function ProjectDestroy({ ids }: { ids: number[] }): Promise<ProjectDestroyResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/destroy`;
    const Token = Cookies.get('AuthToken');

    try {
        await axios.post(
            api_url,
            { ids },
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        return {message: "削除に成功しました。"};
    } catch (error) {
        return {message:"削除に失敗しました。"};
    }
}
