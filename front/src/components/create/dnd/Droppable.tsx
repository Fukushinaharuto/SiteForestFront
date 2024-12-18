"use client"
import {useDroppable} from '@dnd-kit/core';

export interface DroppableProps {
    id: string;
    children: React.ReactNode;
}

export function Droppable(props:DroppableProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style: React.CSSProperties = {
        border: "2px dashed #ccc",
        backgroundColor: isOver ? "#f0f8ff" : "#fff",
        height: "3000px",
        width: "100%",
        position: "relative",
    };
    
    return (
        <div ref={setNodeRef} style={style}>
        {props.children}
        </div>
    );
}