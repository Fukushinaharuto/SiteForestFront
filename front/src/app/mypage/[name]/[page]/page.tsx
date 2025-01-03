"use client";

import { useEffect, useState } from "react";
import { LeftSide } from "@/components/create/LeftSide";
import { RightSide } from "@/components/create/RightSide";
import { Container } from "@/components/create/Container";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/create/dnd/Droppable";
import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DroppedArea } from "@/components/create/DroppedArea"
import { DragOver } from "@/components/create/DragOver";
import { ItemsCase } from "@/components/create/ItemsCase"
import { PolygonItems, SquareItems, CircleItems } from "@/components/create/ItemsCase"
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
    const [droppedItems, setDroppedItems] = useState<(PolygonItems | SquareItems | CircleItems)[]>([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState<UniqueIdentifier | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const { name, page } = useParams();
    const Token = Cookies.get('AuthToken');
    const router = useRouter();

    const LOCAL_STORAGE_KEY = `${name}_${page}_droppedItems`;
    useEffect(() => {
        if(!Token){
            router.push('/login');
        }
        
        const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedItems) {
            setDroppedItems(JSON.parse(savedItems));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(droppedItems));
    }, [droppedItems]);

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

    const handleItemUpdate = (
        id: string,
        x: number,
        y: number,
        width?: number,
        height?: number
    ) => {
        setDroppedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, x, y, ...(width && { width }), ...(height && { height }) }
                    : item
            )
        );
    }
    
    const selectedItem = droppedItems.find((item) => item.id === selectedItemId);

    const handlePropertyChange = (property: string, value: any) => {
        if (!selectedItemId) return;
        setDroppedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === selectedItemId ? { ...item, [property]: value } : item
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
                            onItemUpdate={handleItemUpdate}
                            selectedItemId={selectedItemId}
                            setSelectedItemId={setSelectedItemId}
                        />    
                    </div>
                </Droppable>
                <DragOver
                    activeDragItem={activeDragItem}
                />
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
