import LeftSide from "@/components/create/LeftSide";
import RightSide from "@/components/create/RightSide";
import Container from "@/components/create/Container";

export default function MypageCreate() {

    
    return (
        <div className="relative">
            {/* 左サイドバー */}
            <LeftSide/>

            {/* 中央コンテンツ */}
            <Container/>

            {/* 右サイドバー */}
            <RightSide/>
        </div>
    );
}
