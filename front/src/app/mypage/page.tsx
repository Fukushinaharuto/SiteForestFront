"use client"

import { useState, useEffect } from "react"
import { Project } from "@/api/Project"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    useEffect(() => {
        if(!Token){
            router.push('/login');
        }
    },[]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleApi = async() => {
        try {
            const response = await Project({ name, description, Token });
            setMessage(`プロジェクト "${response.project.name}" が作成されました。`);
            setError(false);
        } catch (error) {
            setError(true);
            if (axios.isAxiosError(error) && error.response) {
                // AxiosError の場合
                const responseData = error.response.data;
                if (typeof responseData === 'string') {
                    setMessage(responseData);
                } else if (responseData && typeof responseData === 'object') {
                    // エラーメッセージがオブジェクトの場合（例：Laravel のバリデーションエラー）
                    setMessage(Object.values(responseData).flat().join(', '));
                } else {
                    setMessage('エラーが発生しました。');
                }
            } else {
                // その他のエラーの場合
                setMessage('予期せぬエラーが発生しました。');
            }
        }
    }
    return(
        <div>
            <input 
                type="text"
                className="border border-text"
                placeholder="タイトル名"
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text"
                className="border border-text"
                placeholder="説明"
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleApi}>
                作成
            </button>
            {message && (
                <p className={error ? "text-red-500" : "text-green-500"}>
                    {message}
                </p>
            )}

        </div>
    )
}
