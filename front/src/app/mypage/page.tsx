"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProjectList } from "@/components/mypage/ProjectList";
import { ProjectEdit } from "@/components/mypage/ProjectEdit";
import { ProjectIndexResponse } from "@/api/Project";
import Image from "next/image";
import { ProjectDelete } from "@/components/mypage/ProjectDelete";

export default function Page() {
    const Token = Cookies.get("AuthToken");
    const router = useRouter();

    useEffect(() => {
        if (!Token) {
            router.push("/login");
        }
    }, []);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectIndexResponse | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectProject = (id: number) => {
        setSelectedIds((prevIds) =>
            prevIds.includes(id) ? prevIds.filter((itemId) => itemId !== id) : [...prevIds, id]
        );
    };

    return (
        <div className="relative max-w-6xl mx-auto px-4">
            <h1 className="text-text text-4xl mt-3">プロジェクト一覧</h1>
            {isEditOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsEditOpen(false)}
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

                <button
                    className={`py-2 rounded ${
                        isDeleteOpen ? "bg-error text-white z-50 px-11" : "px-2 bg-sub text-white"
                    }`}
                    onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                >
                    <div className="flex">
                        {isDeleteOpen ? "削除" : "削除モード"}
                        {!isDeleteOpen && 
                            <Image
                                src="/delete.svg"
                                alt="削除するアイコン"
                                width={22}
                                height={22}
                                className="ml-1"
                            />
                        }
                    </div>
                    
                    
                </button>
            </div>
            <ProjectList
                isEditOpen={isEditOpen}
                setSelectedProject={setSelectedProject}
            />
            {selectedProject && (
                <ProjectEdit
                    project={selectedProject}
                    closeModal={() => setSelectedProject(null)}
                />
            )}
            {isDeleteOpen && (
                <ProjectDelete 
                    ids={selectedIds}
                    closeModal={() => }
                />
            )}
        </div>
    );
}
