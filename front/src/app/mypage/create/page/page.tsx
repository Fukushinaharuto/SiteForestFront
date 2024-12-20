"use client";

import { useState } from "react";
import { LeftSide } from "@/components/create/LeftSide";
import { RightSide } from "@/components/create/RightSide";
import { Container } from "@/components/create/Container";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/create/dnd/Droppable";
import { DroppedItems } from "@/components/create/ItemsCase"
import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DroppedArea } from "@/components/create/DroppedArea"
import { DragOver } from "@/components/create/DragOver";
import { ItemsCase } from "@/components/create/ItemsCase"
import { PolygonItems, SquareItems, CircleItems } from "@/components/create/ItemsCase"

export default function Page() {
    const [droppedItems, setDroppedItems] = useState<(PolygonItems | SquareItems | CircleItems)[]>([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState<UniqueIdentifier | null>(null);

    const handleDragStart = (event:DragStartEvent) => {
        setIsLeftSideOpen(false);
        setIsRightSideOpen(false);
        setActiveDragItem(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setIsLeftSideOpen(true);
        setIsRightSideOpen(true);
        setActiveDragItem(null);
        const { over, active } = event;
        if (over?.id === "droppable") {
            const dropPosition = DroppedArea(active, "droppable-container");
            if (!dropPosition) return;
            try {
                const newItem = ItemsCase(
                    active.id,
                    dropPosition.finalX,
                    dropPosition.finalY
                );
                setDroppedItems((prevItems) => [...prevItems, newItem]);
            } catch (error) {
                console.error(error);
            }
        }
    };
    


    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                {isLeftSideOpen && <LeftSide />}
                <Droppable id="droppable">
                    <div id="droppable-container" className="w-full h-full relative">
                        <Container
                            items={droppedItems}
                        >
                            
                        </Container>
                    </div>
                </Droppable>
                <DragOver
                    activeDragItem={activeDragItem}
                />
            </DndContext>
            {/* {isRightSideOpen && (
                // <RightSide
                // />
            )} */}
        </div>
    );
}
