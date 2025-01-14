import { UniqueIdentifier } from "@dnd-kit/core";
import { PolygonProps } from "@/components/parts/Polygon";
import { SquareProps } from "@/components/parts/Square";
import { CircleProps } from "@/components/parts/Circle";

export interface DroppedItems {
    id: string;
    type:UniqueIdentifier;
    x: number;
    y: number;
}

export interface  PolygonItems extends PolygonProps {
    id: string;
    type:string;
    x: number;
    y: number;
}

export interface SquareItems extends SquareProps {
    id: string;
    type:string;
    x: number;
    y: number;
}

export interface CircleItems extends CircleProps {
    id: string;
    type:string;
    x: number;
    y: number;
}


export function ItemsCase(type: UniqueIdentifier, x: number, y: number): (PolygonItems | SquareItems | CircleItems) {
    switch (type) {
        case "polygon":
            return {
                id: `polygon-${Date.now()}`,
                type: "polygon",
                x,
                y,
                width: 50,
                height: 50,
                color:"#3498db",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                sides:5,
                angleOffset:0,
            } as PolygonItems;
        case "square":
            return {
                id: `square-${Date.now()}`,
                type: "square",
                x,
                y,
                width: 50,
                height: 50,
                unit: "px",
                color:"#3498db",
                radiusTopLeft:0,
                radiusTopRight:0,
                radiusBottomLeft:0,
                radiusBottomRight:0,
                border:0,
                borderColor:"#3498db",
                opacity:100,
                angle:0,
            } as SquareItems;
        case "circle":
            return {
                id: `circle-${Date.now()}`,
                type: "circle",
                x,
                y,
                width:50,
                height:50,
                unit: "px",
                color:"#3498db",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                angle:0,
            } as CircleItems;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}
