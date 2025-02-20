import axios from "axios";
import Cookies from "js-cookie";

export interface ProjectProps {
    name: string;
    description?: string;
}

export interface ProjectShowProps {
    setCheckToken: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectShowResponse {
    id: number;
    name: string;
    description:string;
}

export interface ProjectUpdateProps {
    id: number;
    name: string;
    description: string;
}

export interface ProjectDestroyProps {
    setIds: React.Dispatch<React.SetStateAction<IdsProps[]>>;
    idArray: number[];
}

export interface ProjectDestroyResponse { 
    message: string;
}

export interface IdsProps { 
    id: number;
    name: string;
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
export async function ProjectIndex() {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const Token = Cookies.get('AuthToken');
    try{
        const response = await axios.get(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        return response.data;
    } catch {
        return null;
    }
}

export async function ProjectShow({ setCheckToken }: ProjectShowProps): Promise<ProjectShowResponse[] | null> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/show`;
    const Token = Cookies.get('AuthToken');
    try{
        const response = await axios.get<ProjectShowResponse[]>(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        return response.data;
    } catch {
        setCheckToken(false)
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

export async function ProjectDestroy({ setIds, idArray }: ProjectDestroyProps): Promise<ProjectDestroyResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/project/destroy`;
    const Token = Cookies.get('AuthToken');

    try {
        const response = await axios.delete(
            api_url,
            {
                data: {idArray},
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        setIds([])
        return response.data;
    } catch {
        return {message:"削除に失敗しました。"};
    }
}
