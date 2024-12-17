interface RightSideProps {
    selectedItem?: {
        id: string;
        color: string;
        size: number;
    };
    onPropertyChange: (property: 'color' | 'size', value: string | number) => void;
}

export function RightSide({ selectedItem, onPropertyChange }:RightSideProps){

    const  handleSizeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(e.target.value);
        const adjustedValue = Math.round(inputValue / 5) * 5
        onPropertyChange('size', adjustedValue)
    }
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
                            step={5}
                            min={5} 
                            onChange={(handleSizeChange)}
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
