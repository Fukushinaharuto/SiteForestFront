"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectShowResponse, ProjectIndex } from "@/api/Project";
import { VerifyToken } from "@/api/VerifyToken";
import { CharacterLimit } from "@/components/mypage/CharacterLimit";

export default function Page() {
    const Token = Cookies.get("AuthToken");
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);
    const [projectList, setProjectList] = useState<ProjectShowResponse[]>([]);

    useEffect(() => {
        const Verify = async() => {
            const response = await VerifyToken();
            if (response) {
                setCheckToken(true)
            } else {
                Cookies.remove('AuthToken', { path: '/' });
                router.push("/login");
            }
        }
        Verify()
    }, [VerifyToken, Token, router]);

    useEffect(() => { 
        const List = async() => {
            const response = await ProjectIndex();
            if (response) {
                setProjectList(response.reverse());
            } else {
                setProjectList([])
            }
        }
        List();
    }, [{projectList}])

    

    if (!checkToken) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="circle-packman-1"></div>
            </div>
        );
    }

    return (
        <div className="relative max-w-6xl mx-auto px-4 space-y-12">
            <h1 className="text-text text-4xl mt-3">ホーム</h1>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                {projectList.length > 0 && (
                    projectList.map((project, index) => (
                        <Link href={`/home/${project.name}/home`} prefetch>
                            <div
                                className="p-4 rounded-lg shadow-form sm:h-96 h-52 cursor-pointer"
                            >
                                <h2 className="sm:text-2xl text-lg font-bold">
                                    {CharacterLimit(project.name, 20)}
                                </h2>
                                <p className="text-textLight break-words overflow-hidden">
                                    {CharacterLimit(project.description, 300)}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
