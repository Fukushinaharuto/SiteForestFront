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

export interface PageIndexProps {
    name: string;
}

export async function Page({ name, page }:PageProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/page`;
    const Token = Cookies.get('AuthToken');
    try {
        const response = await axios.post(
            api_url,
            { 
                name,
                page,
            },
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, error: error.response?.data };
        }
        return { success: false, error: '予期しないエラーが発生しました。' };
    }
}

export async function PageIndex({name}:PageIndexProps){
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/page`;
    const Token = Cookies.get('AuthToken');
    try {
        const response = await axios.get(api_url, {
            params: { name },
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch {
        return;
    }
}