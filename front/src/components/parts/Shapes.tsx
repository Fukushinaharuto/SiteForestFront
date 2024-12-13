"use client"
interface ShapeProps {
    type: "square" | "circle" | "ellipse";
    size: number; // サイズ (px)
    color: string; // 背景色
}

const Shape: React.FC<ShapeProps> = ({ type, size, color }) => {
    let shapeStyles = "";

    // 図形の種類に応じたスタイルを設定
    switch (type) {
        case "square":
            shapeStyles = "rounded-none"; // 四角形
            break;
        case "circle":
            shapeStyles = "rounded-full"; // 円形
            break;
        case "ellipse":
            shapeStyles = "rounded-full h-[80%]"; // 楕円形
            break;
        default:
            shapeStyles = "";
    }

    return (
        <div
            className={`inline-block ${shapeStyles}`}
            style={{
                backgroundColor: color,
                width: `${size}px`,
                height: `${type === "ellipse" ? size / 1.5 : size}px`,
            }}
        ></div>
    );
};

export default Shape;
