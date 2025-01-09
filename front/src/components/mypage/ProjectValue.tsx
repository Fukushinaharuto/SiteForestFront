import { ProjectIndexResponse } from "@/api/Project"
import { CharacterLimit } from "@/components/mypage/CharacterLimit";
import Link from "next/link";

export interface ProjectValueProps {
    value: ProjectIndexResponse;
    isEditOpen: boolean;
    onClick: () => void;
}

export function ProjectValue({ value, isEditOpen, onClick}:ProjectValueProps) {
    return(
        <div
            className={`relative ${isEditOpen ? "z-50" : ""}`}
            onClick={onClick}
        >
            {!isEditOpen ?
                <Link href={`/mypage/${value.name}/home`} prefetch>
                    <div
                        className="p-4 rounded-lg shadow-form sm:h-96 h-52 cursor-pointer"
                    >
                        <h2 className="sm:text-2xl text-lg font-bold">
                            {CharacterLimit(value.name, 20)}
                        </h2>
                        <p className="text-textLight break-words overflow-hidden">
                            {CharacterLimit(value.description, 300)}
                        </p>
                    </div>
                </Link>
            :
                <div
                    className="p-4 border-1 rounded-lg shadow-form sm:h-96 h-52 bg-white border-text cursor-pointer"
                >
                    <h2 className="sm:text-2xl text-lg font-bold">
                        {CharacterLimit(value.name, 20)}
                    </h2>
                    <p className="text-textLight break-words overflow-hidden">
                        {CharacterLimit(value.description, 300)}
                    </p>
                </div>
            }
            
        </div>
    )
}