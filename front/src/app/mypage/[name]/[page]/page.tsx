"use client";

import { useEffect, useState } from "react";
import { LeftSide } from "@/components/mypage/create/LeftSide";
import { RightSide } from "@/components/mypage/create/RightSide";
import { Container } from "@/components/mypage/create/Container";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/mypage/create/dnd/Droppable";
import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DroppedArea } from "@/components/mypage/create/DroppedArea"
import { DragOver } from "@/components/mypage/create/DragOver";
import { ItemsCase } from "@/components/mypage/create/ItemsCase"
import { PolygonItems, SquareItems, CircleItems } from "@/components/mypage/create/ItemsCase"
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ProjectName } from "@/api/ProjectName";
import { VerifyToken } from "@/api/VerifyToken";

export default function Page() {
    const [droppedItems, setDroppedItems] = useState<(PolygonItems | SquareItems | CircleItems)[]>([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState<UniqueIdentifier | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const { name: encodedName, page } = useParams();
    const name = decodeURIComponent(encodedName as string);
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);

    const { useVerifyToken } = VerifyToken();
    useEffect(() => {
        const Verify = async() => {
            const response = await useVerifyToken();
            if (response) {
                console.log(response.tokenExists);
                setCheckToken(true)
            } else {
                Cookies.remove('AuthToken', { path: '/' });
                router.push("/login");
            }
        }
        Verify()
    }, [VerifyToken, Token, router]);


    const LOCAL_STORAGE_KEY = `${name}_${page}_droppedItems`;
    useEffect(() => {
        const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedItems) {
            setDroppedItems(JSON.parse(savedItems));
        }
    }, [LOCAL_STORAGE_KEY]);
    
    useEffect(() => {
        if (droppedItems.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(droppedItems));
        }
    }, [droppedItems, LOCAL_STORAGE_KEY]);

    const checkProject = ProjectName();
    useEffect(() => {
        const checkName = async() => {
            const response = await checkProject();
            if (response && response.name) {
                if (response.name.some(projectName => projectName === name)) {
                    return;
                } else {
                    router.push("/mypage");
                }
            } else {
                router.push('/mypage')
            }
        }    
        checkName();
    }, [Token, name, checkProject]);

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

    const onItemUpdate = (id: string, x: number, y: number, width?: number, height?: number) => {
        setDroppedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, x, y, ...(width && { width }), ...(height && { height }) }
                    : item
            )
        );
    };    
    
    const selectedItem = droppedItems.find((item) => item.id === selectedItemId);

    const handlePropertyChange = (property: string, value:string | number) => {
        if (!selectedItemId) return;
        setDroppedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === selectedItemId ? { ...item, [property]: value } : item
            )
        );
    };

    if (!checkToken) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="square-spin-3"></div>
            </div>
        );
    }

    return (
        <div>     
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                {isLeftSideOpen && 
                    <LeftSide 
                        setIsLeftSideOpen={setIsLeftSideOpen}
                    />
                }
                <Droppable id="droppable">
                    <div id="droppable-container" className="w-full h-full relative">
                        <Container
                            items={droppedItems}
                            onItemUpdate={onItemUpdate}
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
                    setIsRightSideOpen={setIsRightSideOpen}
                />
            )}
        </div>
    );
}
