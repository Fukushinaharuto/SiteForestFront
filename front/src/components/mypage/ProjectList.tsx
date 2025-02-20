"use client"
import { ProjectShow, ProjectShowResponse, IdsProps } from "@/api/Project";
import { useEffect, useState } from "react";
import { ProjectValue } from "@/components/mypage/ProjectValue";
import Image from "next/image";
import { ProjectStore } from "@/components/mypage/ProjectStore";

interface ProjectListProps {
    isEditOpen: boolean;
    setSelectedProject: (project: ProjectShowResponse | null) => void;
    isDeleteOpen:boolean;
    setIds: React.Dispatch<React.SetStateAction<IdsProps[]>>;
    setCheckToken: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectList({ isEditOpen, isDeleteOpen, setIds,  setSelectedProject, setCheckToken}:ProjectListProps) {
    const [isStoreOpen, setIsStoreOpen] = useState(false);
    const [projectList, setProjectList] = useState<ProjectShowResponse[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set());

    useEffect(() => { 
        const List = async() => {
            const response = await ProjectShow({ setCheckToken });
            if (response) {
                setProjectList(response.reverse());
            } else {
                setProjectList([])
            }
        }
        List();
    }, [{projectList}])
    
    const handleProjectClick = (project: ProjectShowResponse) => {
        if (isEditOpen) {
            setSelectedProject(project);
        } else if (isDeleteOpen) {
            setSelectedProjects(prev => {
                const newSet = new Set(prev);
                if (newSet.has(project.id)) {
                    newSet.delete(project.id);
                } else {
                    newSet.add(project.id);
                }
                return newSet;
            });

            setIds(prevIds => {
                if (!prevIds.some(item => item.id === project.id)) {
                    return [...prevIds, { id: project.id, name: project.name }];
                }
                return prevIds.filter(item => item.id !== project.id);
            });
        }
    }

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
                            isDeleteOpen={isDeleteOpen}
                            isSelected={selectedProjects.has(project.id)}
                            onClick={() => handleProjectClick(project)}
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