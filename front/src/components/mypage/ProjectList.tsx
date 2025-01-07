"use client"
import { ProjectIndex, ProjectIndexResponse, ProjectIndexProps } from "@/api/Project";
import { useEffect, useState } from "react";
import { ProjectValue } from "@/components/mypage/ProjectValue";

export function ProjectList({Token}:ProjectIndexProps) {
    const [projectList, setProjectList] = useState<ProjectIndexResponse[]>([]);
    useEffect(() => { 
        const List = async() => {
            const response = await ProjectIndex({Token});
            console.log('Response:', response); 
            if (response) {
                console.log("Response:", response);
                setProjectList(response);
            } else {
                setProjectList([])
            }
        }
        List();
    }, [Token])

    return(
        <div>
            <h1>プロジェクト一覧</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectList.length > 0 ? (
                    projectList.map((project, index) => (
                        <ProjectValue 
                            key={index}
                            value={project}
                        />
                    ))
                ) : (
                    <p>プロジェクトがありません。</p>
                )}
            </div>
        </div>
    )
}