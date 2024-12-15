"use client"
import Shape from "@/components/parts/Shapes";

const Container = ({items}) => {
    return(
        <div className="w-full h-full">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="absolute"
                    style={{
                        top: `${item.y}px`,
                        left: `${item.x}px`,
                    }}
                >
                    <Shape type={item.type} size={item.size} color={item.color} />
                </div>
            ))}
        </div>
    )
}
export default Container;