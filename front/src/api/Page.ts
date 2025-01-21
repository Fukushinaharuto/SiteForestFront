import axios from "axios";
import Cookies from "js-cookie";

export interface PageProps {
    name: string;
    page: string;
}

export interface  UpdateItemPosition {
    index:number;
    x: number,
    y: number,
    size?: { width: number; height: number }
}

export async function Page({ name, page }:PageProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/page`;
    const Token = Cookies.get('AuthToken');
    try{
        const response = await axios.post(api_url, {
                name,
                page,
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