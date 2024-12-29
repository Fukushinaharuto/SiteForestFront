"use client"

import { useState, useEffect } from "react"
import { Project } from "@/api/Project"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    useEffect(() => {
        if(!Token){
            router.push('/login');
        }
    },[]);

    const [title, setTitle] = useState('');
    const handleApi = async() => {
        const response = await Project({ title, Token });
    }
    return(
        <div>
            <input 
                type="text"
                className="border border-text"
                placeholder="タイトル名"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleApi}>
                作成
            </button>

        </div>
    )
}
