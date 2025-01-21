import React, { useCallback, useRef, useState } from "react";
import Moveable from "react-moveable";
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { Text } from "@/components/parts/Text";
import { PolygonItems, SquareItems, CircleItems, TextItems, HyperLinkItems } from "@/components/mypage/create/ItemsCase";
import { HyperLink } from "@/components/parts/HyperLink";


export interface onItemUpdateProps { 
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    angle?: number,
    type: 'circle' | 'polygon' | 'square' | 'text' | 'hyperLink',
    borderRadius?: string;
}

export interface ContainerProps {
    items: (PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[];
    onItemUpdate: (props: onItemUpdateProps) => void;
    setSelectedItemId: (id: string | null) => void;
}

export function Container({ items, onItemUpdate, setSelectedItemId }: ContainerProps) {
    const itemRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement>}>({});
    const [selectedMoveableId, setSelectedMoveableId] = useState<string | null>(null);
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

    const handleItemClick = useCallback((e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedItemId(id);
        setSelectedMoveableId(id);
    }, [setSelectedItemId]);
    

    return (
        <div
            className="w-full h-full overflow-auto relative"
            onClick={() => {
                setSelectedItemId(null);
                setSelectedMoveableId(null);
            }}
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
                                width: `${item.width}px`,
                                height: `${item.height}px`,
                                backgroundColor: `${item.color}`,
                                transform: `rotate(${item.angle}deg)`,
                                ...(item.type === "square" && { borderRadius: item.borderRadius }),
                                border: hoveredItemId === item.id ? "2px dashed #007BFF" : "none",
                            }}
                            onClick={(e) => handleItemClick(e, item.id)}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
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
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    angle={0}
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
                            {item.type === "text" && (
                                <Text
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    textColor={item.textColor}
                                    size={item.size}
                                    textAlign={item.textAlign}
                                    verticalAlign={item.verticalAlign}
                                >
                                    {item.children}
                                </Text>
                            )}
                            {item.type === "hyperLink" && (
                                <HyperLink
                                    width={item.width}
                                    height={item.height}
                                    unit="px"
                                    border={item.border}
                                    borderColor={item.borderColor}
                                    opacity={item.opacity}
                                    textColor={item.textColor}
                                    size={item.size}
                                    textAlign={item.textAlign}
                                    verticalAlign={item.verticalAlign}
                                    href={item.href}
                                    isLink='no'
                            >
                                {item.children}
                            </HyperLink>
                            )}
                        </div>
                        {selectedMoveableId === item.id && (
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
                                    e.target.style.borderRadius = e.borderRadius;
                                }}

                                onRoundEnd={e => {
                                    if (item.type === "square") {
                                        const borderRadius = e.lastEvent?.borderRadius || item.borderRadius;
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
                                    }
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
