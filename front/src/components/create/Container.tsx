"use client";
import Shape from "@/components/parts/Shapes";

const Container = ({ items, onItemClick }) => {
    return (
        <div className="w-full h-full relative">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="absolute cursor-pointer"
                    style={{
                        top: `${item.y}px`,
                        left: `${item.x}px`,
                    }}
                    onClick={() => onItemClick(item, index)} // アイテムをクリック
                >
                    <Shape type={item.type} size={item.size} color={item.color} />
                </div>
            ))}
        </div>
    );
};
export default Container;
