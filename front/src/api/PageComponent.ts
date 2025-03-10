import axios from "axios";
import Cookies from "js-cookie";
import { PolygonItems, SquareItems, CircleItems, TextItems, HyperLinkItems  } from "@/components/mypage/create/ItemsCase"

export interface PageComponentProps {
    name: string;
    page: string;
    droppedItems: (PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[];
}

export interface PageComponentIndexProps {
    name: string;
    page: string;
}

export interface PageComponentDestroyProps {
    id: number;
}

export async function PageComponent({ name, page, droppedItems }:PageComponentProps ) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/pageComponent`;
    const Token = Cookies.get('AuthToken');
    try {
        const response = await axios.post(
            api_url,
            { 
                name,
                page,
                droppedItems,
            },
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error)
        return { success: false, error: '保存に失敗しました。' };
    }
}

export async function PageComponentIndex({ name, page }: PageComponentIndexProps) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/pageComponent`;
    const Token = Cookies.get('AuthToken');
    try {
        const response = await axios.get(api_url, {
            params: { name, page },
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        const convertedItems = response.data.droppedItems.map((item: any) => ({
            ...item,
            x: parseFloat(item.x),
            y: parseFloat(item.y),
            width: parseFloat(item.width),
            height: parseFloat(item.height),
            angle: item.angle !== undefined ? parseFloat(item.angle) : undefined,
            borderRadius: item.borderRadius !== undefined ? parseFloat(item.borderRadius) : undefined,
            opacity: parseFloat(item.opacity),
            
        }));
        return { ...response.data, droppedItems: convertedItems };
    } catch {
        return null;
    }
}

export async function PageComponentDestroy({ id }: PageComponentDestroyProps) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/pageComponent/${id}`;
    const Token = Cookies.get('AuthToken');
    try {
        const response = await axios.delete(api_url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return;
    } catch {
        return;
    }
}