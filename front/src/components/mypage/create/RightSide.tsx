import { useState, useEffect } from "react";
import { Page, PageIndex } from "@/api/Page"
import { useParams, useRouter } from "next/navigation";
import Link from "next/link"

interface RightSideProps {
    selectedItem?: {
        id: number;
        type: string;
        color?: string;
        height: number;
        width: number;
        opacity: number;
        border: number;
        borderColor: string;
        angle?: number;
        zIndex: number;
        textColor?: string;
        size?: number;
        textAlign?: 'left' | 'center' | 'right';
        verticalAlign?: 'top' | 'middle' | 'bottom';
        isLink? : 'text' | 'no' | 'back'; 
        href?: string;
        children?: React.ReactNode;
    };
    onPropertyChange: (property: 'color' | 'height' | 'width' | 'angle' | 'zIndex' | 'opacity' | 'border' | 'borderColor' | 'textColor' | 'size' | 'textAlign' | 'verticalAlign' | 'isLink' | 'href' | 'children', value: string | number) => void;
    setIsRightSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSave:() => void;
    zIndexList: number[];
}

export function RightSide({ selectedItem, onPropertyChange, setIsRightSideOpen, handleSave, zIndexList }: RightSideProps) {
    const [pageOpen, setPageOpen] = useState(true);
    const [page, setPage] = useState("");
    const { name: encodedName, page: encodedPage } = useParams();
    const name = decodeURIComponent(encodedName as string);
    const pageName = decodeURIComponent(encodedPage as string);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(true);
    const [pages, setPages] = useState<string[]>([]);
    const [selectedPage, setSelectedPage] = useState("");
    const router = useRouter();

    const handleNumberChange = (property: string, value: string, min: number, max: number) => {
        const numValue = Number(value);
        if (value === '' || (numValue >= min && numValue <= max)) {
            onPropertyChange(property as keyof typeof selectedItem, numValue);
        }
    };

    const pageAdd = async () => {
        const response = await Page({ name, page });
        if (!response.success) {
            setError(response.error.message);
            setIsError(false);
        } else {
            setIsError(true);
            setPages((prevPages) => [...prevPages, page]);
            setSelectedPage(page);
        }
        return;
    };

    useEffect(() => {
        const PageList = async() => {
            const response = await PageIndex({name});
            setPages(response.pages || []);
        }
        PageList()
    }, [name, setSelectedPage]);

    const handlePageJump = () => {
        if (selectedPage) {
            router.push(`/mypage/${name}/${selectedPage}`);
        }
    };

    const handleZIndexChange = (action: "front" | "back" | "top" | "bottom") => {
        if (!selectedItem) return;
        let newZIndex = selectedItem.zIndex;
    
        switch (action) {
            case "front":
                newZIndex += 1;
                break;
            case "back":
                newZIndex -= 1;
                break;
            case "top":
                newZIndex = Math.max(...zIndexList, 500)+1;
                break;
            case "bottom":
                newZIndex = Math.min(...zIndexList, 500)-1;
                break;
        }
    
        onPropertyChange("zIndex", newZIndex);
    };
    
    

    return (
        <div className="w-[240px] bg-gray-800 text-white p-4 fixed top-0 right-0 h-screen overflow-auto z-[10000]">
            <div className="flex justify-between mb-3">
                <button onClick={() => setIsRightSideOpen(false)}>閉じる</button>
                <Link 
                    href={`/mypage/preview/${name}/${pageName}`} prefetch 
                    className=" bg-accent text-white text-md px-2 py-1 rounded-md"
                >
                    プレビュー
                </Link>
                <button 
                    className="bg-sub text-white text-md px-2 py-1 rounded-md"
                    onClick={handleSave}
                >
                    保存
                </button>
            </div>
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
                    {!isError && 
                        <div className="mt-3 rounded-md text-error text-[12px] bg-white">{error}</div>
                    }
                    <div className="flex justify-end">
                        <button 
                            className="bg-sub p-1 text-sm w-[40%] mt-2 rounded"
                            onClick={pageAdd}
                        >
                            作成する
                        </button>
                    </div>
                    <label className="text-lg mt-4">ページ遷移</label>
                    <select
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="mt-4 text-text"
                        value={selectedPage}
                    >
                        <option value="" disabled>ページ選択</option>
                        {pages.map((page) => (
                            <option key={page} value={page}>
                                {page}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end">
                        <button
                            className="bg-accent p-1 text-sm w-[40%] mt-2 rounded"
                            onClick={handlePageJump}
                        >
                            遷移
                        </button>
                    </div>
                </div>
            }

            {selectedItem && (
                <div className="mt-3">
                    {selectedItem && (
                        <div>
                            <h3 className="text-lg font-bold mt-6 mb-4 text-white">重なり順</h3>
                            <div className="grid grid-cols-2 gap-2 justify-center items-center">
                                <div className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleZIndexChange("top")}
                                        className="bg-sub px-3 py-1 rounded-lg text-lg"
                                    >
                                        最前面
                                    </button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleZIndexChange("bottom")}
                                        className="bg-accent px-3 py-1 rounded-lg text-lg"
                                    >
                                        最背面
                                    </button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleZIndexChange("front")}
                                        className="bg-sub px-5 py-1 rounded-lg text-lg"
                                    >
                                        前面
                                    </button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleZIndexChange("back")}
                                        className="bg-accent px-5 py-1 rounded-lg text-lg"
                                    >
                                        背面
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <h2 className="text-xl font-bold mt-6 mb-4">プロパティ設定</h2>
                    {selectedItem.type === 'hyperLink' &&
                        <div>
                            <h3 className="text-lg font-bold mt-6 mb-4 text-white">リンク</h3>
                            <div className="flex flex-col items-center text-text">
                                <div className="space-y-4 w-full max-w-xs">
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">リンクの指定</label>
                                        <select
                                            value={selectedItem.isLink}
                                            onChange={(e) => onPropertyChange("isLink", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        >
                                            <option value="text">テキストに適用</option>
                                            <option value="back">背景に適用</option>
                                        </select>
                                    </div>   
                                    <div className="flex flex-col">
                                        <label className="text-lg text-white">リンク先</label>
                                        <select
                                            value={selectedItem.href}
                                            onChange={(e) => onPropertyChange("href", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        >
                                            {pages.map((page) => (
                                                <option key={page} value={page}>
                                                    {page}
                                                </option>
                                            ))}
                                        </select>
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
                                        <label className="text-lg text-white">中身</label>
                                        <input
                                            type="text"
                                            value={(selectedItem.children as string) || ""}
                                            onChange={(e) => onPropertyChange("children", e.target.value)}
                                            className="ml-5 w-[80%] mt-4 text-right"
                                        />
                                    </div>
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
                                <button
                                    className="text-text bg-white w-[40%] rounded-md ml-5 mt-4"
                                    onClick={(e) => onPropertyChange("color", "")}
                                >
                                    カラーなし
                                </button>
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
