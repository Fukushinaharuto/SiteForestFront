import React, { useCallback, useRef } from "react";
import Moveable from "react-moveable";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { PolygonItems, SquareItems, CircleItems } from "@/components/mypage/create/ItemsCase";


export interface onItemUpdateProps { 
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number,
    type: 'circle' | 'polygon' | 'square',
    borderRadius?: string;
}

export interface ContainerProps {
    items: (PolygonItems | SquareItems | CircleItems)[];
    onItemUpdate: (props: onItemUpdateProps) => void;
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
                                maxWidth: "auto",
                                maxHeight: "auto",
                                minWidth: "auto",
                                minHeight: "auto",
                                backgroundColor: `${item.color}`,
                                transform: `rotate(${item.angle}deg)`,
                            }}
                            onClick={(e) => handleItemClick(e, item.id)}
                        >
                            {item.type === "polygon" && (
                                <Polygon
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    sides={item.sides}
                                    angle={item.angle}
                                />
                            )}
                            {item.type === "square" && (
                                <Square
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    borderRadius={item.borderRadius}
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    angle={item.angle}
                                />
                            )}
                            {item.type === "circle" && (
                                <Circle
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    angle={item.angle}
                                />
                            )}
                        </div>
                        <Moveable
                            target={itemRefs.current[item.id]}
                            draggable={true}
                            resizable={true}
                            rotatable={true}
                            roundable={item.type === "square"}
                            isDisplayShadowRoundControls={true}
                            roundClickable={"control"}
                            roundPadding={15}
                            keepRatio={false}
                            throttleDrag={0}
                            throttleResize={0}
                            throttleRotate={0}
                            throttleRounda={0}
                            renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                            onDragStart={() => {
                                setSelectedItemId(null);
                            }}
                            onDrag={(e) => {
                                e.target.style.transform = e.transform;     
                            }}
                            onDragEnd={(e) => {
                                const { translate } = e.lastEvent || [0, 0];
                                if (translate) {
                                    const [x, y] = translate;
                                    onItemUpdate({
                                        id: item.id,
                                        x: item.x + x,
                                        y: item.y + y,
                                        width: item.width,
                                        height: item.height,
                                        angle: item.angle,
                                        type: item.type,
                                    });
                                    console.log(item.x+x, item.y+y)
                                    e.target.style.left = `${item.x + x}px`;
                                    e.target.style.top = `${item.y + y}px`;
                                    const currentTransform = e.target.style.transform;
                                    const newTransform = currentTransform.replace(/translate\([^)]*\)/, '').trim();
                                    e.target.style.transform = newTransform;
                                }
                            }}
                            onRotateStart={() => {
                                setSelectedItemId(null);
                            }}
                            onResize={(e) => {
                                e.target.style.width = `${e.width}px`;
                                e.target.style.height = `${e.height}px`;
                                e.target.style.transform = e.drag.transform;                                
                            }}
                            onResizeEnd={(e) => {
                                const { lastEvent } = e;
                                
                                if (lastEvent) {
                                    const { width, height } = lastEvent;
                                    const transform = e.target.style.transform;
                                    const matches = transform.match(/translate\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px\)/);
                                    
                                    let newX = item.x;
                                    let newY = item.y;
                                    
                                    if (matches) {
                                        newX += parseFloat(matches[1]);
                                        newY += parseFloat(matches[2]);
                                    }
                                    console.log(newX,newY)
                                    onItemUpdate({
                                        id: item.id,
                                        x: newX,
                                        y: newY,
                                        width: width || item.width,
                                        height: height || item.height,
                                        angle: item.angle,
                                        type: item.type,
                                    });
                                    e.target.style.left = `${newX}px`;
                                    e.target.style.top = `${newY}px`;
                                    const currentTransform = e.target.style.transform;
                                    const newTransform = currentTransform.replace(/translate\([^)]*\)/, '').trim();
                                    e.target.style.transform = newTransform;
                                }
                                
                            }}
                            onRotate={e => {
                                e.target.style.transform = e.transform;
                            }}
                            onRotateEnd={e => {
                                const angle = e.lastEvent?.rotate || item.angle;               
                                onItemUpdate({
                                    id: item.id,
                                    x: item.x,
                                    y: item.y,
                                    width: item.width,
                                    height: item.height,
                                    angle: angle,
                                    type: item.type,
                                });
                            }}
                            roundableOptions={{
                                minRadius: 0,
                                maxRadius: 100,
                                positions: ["tl", "tr", "bl", "br"]
                            }}
                            
                            
                            onRound={e => {
                                console.log("ROUND", e.borderRadius);
                                e.target.style.borderRadius = e.borderRadius;
                            }}

                            onRoundEnd={e => {
                                const borderRadius = e.lastEvent?.borderRadius;
                                onItemUpdate({
                                    id: item.id,
                                    x: item.x,
                                    y: item.y,
                                    width: item.width,
                                    height: item.height,
                                    angle: item.angle,
                                    type: item.type,
                                    borderRadius: borderRadius,
                                });
                            }}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
}
