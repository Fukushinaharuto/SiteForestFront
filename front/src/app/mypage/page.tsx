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

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleApi = async() => {
        try {
            const response = await Project({ name, description, Token });
            router.push(`/mypage/${response.project.name}/home`)
        } catch (error:any) {
            if (error?.status === 422 && error.data?.errors) {
                setErrors(error.data.errors);
            } else {
                setErrors({ general: ['予期しないエラーが発生しました。'] })
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
            {errors.name && 
                <p className="text-error">
                    {errors.name[0]}
                </p>
            }
            
            <input
                type="text"
                className="border border-text"
                placeholder="説明"
                onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
                <p className="text-error">{errors.description[0]}</p>
            )}
            <button 
                onClick={handleApi}
            >
                作成
            </button>
            {errors.general &&
                errors.general.map((err, idx) => (
                    <p key={idx} className="text-error">
                        {err}
                    </p>
                ))
            }
        </div>
    )
}
