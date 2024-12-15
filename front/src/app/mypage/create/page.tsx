"use client";

import { useState } from "react";
import LeftSide from "@/components/create/LeftSide";
import RightSide from "@/components/create/RightSide";
import Container from "@/components/create/Container";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/dnd-kit/Droppable";

export default function MypageCreate() {
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDragEnd = (event) => {
        const { over, delta, active } = event;
        if (over && over.id === "droppable") {
            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setDroppedItems((prevItems) => [
                ...prevItems,
                {
                    id: active.id,
                    type: "square",
                    size: 100,
                    color: "#3498db",
                    x: delta.x + scrollX,
                    y: delta.y + scrollY,
                },
            ]);
        }
    };

    return (
        <div>
            {/* サーバーサイドレンダリングされない */}
            {typeof window !== "undefined" && (
                <DndContext
                    onDragEnd={handleDragEnd}
                >
                    <LeftSide />
                    <Droppable>
                        <Container items={droppedItems} />
                    </Droppable>
                </DndContext>
            )}
            <RightSide />
        </div>
    );
}
