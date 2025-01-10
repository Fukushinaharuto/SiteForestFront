
import { ProjectDestroy } from "@/api/Project"; 
import { IdsProps } from "@/api/Project";


interface ProjectDeleteProps {
    ids: IdsProps[];
    closeModal: () => void;
}

export function ProjectDelete({ ids, closeModal }: ProjectDeleteProps) {
    const handleDelete = async () => {
        const response = await ProjectDestroy({ids});
        console.log(response.message)
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
            />
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">プロジェクトの削除</h2>
                <div>
                {ids.length > 0 && (
                    ids.map((id, index) => (
                        <div key={index}>{id.name}</div>
                    ))
                )}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-baseC px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        キャンセル
                    </button>
                    <button
                        className="bg-accent text-white px-4 py-2 rounded"
                        onClick={handleDelete}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}
