interface RightSideProps {
    selectedItem?: {
        id: string;
        type: string;
        color: string;
        height: number;
        width: number;
        opacity: number;
        border: number;
        borderColor: string;
        angle?: number;
        radiusTopLeft?: number;
        radiusTopRight?: number;
        radiusBottomLeft?: number;
        radiusBottomRight?: number;
    };
    onPropertyChange: (property: 'color' | 'height' | 'width' | 'angle' | 'opacity' | 'border' | 'borderColor' | 'radiusTopLeft' | 'radiusTopRight' | 'radiusBottomLeft' | 'radiusBottomRight', value: string | number) => void;
}

export function RightSide({ selectedItem, onPropertyChange }: RightSideProps) {

    const handleNumberChange = (property: string, value: string, min: number, max: number) => {
        const numValue = Number(value);
        if (value === '' || (numValue >= min && numValue <= max)) {
            onPropertyChange(property as keyof typeof selectedItem, numValue);
        }
    };


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
                            onChange={(e) => handleNumberChange("width", e.target.value, 0, 1980)}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>縦幅</label>
                        <input
                            type="number"
                            value={selectedItem.height}
                            onChange={(e) => handleNumberChange("height", e.target.value, 0, 1980)}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>角度</label>
                        <input
                            type="number"
                            value={selectedItem.angle}
                            onChange={(e) => handleNumberChange("angle", e.target.value, 0, 360)}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>透明度</label>
                        <input
                            type="number"
                            value={selectedItem.opacity}
                            onChange={(e) => handleNumberChange("opacity", e.target.value, 0, 100)}
                            className="text-text"
                            min={0}
                            max={100}
                        />
                    </div>
                    <div>
                        <label>枠</label>
                        <input
                            type="number"
                            value={selectedItem.border}
                            onChange={(e) => handleNumberChange("border", e.target.value, 0, 20)}
                            className="text-text"
                        />
                        <input
                            type="color"
                            value={selectedItem.borderColor}
                            onChange={(e) => onPropertyChange("borderColor", e.target.value)}
                            className="text-text"
                        />
                    </div>
                    {selectedItem.type === "square" && (
                        <div>
                            <label>角の半径</label>
                            <input
                                type="number"
                                value={selectedItem.radiusTopLeft}
                                onChange={(e) => handleNumberChange("radiusTopLeft", e.target.value, 0, 10000)}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusTopRight}
                                onChange={(e) => handleNumberChange("radiusTopRight", e.target.value, 0, 1000)}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusBottomLeft}
                                onChange={(e) => handleNumberChange("radiusBottomLeft", e.target.value, 0, 1000)}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusBottomRight}
                                onChange={(e) => handleNumberChange("radiusBottomRight", e.target.value, 0, 1000)}
                                className="text-text"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <p>アイテムを選択してください</p>
            )}
        </div>
    );
}
