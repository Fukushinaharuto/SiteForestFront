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

export type DroppedItem = {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
    angle?: number | string;
    borderRadius?: number | string;
    opacity?: number | string;
} & (PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems);


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
        const convertedItems: DroppedItem[] = response.data.droppedItems.map((item: DroppedItem) => ({
            ...item,
            x: typeof item.x === "string" ? parseFloat(item.x) : item.x,
            y: typeof item.y === "string" ? parseFloat(item.y) : item.y,
            width: typeof item.width === "string" ? parseFloat(item.width) : item.width,
            height: typeof item.height === "string" ? parseFloat(item.height) : item.height,
            angle: typeof item.angle === "string" ? parseFloat(item.angle) : item.angle,
            borderRadius: typeof item.borderRadius === "string" ? parseFloat(item.borderRadius) : item.borderRadius,
            opacity: typeof item.opacity === "string" ? parseFloat(item.opacity) : item.opacity,
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