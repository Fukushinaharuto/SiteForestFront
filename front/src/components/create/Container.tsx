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
                                width={50}
                                height={50}
                                color="#3498db"
                                border={0}
                                borderColor=""
                                opacity={100}
                                sides={5}
                                angleOffset={0} 
                            />
                        }
                        {item.type === "square" && 
                            <Square 
                                width={50}
                                height={50}
                                radiusTopLeft={0}
                                radiusTopRight={0}
                                radiusBottomLeft={0}
                                radiusBottomRight={0}
                                color="#3498db"
                                border={0}
                                borderColor=""
                                opacity={100}
                                angle={0}
                            />
                        }
                        {item.type === "circle" && 
                            <Circle 
                                width={50}
                                height={50}
                                color="#3498db"
                                border={0}
                                borderColor=""
                                opacity={100}
                                angle={0}
                            />
                        }
                    </div>
                </Rnd>
            ))}
        </div>
    );
};
