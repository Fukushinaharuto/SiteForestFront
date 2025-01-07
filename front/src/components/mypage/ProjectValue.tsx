import { ProjectIndexResponse } from "@/api/Project"
import { CharacterLimit } from "@/components/mypage/CharacterLimit";
import Link from "next/link";

export interface ProjectValueProps {
    value: ProjectIndexResponse;
}

export function ProjectValue({value}:ProjectValueProps) {
    return(
        <div>
            <Link href={`/mypage/${value.name}/home`} prefetch>
            <div className="p-4 border border-sub rounded-lg shadow-md h-40">
                <h2 className="text-2xl font-bold">{value.name}</h2>
                <p className="text-textLight break-words overflow-hidden">
                    {CharacterLimit(value.description, 300)}
                </p>
            </div>
            </Link>
        </div>
    )
}