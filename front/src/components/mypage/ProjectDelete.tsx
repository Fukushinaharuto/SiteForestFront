
import { ProjectDestroy } from "@/api/Project"; 
import { IdsProps } from "@/api/Project";


interface ProjectDeleteProps {
    ids: IdsProps[];
    setIds: React.Dispatch<React.SetStateAction<IdsProps[]>>;
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectDelete({ ids, setIds, setIsDeleteModal, setIsDeleteOpen }: ProjectDeleteProps) {
    const handleDelete = async () => {
        const idArray = ids.map(item => item.id);
        await ProjectDestroy({ setIds, idArray});
        ids.forEach(project => {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(`${project.name}_`)) {
                    localStorage.removeItem(key);
                }
            });
        });
        setIsDeleteModal(false);
        setIsDeleteOpen(false);  
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsDeleteModal(false)}
            />
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">本当に削除してもよろしいですか</h2>
                <ul className="bg-baseC max-h-44 overflow-y-auto rounded-lg border border-error">
                    {ids.length > 0 && (
                        ids.map((id, index) => (
                            <li 
                                key={index}
                                className="py-2 px-4 border-b border-error last:border-0"
                            >
                                {id.name}
                            </li>
                        ))
                    )}
                </ul>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        className="bg-baseC px-4 py-2 rounded"
                        onClick={() => setIsDeleteModal(false)}
                    >
                        キャンセル
                    </button>
                    <button
                        className="bg-accent text-white px-4 py-2 rounded"
                        onClick={handleDelete}
                    >
                        削除する
                    </button>
                </div>
            </div>
        </div>
    );
}
