import { useState } from "react";

interface RightSideProps {
    selectedItem?: {
        id: string;
        type: string;
        color?: string;
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
    onPropertyChange: (property: 'color' | 'height' | 'width' | 'angle' | 'opacity' | 'border' | 'borderColor', value: string | number) => void;
    setIsRightSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RightSide({ selectedItem, onPropertyChange, setIsRightSideOpen }: RightSideProps) {
    const [pageOpen, setPageOpen] = useState(true);
    const handleNumberChange = (property: string, value: string, min: number, max: number) => {
        const numValue = Number(value);
        if (value === '' || (numValue >= min && numValue <= max)) {
            onPropertyChange(property as keyof typeof selectedItem, numValue);
        }
    };


    return (
        <div className="w-[200px] bg-gray-800 text-white p-4 fixed top-0 right-0 h-screen overflow-auto z-10">
            <button onClick={() => setIsRightSideOpen(false)}>閉じる</button>
            <h2 
                className="text-xl font-bold"
                onClick={() => setPageOpen(!pageOpen)}
            >
                ページ設定
            </h2>
            {pageOpen &&
                <div className="flex flex-col">
                    <label htmlFor="text-lg mt-4">新しいページ</label>
                    <input 
                        type="text"
                        className="mt-4"
                    />
                    <div className="flex justify-end">
                        <button 
                            className="bg-sub p-1 text-sm w-[40%] mt-2 rounded"
                        >
                            作成する
                        </button>
                    </div>
                    <label className="text-lg mt-4">ページ遷移</label>
                    <input
                        type="text"
                        onChange={(e) => onPropertyChange("color", e.target.value)}
                        className="mt-4"
                    />
                </div>
            }

            {selectedItem ? (
                <div>
                    <h2 className="text-xl font-bold mt-6 mb-4">プロパティ設定</h2>
                    <div className="flex flex-col items-center">
                        
                        <div className="space-y-4 w-full max-w-xs">
                            <div className="flex flex-col">
                                <label className="text-lg">カラー</label>
                                <input
                                    type="color"
                                    value={selectedItem.color}
                                    onChange={(e) => onPropertyChange("color", e.target.value)}
                                    className="ml-5 w-[80%] mt-4"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>横幅</label>
                                <input
                                    type="number"
                                    value={selectedItem.width}
                                    onChange={(e) => handleNumberChange("width", e.target.value, 0, 1980)}
                                    className="text-text w-[80%] ml-5 text-right mt-4"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>縦幅</label>
                                <input
                                    type="number"
                                    value={selectedItem.height}
                                    onChange={(e) => handleNumberChange("height", e.target.value, 0, 1980)}
                                    className="text-text w-[80%] ml-5 text-right mt-4"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>角度</label>
                                <input
                                    type="number"
                                    value={selectedItem.angle}
                                    onChange={(e) => handleNumberChange("angle", e.target.value, 0, 360)}
                                    className="text-text w-[80%] ml-5 text-right mt-4"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>透明度</label>
                                <input
                                    type="number"
                                    value={selectedItem.opacity}
                                    onChange={(e) => handleNumberChange("opacity", e.target.value, 0, 100)}
                                    className="text-text w-[80%] ml-5 text-right mt-4"
                                    min={0}
                                    max={100}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>枠</label>
                                <input
                                    type="number"
                                    value={selectedItem.border}
                                    onChange={(e) => handleNumberChange("border", e.target.value, 0, 20)}
                                    className="text-text w-[80%] ml-5 text-right mt-4"
                                />
                                <input
                                    type="color"
                                    value={selectedItem.borderColor}
                                    onChange={(e) => onPropertyChange("borderColor", e.target.value)}
                                    className="text-text w-[80%] ml-5 text-right mt-2"
                                />
                            </div>                            
                        </div>
                    </div>
                </div>
            ) : (
                <p>アイテムを選択してください</p>
            )}
        </div>
    );
}
