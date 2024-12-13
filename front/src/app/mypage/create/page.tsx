
import Shape from "@/components/parts/Shapes";

export default function MypageCreate() {

    return (
        <div className="flex h-screen">
            {/* 左サイドバー */}
            <div className="w-1/6 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold">左サイドバー</h2>
                <ul className="mt-4 space-y-2">
                    <li><div><Shape type="square" size={100} color="#3498db" /></div></li>
                    <li>メニュー2</li>
                    <li>メニュー3</li>
                    <li>
                        <button
                            
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            ページを作成
                        </button>
                    </li>
                </ul>
            </div>

            {/* 中央コンテンツ */}
            <div className="flex-1 bg-gray-100 p-4">
                <h1 className="text-2xl font-bold">中央コンテンツ</h1>
                <p className="mt-2">ここにメインの内容を配置します。</p>
            </div>

            {/* 右サイドバー */}
            <div className="w-1/6 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold">右サイドバー</h2>
                <ul className="mt-4 space-y-2">
                    <li>オプション1</li>
                    <li>オプション2</li>
                    <li>オプション3</li>
                </ul>
            </div>
        </div>
    );
};

