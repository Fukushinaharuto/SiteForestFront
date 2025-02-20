"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProjectList } from "@/components/mypage/ProjectList";
import { ProjectEdit } from "@/components/mypage/ProjectEdit";
import { ProjectShowResponse } from "@/api/Project";
import Image from "next/image";
import { ProjectDelete } from "@/components/mypage/ProjectDelete";
import { IdsProps } from "@/api/Project";
import { VerifyToken } from "@/api/VerifyToken";

export default function Page() {
    const Token = Cookies.get("AuthToken");
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);

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
    
    

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectShowResponse | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [ids, setIds] = useState<IdsProps[]>([]);

    const handleDelete = () => {
        setIsDeleteModal(!isDeleteModal);
    }


    if (!checkToken) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="circle-packman-1"></div>
            </div>
        );
    }

    return (
        <div className="relative max-w-6xl mx-auto px-4">
            <h1 className="text-text text-4xl mt-3">個人プロジェクト</h1>
            {isEditOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsEditOpen(false)}
                />
            )}
            {isDeleteOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsDeleteOpen(false)}
                />
            )}
            <div className="flex space-x-4 justify-end mb-2">
                <button
                    className={`py-2 rounded ${
                        isEditOpen ? "px-6 bg-error text-white z-50" : "px-2 bg-accent text-white"
                    }`}
                    onClick={() => setIsEditOpen(!isEditOpen)}
                >
                    <div className="flex">
                        {isEditOpen ? "キャンセル" : "編集モード"}
                        {!isEditOpen && 
                            <Image
                                src="/edit.svg"
                                alt="編集するアイコン"
                                width={22}
                                height={22}
                                className="ml-1"
                            />
                        }
                    </div>
                    
                    
                </button>
                {!isDeleteOpen ? 
                    <button
                        className={`py-2 rounded ${
                            isDeleteOpen ? "bg-error text-white z-50 px-11" : "px-2 bg-sub text-white"
                        }`}
                        onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                    >
                        <div className="flex">
                            <div>削除モード</div>
                                <Image
                                    src="/delete.svg"
                                    alt="削除するアイコン"
                                    width={22}
                                    height={22}
                                    className="ml-1"
                                />   
                        </div>
                    </button>
                :
                    <button
                        className={`py-2 rounded ${
                            isDeleteOpen ? "bg-error text-white z-50 px-11" : "px-2 bg-sub text-white"
                        }`}
                        onClick={() => handleDelete()}
                    >
                        削除   
                    </button>
                }
                
            </div>
            <ProjectList
                isEditOpen={isEditOpen}
                isDeleteOpen={isDeleteOpen}
                setIds={setIds}
                setSelectedProject={setSelectedProject}
                setCheckToken={setCheckToken}
            />
            {selectedProject && (
                <ProjectEdit
                    project={selectedProject}
                    closeModal={() => setSelectedProject(null)}
                />
            )}
            {isDeleteModal && (
                <ProjectDelete 
                    ids={ids}
                    setIds={setIds}
                    setIsDeleteModal={setIsDeleteModal}
                    setIsDeleteOpen={setIsDeleteOpen}
                />
            )}
        </div>
    );
}
