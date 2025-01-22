import { useState } from "react";
import { ProjectIndexResponse } from "@/api/Project";
import { ProjectUpdate } from "@/api/Project"; 
import { ErrorProps } from "@/components/mypage/ProjectStore";

interface ProjectEditProps {
    project: ProjectIndexResponse;
    closeModal: () => void;
}

export function ProjectEdit({ project, closeModal }: ProjectEditProps) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const updateLocalStorage = (oldName: string, newName: string) => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(`${oldName}_`)) {
                const newKey = key.replace(`${oldName}_`, `${newName}_`);
                const value = localStorage.getItem(key);
                if (value) {
                    localStorage.setItem(newKey, value);
                    localStorage.removeItem(key);
                }
            }
        });
    };

    const handleSave = async () => {
        try {
            await ProjectUpdate({ id: project.id, name, description });
            if (name !== project.name) {
                updateLocalStorage(project.name, name);
            }
            closeModal();
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
                <h2 className="text-lg font-bold mb-4">プロジェクトの編集</h2>
                {errors.general &&
                    errors.general.map((err, idx) => (
                        <p key={idx} className="text-error text-sm mt-2">
                            {err}
                        </p>
                    ))
                }
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                    <p className="text-error text-sm mb-2">
                        {errors.name[0]}
                    </p>
                )}
                <textarea
                    className="w-full border p-2 rounded mb-2 h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                        onClick={handleSave}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}
