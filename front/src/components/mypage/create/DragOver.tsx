import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import {  DragOverlay } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core";

export function DragOver({ activeDragItem }: { activeDragItem: UniqueIdentifier | null }) {

    return( 
        <DragOverlay>
            {activeDragItem === "polygon" && (
                <Polygon
                    width={50}
                    height={50}
                    unit="px"
                    color="#3498db"
                    border={0}
                    borderColor=""
                    opacity={100}
                    sides={5}
                    angleOffset={0}
                />
            )}
            {activeDragItem === "square" && (
                <Square
                    width={50}
                    height={50}
                    unit="px"
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
            )}
            {activeDragItem === "circle" && (
                <Circle
                    width={50}
                    height={50}
                    unit="px"
                    color="#3498db"
                    border={0}
                    borderColor=""
                    opacity={100}
                    angle={0}
                />
            )}
        </DragOverlay>
    )
}