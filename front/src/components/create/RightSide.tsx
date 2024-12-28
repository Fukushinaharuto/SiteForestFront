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
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>縦幅</label>
                        <input
                            type="number"
                            value={selectedItem.height}
                            onChange={(e) => onPropertyChange("height", Number(e.target.value))}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>角度</label>
                        <input
                            type="number"
                            value={selectedItem.angle}
                            onChange={(e) => onPropertyChange("angle", Number(e.target.value))}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>透明度</label>
                        <input
                            type="number"
                            value={selectedItem.opacity}
                            onChange={(e) => onPropertyChange("opacity", Number(e.target.value))}
                            className="text-text"
                        />
                    </div>
                    <div>
                        <label>枠</label>
                        <input
                            type="number"
                            value={selectedItem.border}
                            onChange={(e) => onPropertyChange("border", Number(e.target.value))}
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
                                onChange={(e) => onPropertyChange("radiusTopLeft", Number(e.target.value))}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusTopRight}
                                onChange={(e) => onPropertyChange("radiusTopRight", Number(e.target.value))}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusBottomLeft}
                                onChange={(e) => onPropertyChange("radiusBottomLeft", Number(e.target.value))}
                                className="text-text"
                            />
                            <input
                                type="number"
                                value={selectedItem.radiusBottomRight}
                                onChange={(e) => onPropertyChange("radiusBottomRight", Number(e.target.value))}
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
