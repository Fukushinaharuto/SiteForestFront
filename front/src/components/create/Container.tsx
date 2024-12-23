import { Rnd } from "react-rnd";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { RoundToGrid } from "@/components/create/RoundToGrid";
import { PolygonItems, SquareItems, CircleItems } from "@/components/create/ItemsCase"
import { useState } from "react";

export interface ContainerProps {
    items: (PolygonItems | SquareItems | CircleItems)[];
    onItemUpdate: (
        id: string,
        x: number,
        y: number,
        width?: number,
        height?: number,
        angle?: number,
        borderRadius?: number
    ) => void;
}

export function Container({items, onItemUpdate}:ContainerProps){
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [rotatingItemId, setRotatingItemId] = useState<string | null>(null);

    const handleItemClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedItemId(id);
        setRotatingItemId(null);
    };

    const handleRotationStart = (id: string) => {
        setRotatingItemId(id);
    };

    return (
        <div
            className="w-full h-full relative"
            onClick={() => setSelectedItemId(null)}
            onMouseUp={() => setRotatingItemId(null)}
            style={{
                backgroundImage: `
                    linear-gradient(to right, #ddd 1px, transparent 1px),
                    linear-gradient(to bottom, #ddd 1px, transparent 1px)
                `,
                backgroundSize: "5px 5px",
            }}
        >
            {items.map((item) => (
                <Rnd
                    key={item.id}
                    position={{ x: item.x, y: item.y }}
                    size={{ width: item.width, height: item.height }}
                    bounds="parent"
                    grid={[5, 5]}
                    className="absolute cursor-pointer"
                    onDragStop={(e, data) => {
                        const snappedX = RoundToGrid(data.x, 5);
                        const snappedY = RoundToGrid(data.y, 5);
                        onItemUpdate(item.id, snappedX, snappedY);
                    }}
                    
                    enableResizing={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true,
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                        const snappedX = RoundToGrid(position.x, 5);
                        const snappedY = RoundToGrid(position.y, 5);
                        const snappedWidth = RoundToGrid(ref.offsetWidth, 5);
                        const snappedHeight = RoundToGrid(ref.offsetHeight, 5);
                        onItemUpdate(item.id, snappedX, snappedY, snappedWidth, snappedHeight);
                    }}
                    onClick={(e:React.MouseEvent) => handleItemClick(e, item.id)}
                    style={{
                        outline:
                            selectedItemId === item.id
                                ? "2px solid rgba(0, 123, 255, 0.8)"
                                : "none",
                        boxShadow:
                            selectedItemId === item.id
                                ? "0 0 8px rgba(0, 123, 255, 0.5)"
                                : "none",
                    }}
                >
                    <div>
                        {item.type === "polygon" && (
                            <Polygon
                                width={item.width}
                                height={item.height}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                sides={(item as PolygonItems).sides}
                                angleOffset={(item as PolygonItems).angleOffset}
                            />
                        )}
                        {item.type === "square" && (
                            <Square
                                width={item.width}
                                height={item.height}
                                radiusTopLeft={(item as SquareItems).radiusTopLeft}
                                radiusTopRight={(item as SquareItems).radiusTopRight}
                                radiusBottomLeft={(item as SquareItems).radiusBottomLeft}
                                radiusBottomRight={(item as SquareItems).radiusBottomRight}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={(item as SquareItems).angle}
                            />
                        )}
                        {item.type === "circle" && (
                            <Circle
                                width={item.width}
                                height={item.height}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={(item as CircleItems).angle}
                            />
                        )}
                    </div>
                </Rnd>
            ))}
        </div>
    );
};
