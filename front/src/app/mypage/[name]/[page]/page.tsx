"use client";

import { useEffect, useState } from "react";
import { LeftSide } from "@/components/mypage/create/LeftSide";
import { RightSide } from "@/components/mypage/create/RightSide";
import { Container, onItemUpdateProps } from "@/components/mypage/create/Container";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/mypage/create/dnd/Droppable";
import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DroppedArea } from "@/components/mypage/create/DroppedArea"
import { DragOver } from "@/components/mypage/create/DragOver";
import { PolygonItems, SquareItems, CircleItems, ItemType, ItemsCase, TextItems, HyperLinkItems  } from "@/components/mypage/create/ItemsCase"
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ProjectName } from "@/api/ProjectName";
import { VerifyToken } from "@/api/VerifyToken";
import { PageComponent, PageComponentDestroy, PageComponentIndex } from "@/api/PageComponent";


export default function Page() {
    const [droppedItems, setDroppedItems] = useState<(PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[]>([]);
    const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const [activeDragItem, setActiveDragItem] = useState<UniqueIdentifier | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const { name: encodedName, page: encodedPage } = useParams();
    const name = decodeURIComponent(encodedName as string);
    const page = decodeURIComponent(encodedPage as string);
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);
    const [checkUrl, setCheckUrl] = useState(false);
    const [zIndexList, setZIndexList] = useState<number[]>([]);

    useEffect(() => {
        if (!Token) {
            router.push("/login");
            return;
        }
        const Verify = async() => {
            const response = await VerifyToken();
            if (response) {
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
        } else {
            const fetchFromDB = async () => {
                const response = await PageComponentIndex({ name, page });
                if (response) {
                    setDroppedItems(response.droppedItems);
                }
            };
            fetchFromDB();
        }
    }, [LOCAL_STORAGE_KEY, Token, name, page]);

    
    
    
    useEffect(() => {
        if (droppedItems.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(droppedItems));
        }
    }, [droppedItems, LOCAL_STORAGE_KEY]);

    const checkProject = ProjectName({ name });
    useEffect(() => {
        const checkName = async() => {
            const response = await checkProject();
            
            if (response && response.name) {
                if (response.name.some(projectName => projectName === name)) {
                    if (response.page.some(projectPage => projectPage === page)) {
                        setCheckUrl(true)
                        return;
                    } else {
                        router.push(`/mypage/${name}/home`)
                    }
                } else {
                    router.push("/mypage");
                }
            } else {
                router.push('/mypage')
            }
        }    
        checkName();
    }, [Token, name, checkProject, page]);

    useEffect(() => {
        const zIndexes = droppedItems.map(item => item.zIndex ?? 0);
        setZIndexList(zIndexes);
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
                    active.id as ItemType,
                    dropPosition.finalX,
                    dropPosition.finalY
                );
                setDroppedItems((prevItems) => [...prevItems, newItem as PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onItemUpdate = ({ id, x, y, width, height, angle, type, borderRadius }: onItemUpdateProps) => {
        setDroppedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { 
                        ...item, 
                        x, 
                        y, 
                        width, 
                        height, 
                        ...(angle !== undefined && {angle} ),
                        ...(type === "square" && borderRadius !== undefined
                        ? { borderRadius }
                        : "")
                    }
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

    const handleSave = async() => {
        const response = await PageComponent({ name, page, droppedItems });
        if (response.success) {
            alert("保存に成功しました。");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        } else {
            alert('保存に失敗しました。')
        }
    };

    const handleItemDelete = async (id: number) => {
        setDroppedItems(prevItems => {
            const updatedItems = prevItems.filter(item => item.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems)); 
            return updatedItems;
        });
        const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const itemExistsInLocalStorage = storedItems.some((item: { id: number }) => item.id === id);
        await PageComponentDestroy({ id });
        
    };
    

    if (!(checkToken && checkUrl)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="circle-packman-1"></div>
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
                            setSelectedItemId={setSelectedItemId}
                            onItemDelete={handleItemDelete}
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
                    handleSave={handleSave}
                    zIndexList={zIndexList}
                />
            )}
        </div>
    );
}
