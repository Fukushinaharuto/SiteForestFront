"use client"
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        backgroundColor: isOver ? "#f0f8ff" : "#fff",
        height: "2000px",
        width: "100%",
        position: "relative",
    };
    
    
    return (
        <div ref={setNodeRef} style={style}>
        {props.children}
        </div>
    );
}