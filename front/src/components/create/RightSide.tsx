"use client";

const RightSide = ({ selectedItem, onPropertyChange }) => {
    return (
        <div className="w-1/6 bg-gray-800 text-white p-4 fixed top-0 right-0 h-screen z-10">
            <h2 className="text-lg font-bold">右サイドバー</h2>
            {selectedItem ? (
                <div className="mt-4 space-y-4">
                    <div>
                        <label>カラー: </label>
                        <input
                            type="color"
                            value={selectedItem.color}
                            onChange={(e) => onPropertyChange("color", e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>サイズ: </label>
                        <input
                            type="number"
                            value={selectedItem.size}
                            onChange={(e) => onPropertyChange("size", parseInt(e.target.value))}
                            className="w-full p-1 text-black"
                        />
                    </div>
                </div>
            ) : (
                <p>アイテムを選択してください</p>
            )}
        </div>
    );
};

export default RightSide;
