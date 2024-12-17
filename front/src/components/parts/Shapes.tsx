interface ShapeProps {
    type: "square" | "circle" | "ellipse";
    size: number;
    color: string;
}

export function Shape({ type, size, color }: ShapeProps): JSX.Element{
    let shapeStyles = "";
    switch (type) {
        case "square":
            shapeStyles = "rounded-none";
            break;
        case "circle":
            shapeStyles = "rounded-full";
            break;
        case "ellipse":
            shapeStyles = "rounded-full h-[80%]";
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


