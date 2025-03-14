"use client";

import { useState } from "react";
import { Project } from "@/api/Project";
import { useRouter } from "next/navigation";

interface ProjectStoreProps {
    closeModal: () => void;
}

export interface ErrorProps {
    status: number;
    data: {
        errors?: {
            [key: string]: string[];
        };
    };
}

export function ProjectStore({ closeModal }: ProjectStoreProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleApi = async () => {
        try {
            const response = await Project({ name, description });
            router.push(`/mypage/${response.project.name}/home`);
        } catch (error) {
            const apiError = error as ErrorProps;
            if (apiError?.status === 422 && apiError.data?.errors) {
                setErrors(apiError.data.errors);
            } else {
                setErrors({ general: ["予期しないエラーが発生しました。"] });
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
            />
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">プロジェクトの作成</h2>
                {errors.general &&
                    errors.general.map((err, idx) => (
                        <p key={idx} className="text-error text-sm mt-2">
                            {err}
                        </p>
                    ))
                }
                <input
                    type="text"
                    className="w-full border border-baseC p-2 rounded mb-2"
                    placeholder="タイトル名"
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                />
                {errors.name && (
                    <p className="text-error text-sm mb-2">
                        {errors.name[0]}
                    </p>
                )}
                <input
                    type="text"
                    className="w-full border border-baseC p-2 rounded mb-2"
                    placeholder="説明"
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1000}
                />
                {errors.description && (
                    <p className="text-error text-sm mb-2">
                        {errors.description[0]}
                    </p>
                )}
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-baseC px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        キャンセル
                    </button>
                    <button
                        className="bg-accent text-white px-4 py-2 rounded"
                        onClick={handleApi}
                    >
                        作成
                    </button>
                </div>
            </div>
        </div>
    );
}
