import { ProjectShowResponse } from "@/api/Project"
import { CharacterLimit } from "@/components/mypage/CharacterLimit";
import Link from "next/link";

export interface ProjectValueProps {
    value: ProjectShowResponse;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    isSelected: boolean;
    onClick: () => void;
}

export function ProjectValue({ value, isEditOpen, isDeleteOpen, isSelected, onClick}:ProjectValueProps) {

    return(
        
        <div
            className={`relative ${(isEditOpen || isDeleteOpen) ? "z-50" : ""}`}
        >
            {!(isEditOpen || isDeleteOpen) ?
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
                <div onClick={onClick}>
                    <div
                        className={`${isSelected ? "border-4 border-sub" : "border-1 border-text" } p-4 rounded-lg shadow-form sm:h-96 h-52 bg-white cursor-pointer`}
                    >
                        <h2 className="sm:text-2xl text-lg font-bold">
                            {CharacterLimit(value.name, 20)}
                        </h2>
                        <p className="text-textLight break-words overflow-hidden">
                            {CharacterLimit(value.description, 300)}
                        </p>
                    </div>
                </div>
            }

            
            
        </div>
    )
}