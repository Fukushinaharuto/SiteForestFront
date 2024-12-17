"use client";

import { useState } from "react";
import { LeftSide } from "@/components/create/LeftSide";
import { RightSide } from "@/components/create/RightSide";
import { Container,  Item } from "@/components/create/Container";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Droppable } from "@/components/dnd-kit/Droppable";
import { Shape } from "@/components/parts/Shapes";
import { UpdateItemPosition } from "@/api/Page"
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { RoundToGrid } from "@/components/create/RoundToGrid";

export default function MypageCreate() {
    const [droppedItems, setDroppedItems] = useState<Item[]>([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [initialScroll, setInitialScroll] = useState<{x:number, y:number}>({ x: 0, y: 0 });

    const handleDragStart = (event:DragStartEvent) => {
        setIsLeftSideOpen(false);
        setIsRightSideOpen(false);
        setActiveDragItem(event.active.id);

        setInitialScroll({
            x: window.scrollX || document.documentElement.scrollLeft,
            y: window.scrollY || document.documentElement.scrollTop,
        });
    };

    const handleDragEnd = (event:DragEndEvent) => {
        setIsLeftSideOpen(true);
        setIsRightSideOpen(true);
        setActiveDragItem(null);

        const { over, delta, active } = event;

        if (over && over.id === "droppable") {
            const container = document.getElementById("droppable-container");
            const containerRect = container.getBoundingClientRect();

            const initialX = active.rect.current.initial.left;
            const initialY = active.rect.current.initial.top;
            const finalX = initialX + delta.x + initialScroll.x;
            const finalY = initialY + delta.y + initialScroll.y;

            const itemSize = 100;

            if (
                finalX < containerRect.left ||
                finalY < containerRect.top ||
                finalX + itemSize > containerRect.right ||
                finalY + itemSize > containerRect.bottom
            ) {
                return;
            }

            setDroppedItems((prevItems) => [
                ...prevItems,
                {
                    id: active.id,
                    type: "square",
                    size: itemSize,
                    color: "#3498db",
                    x: RoundToGrid(finalX, 5),
                    y: RoundToGrid(finalY, 5),
                } as Item,
            ]);
        }
    };

    const handleItemClick = (item, index) => {
        setSelectedItem({ ...item, index });
    };

    const handlePropertyChange = (property, value) => {
        setDroppedItems((prevItems) =>
            prevItems.map((item, index) =>
                index === selectedItem.index ? { ...item, [property]: value } : item
            )
        );
        setSelectedItem((prev) => ({ ...prev, [property]: value }));
    };

    const handleUpdateItemPosition = ({index, x, y, size}:UpdateItemPosition) => {
        setDroppedItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index
                    ? { ...item, x, y, size: size ? size.width : item.size }
                    : item
            )
        );
    };

    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                {isLeftSideOpen && <LeftSide />}
                <Droppable>
                    <div id="droppable-container" className="w-full h-full relative">
                        <Container
                            items={droppedItems}
                            onItemClick={handleItemClick}
                            onUpdateItemPosition={handleUpdateItemPosition}
                        />
                    </div>
                </Droppable>
                <DragOverlay>
                    {activeDragItem ? <Shape type="square" size={100} color="#3498db" /> : null}
                </DragOverlay>
            </DndContext>
            {isRightSideOpen && (
                <RightSide
                    selectedItem={selectedItem}
                    onPropertyChange={handlePropertyChange}
                />
            )}
        </div>
    );
}
