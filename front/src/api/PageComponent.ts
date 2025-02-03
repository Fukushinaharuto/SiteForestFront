import axios from "axios";
import Cookies from "js-cookie";
import { PolygonItems, SquareItems, CircleItems, ItemType, ItemsCase, TextItems, HyperLinkItems  } from "@/components/mypage/create/ItemsCase"

export interface PageComponentProps {
    name: string;
    page: string;
    droppedItems: (PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[];
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
        console.log(name, page, droppedItems)
        console.log(error)
        return { success: false, error: '保存に失敗しました。' };
    }
}