import React, { useCallback, useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { PolygonItems, SquareItems, CircleItems } from "@/components/mypage/create/ItemsCase";

export interface ContainerProps {
    items: (PolygonItems | SquareItems | CircleItems)[];
    onItemUpdate: (
        id: string,
        x: number,
        y: number,
        width?: number,
        height?: number,
        angle?: number,
        borderRadius?: number
    ) => void;
    selectedItemId: string | null;
    setSelectedItemId: (id: string | null) => void;
}

export function Container({ items, onItemUpdate, selectedItemId, setSelectedItemId }: ContainerProps) {
    const itemRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement>}>({});

    const handleItemClick = useCallback((e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedItemId(id);
    }, [setSelectedItemId]);

    return (
        <div
            className="w-full h-full overflow-auto relative"
            onClick={() => setSelectedItemId(null)}
        >
            {items.map((item) => {
                if (!itemRefs.current[item.id]) {
                    itemRefs.current[item.id] = React.createRef<HTMLDivElement>();
                }
                return (
                    <React.Fragment key={item.id}>
                        <div
                            ref={itemRefs.current[item.id]}
                            id={`item-${item.id}`}
                            style={{
                                position: "absolute",
                                left: `${item.x}px`,
                                top: `${item.y}px`,
                                height: `${item.height}px`,
                                width: `${item.width}px`
                                
                            }}
                            onClick={(e) => handleItemClick(e, item.id)}
                        >
                            {item.type === "polygon" && (
                                <Polygon
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    color={item.color}
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    sides={(item as PolygonItems).sides}
                                    angleOffset={(item as PolygonItems).angleOffset}
                                />
                            )}
                            {item.type === "square" && (
                                <Square
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    radiusTopLeft={(item as SquareItems).radiusTopLeft}
                                    radiusTopRight={(item as SquareItems).radiusTopRight}
                                    radiusBottomLeft={(item as SquareItems).radiusBottomLeft}
                                    radiusBottomRight={(item as SquareItems).radiusBottomRight}
                                    color={item.color}
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    angle={(item as SquareItems).angle}
                                />
                            )}
                            {item.type === "circle" && (
                                <Circle
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    color={item.color}
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    angle={(item as CircleItems).angle}
                                />
                            )}
                        </div>
                        <Moveable
                            target={itemRefs.current[item.id]}
                            draggable={true}
                            resizable={true}
                            keepRatio={false}
                            throttleDrag={0}
                            throttleResize={0}
                            renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                            onDrag={(e) => {
                                e.target.style.transform = e.transform;
                            }}
                            onDragEnd={(e) => {
                                const transformValue = e.target.style.transform;
                                const regex = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/;
                                const match = transformValue.match(regex);

                                if (match) {
                                    const x = parseFloat(match[1]);
                                    const y = parseFloat(match[2]);
                                    onItemUpdate(item.id, item.x + x, item.y + y);
                                    e.target.style.transform = '';
                                }
                            }}
                            onResize={(e) => {
                                const newWidth = e.width;
                                const newHeight = e.height;
                                const beforeTranslate = e.drag.beforeTranslate;
                        
                                e.target.style.width = `${newWidth}px`;
                                e.target.style.height = `${newHeight}px`;
                                e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                                onItemUpdate(
                                    item.id,
                                    item.x + beforeTranslate[0],
                                    item.y + beforeTranslate[1],
                                    newWidth,
                                    newHeight
                                );
                            }}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
}
