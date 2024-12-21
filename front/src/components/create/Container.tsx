import { Rnd } from "react-rnd";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { RoundToGrid } from "@/components/create/RoundToGrid";
import { PolygonItems, SquareItems, CircleItems } from "@/components/create/ItemsCase"

export interface ContainerProps {
    items: (PolygonItems | SquareItems | CircleItems)[];
}

export function Container({items}:ContainerProps){
    return (
        <div
            className="w-full h-full relative"
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
                    default={{
                        x: item.x,
                        y: item.y,
                        width: item.width,
                        height: item.height,
                    }}
                    bounds="parent"
                    grid={[5, 5]}
                    className="absolute cursor-pointer"
                >
                    <div>
                        {item.type === "polygon" && 
                            <Polygon 
                                width={item.width}
                                height={item.height}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                sides={item.sides}
                                angleOffset={item.angleOffset} 
                            />
                        }
                        {item.type === "square" && 
                            <Square 
                                width={item.width}
                                height={item.height}
                                radiusTopLeft={item.radiusTopLeft}
                                radiusTopRight={item.radiusTopRight}
                                radiusBottomLeft={item.radiusBottomLeft}
                                radiusBottomRight={item.radiusBottomRight}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={item.angle}
                            />
                        }
                        {item.type === "circle" && 
                            <Circle 
                                width={item.width}
                                height={item.height}
                                color={item.color}
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={item.angle}
                            />
                        }
                    </div>
                </Rnd>
            ))}
        </div>
    );
};
