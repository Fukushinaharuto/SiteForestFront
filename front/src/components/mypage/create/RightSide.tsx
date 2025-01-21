import { useState } from "react";
import { Page } from "@/api/Page"
import { useParams } from "next/navigation";

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
        textColor?: string;
        size?: number;
        textAlign?: 'left' | 'center' | 'right';
        verticalAlign?: 'top' | 'middle' | 'bottom';
    };
    onPropertyChange: (property: 'color' | 'height' | 'width' | 'angle' | 'opacity' | 'border' | 'borderColor' | 'textColor' | 'size' | 'textAlign' | 'verticalAlign', value: string | number) => void;
    setIsRightSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RightSide({ selectedItem, onPropertyChange, setIsRightSideOpen }: RightSideProps) {
    const [pageOpen, setPageOpen] = useState(true);
    const [page, setPage] = useState("");
    const { name: encodedName } = useParams();
    const name = decodeURIComponent(encodedName as string);

    const handleNumberChange = (property: string, value: string, min: number, max: number) => {
        const numValue = Number(value);
        if (value === '' || (numValue >= min && numValue <= max)) {
            onPropertyChange(property as keyof typeof selectedItem, numValue);
        }
    };

    const pageAdd = async() => {
        const response = await Page({ name, page  });
    }


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
                        className="mt-4 text-text"
                        onChange={(e) => setPage(e.target.value)} 
                        value={page}    
                    />
                    <div className="flex justify-end">
                        <button 
                            className="bg-sub p-1 text-sm w-[40%] mt-2 rounded"
                            onClick={pageAdd}
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

            {selectedItem && (
                <div>
                    <h2 className="text-xl font-bold mt-6 mb-4">プロパティ設定</h2>
                    {selectedItem.type === 'hyperLink' &&
                        <div>
                            <h3 className="text-lg font-bold mt-6 mb-4 text-white">リンク</h3>
                            <div className="flex flex-col items-center text-text">
                                <div className="space-y-4 w-full max-w-xs">
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">カラー</label>
                                        <input
                                            type="color"
                                            value={selectedItem.textColor}
                                            onChange={(e) => onPropertyChange("textColor", e.target.value)}
                                            className="ml-5 w-[80%] mt-4"
                                        />
                                    </div>                  
                                </div>
                            </div>
                        </div>
                    }
                    {(selectedItem.type === 'text' || selectedItem.type === 'hyperLink') &&
                        <div>
                            <h3 className="text-lg font-bold mt-6 mb-4 text-white">テキスト</h3>
                            <div className="flex flex-col items-center text-text">
                                <div className="space-y-4 w-full max-w-xs">
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">カラー</label>
                                        <input
                                            type="color"
                                            value={selectedItem.textColor}
                                            onChange={(e) => onPropertyChange("textColor", e.target.value)}
                                            className="ml-5 w-[80%] mt-4"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">サイズ</label>
                                        <input
                                            type="number"
                                            value={selectedItem.size}
                                            onChange={(e) => onPropertyChange("size", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">位置</label>
                                        <select
                                            value={selectedItem.textAlign}
                                            onChange={(e) => onPropertyChange("textAlign", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        >
                                            <option value="left">左</option>
                                            <option value="center">中央</option>
                                            <option value="right">右</option>
                                        </select>
                                        <select
                                            value={selectedItem.verticalAlign}
                                            onChange={(e) => onPropertyChange("verticalAlign", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        >
                                            <option value="top">上</option>
                                            <option value="middle">中央</option>
                                            <option value="bottom">下</option>
                                        </select>
        
                                    </div>                         
                                </div>
                            </div>
                        </div>
                    }
                    <h3 className="text-lg font-bold mt-6 mb-4">背景</h3>
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
            )}
        </div>
    );
}
