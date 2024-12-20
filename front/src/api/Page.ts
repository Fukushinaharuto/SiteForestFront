import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

export interface  UpdateItemPosition {
    index:number;
    x: number,
    y: number,
    size?: { width: number; height: number }
}