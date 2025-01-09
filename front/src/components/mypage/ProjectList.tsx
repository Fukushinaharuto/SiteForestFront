"use client"
import { ProjectIndex, ProjectIndexResponse } from "@/api/Project";
import { useEffect, useState } from "react";
import { ProjectValue } from "@/components/mypage/ProjectValue";
import Image from "next/image";
import { ProjectStore } from "@/components/mypage/ProjectStore";

interface ProjectListProps{
    isEditOpen: boolean;
    setSelectedProject: (project: ProjectIndexResponse | null) => void;
}

export function ProjectList({ isEditOpen, setSelectedProject }:ProjectListProps) {
    const [isStoreOpen, setIsStoreOpen] = useState(false);
    const [projectList, setProjectList] = useState<ProjectIndexResponse[]>([]);

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
    }, [{ProjectList}])
    

    return(
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
            <div 
                className="p-4 rounded-lg shadow-form sm:h-96 h-52 cursor-pointer flex items-center justify-center"
                onClick={() => setIsStoreOpen(true)}
            >
                <Image
                    src="/add.svg"
                    alt="追加するアイコン"
                    width={100}
                    height={100}
                />
            </div>
                {projectList.length > 0 && (
                    projectList.map((project, index) => (
                        <ProjectValue
                            key={index}
                            value={project}
                            isEditOpen={isEditOpen}
                            onClick={() =>
                                isEditOpen && setSelectedProject(project)
                            }
                        />
                    ))
                )}
            </div>
            {isStoreOpen && (
                <ProjectStore
                    closeModal={() => setIsStoreOpen(false)}
                />
            )}
        </div>
    )
}