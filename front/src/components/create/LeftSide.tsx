import Shape from "@/components/parts/Shapes";

const LeftSide = () => {
    return(
        <div>
            <div className="w-1/6 bg-gray-800 text-white p-4 fixed top-0 left-0 h-screen z-10">
                <h2 className="text-lg font-bold">左サイドバー</h2>
                <ul className="mt-4 space-y-2">
                    <li>
                        <div>
                            <Shape type="square" size={100} color="#3498db" />
                        </div>
                    </li>
                    <li>メニュー2</li>
                    <li>メニュー3</li>
                    
                </ul>
            </div>
        </div>
    )
}
export default LeftSide;