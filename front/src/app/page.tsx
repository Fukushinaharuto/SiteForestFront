"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const Top = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const laravelAPI = async() => {
            try {
                const response = await axios.get<{ message: string }>(`${process.env.NEXT_PUBLIC_API_URL}/hello`);
                setMessage(response.data.message);
            } catch (error) {
                console.error("API呼び出しエラー:", error);
                setMessage("エラーが発生しました");
            }
        }
        laravelAPI();
    }, []);

    return (
        <div>
            {message}
        </div>
    )
}

export default Top;