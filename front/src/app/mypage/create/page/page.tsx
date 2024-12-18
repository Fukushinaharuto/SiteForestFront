"use client";

import { useState } from "react";
import { LeftSide } from "@/components/create/LeftSide";
import { RightSide } from "@/components/create/RightSide";
import { Container,  Item } from "@/components/create/Container";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Droppable } from "@/components/create/dnd/Droppable";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { UpdateItemPosition } from "@/api/Page"
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { RoundToGrid } from "@/components/create/RoundToGrid";

export default function Page() {
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

    const handleDragEnd = (event: DragEndEvent) => {
        setIsLeftSideOpen(true);
        setIsRightSideOpen(true);
        setActiveDragItem(null);
    
        const { over, active } = event;
    
        if (over?.id === "droppable") {
            const container = document.getElementById("droppable-container");
            const containerRect = container?.getBoundingClientRect();
    
            if (!container || !containerRect) return;
    
            const finalX = RoundToGrid(active.rect.current.translated?.left - containerRect.left, 5);
            const finalY = RoundToGrid(active.rect.current.translated?.top - containerRect.top, 5);
    
            setDroppedItems((prevItems) => [
                ...prevItems,
                {
                    id: active.id,
                    x: finalX,
                    y: finalY,
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
                <Droppable id="droppable">
                    <div id="droppable-container" className="w-full h-full relative">
                        <Container
                            items={droppedItems}
                            onItemClick={handleItemClick}
                            onUpdateItemPosition={handleUpdateItemPosition}
                        />
                    </div>
                </Droppable>
                <DragOverlay>
                    {activeDragItem === "polygon" && (
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
                    )}
                    {activeDragItem === "square" && (
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
                    )}
                    {activeDragItem === "circle" && (
                        <Circle
                            width={50}
                            height={50}
                            color="#3498db"
                            border={0}
                            borderColor=""
                            opacity={100}
                            angle={0}
                        />
                    )}
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
