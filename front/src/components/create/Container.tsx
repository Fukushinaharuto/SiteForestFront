import { Rnd } from "react-rnd";
import { Shape } from "@/components/parts/Shapes";
import { RoundToGrid } from "@/components/create/RoundToGrid";

export interface Item {
    id: string;
    type: "square" | "circle" | "ellipse";
    size: number;
    color: string;
    x: number;
    y: number;
}

export type UpdateItemPosition = (
    index: number,
    x: number,
    y: number,
    size: { width: number; height: number }
) => void;

export interface ContainerProps {
    items: Item[];
    onItemClick: (item: Item, index: number) => void;
    onUpdateItemPosition: UpdateItemPosition;
}

export function Container({ items, onItemClick, onUpdateItemPosition }: ContainerProps){
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
            {items.map((item, index) => (
                <Rnd
                    key={item.id}
                    default={{
                        x: item.x,
                        y: item.y,
                        width: item.size,
                        height: item.size,
                    }}
                    bounds="parent"
                    grid={[5, 5]}
                    onDragStop={(e, d) => {
                        const roundedX = RoundToGrid(d.x, 5);
                        const roundedY = RoundToGrid(d.y, 5);
                        onUpdateItemPosition(index, roundedX, roundedY, {
                            width: item.size,
                            height: item.size,
                        });
                    }}
                    // onResizeStop={(e, direction, ref, delta, position) => {
                    //     const roundedX = RoundToGrid(position.x, 5);
                    //     const roundedY = RoundToGrid(position.y, 5);
                    //     const roundedWidth = RoundToGrid(ref.offsetWidth, 5);
                    //     const roundedHeight = RoundToGrid(ref.offsetHeight, 5);

                    //     onUpdateItemPosition(index, roundedX, roundedY, {
                    //     width: roundedWidth,
                    //     height: roundedHeight,
                    //     });
                    // }}
                    // enableResizing={{
                    //     top: true,
                    //     right: true,
                    //     bottom: true,
                    //     left: true,
                    //     topRight: true,
                    //     bottomRight: true,
                    //     bottomLeft: true,
                    //     topLeft: true,
                    // }}
                    className="absolute cursor-pointer"
                >
                    <div onClick={() => onItemClick(item, index)}>
                        <Shape type={item.type} size={item.size} color={item.color} />
                    </div>
                </Rnd>
            ))}
        </div>
    );
};
