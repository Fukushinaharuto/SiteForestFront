"use client";

import { useState } from "react";
import LeftSide from "@/components/create/LeftSide";
import RightSide from "@/components/create/RightSide";
import Container from "@/components/create/Container";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Droppable } from "@/components/dnd-kit/Droppable";
import Shape from "@/components/parts/Shapes";

export default function MypageCreate() {
    const [droppedItems, setDroppedItems] = useState([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleDragStart = (event) => {
        setIsLeftSideOpen(false);
        setIsRightSideOpen(false);
        setActiveDragItem(event.active.id);
    };

    const handleDragEnd = (event) => {
        setIsLeftSideOpen(true);
        setIsRightSideOpen(true);
        setActiveDragItem(null);

        const { over, delta, active } = event;
        if (over && over.id === "droppable") {
            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const initialX = active.rect.current.initial.left;
            const initialY = active.rect.current.initial.top;
            setDroppedItems((prevItems) => [
                ...prevItems,
                {
                    id: active.id,
                    type: "square",
                    size: 100,
                    color: "#3498db",
                    x: initialX + delta.x + scrollX,
                    y: initialY + delta.y + scrollY,
                },
            ]);
        }
    };

    const handleItemClick = (item, index) => {
        setSelectedItem({ ...item, index });
    };

    const handlePropertyChange = (property, value) => {
        // アイテムのプロパティを更新
        setDroppedItems((prevItems) =>
            prevItems.map((item, index) =>
                index === selectedItem.index ? { ...item, [property]: value } : item
            )
        );
        setSelectedItem((prev) => ({ ...prev, [property]: value }));
    };

    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                {isLeftSideOpen && <LeftSide />}
                <Droppable>
                    <Container
                        items={droppedItems}
                        onItemClick={handleItemClick}
                    />
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
