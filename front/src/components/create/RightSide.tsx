interface RightSideProps {
    selectedItem?: {
        id: string;
        color: string;
        height: number;
        width: number;
    };
    onPropertyChange: (property: 'color' | 'height' | 'width', value: string | number) => void;
}

export function RightSide({ selectedItem, onPropertyChange }: RightSideProps) {
    return (
        <div className="w-1/6 bg-gray-800 text-white p-4 fixed top-0 right-0 h-screen z-10">
            <h2 className="text-lg font-bold">右サイドバー</h2>
            {selectedItem ? (
                <div className="mt-4 space-y-4">
                    <div>
                        <label>カラー</label>
                        <input
                            type="color"
                            value={selectedItem.color}
                            onChange={(e) => onPropertyChange("color", e.target.value)}
                        />
                    </div>
                    <div>
                        <label>横幅</label>
                        <input
                            type="number"
                            value={selectedItem.width}
                            onChange={(e) => onPropertyChange("width", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>縦幅</label>
                        <input
                            type="number"
                            value={selectedItem.height}
                            onChange={(e) => onPropertyChange("height", Number(e.target.value))}
                        />
                    </div>
                </div>
            ) : (
                <p>アイテムを選択してください</p>
            )}
        </div>
    );
}
