import { PolygonProps } from "@/components/parts/Polygon";
import { SquareProps } from "@/components/parts/Square";
import { CircleProps } from "@/components/parts/Circle";
import { TextProps } from "@/components/parts/Text";
import { HyperLinkProps } from "@/components/parts/HyperLink";

export type ItemType = "polygon" | "square" | "circle" | "text" | "hyperLink";

export interface DroppedItems {
    id: number;
    x: number;
    y: number;
}

export interface PolygonItems extends PolygonProps, DroppedItems {
    type: "polygon";
}

export interface SquareItems extends SquareProps, DroppedItems {
    type: "square";
}

export interface CircleItems extends CircleProps, DroppedItems {
    type: "circle";
}

export interface TextItems extends TextProps, DroppedItems {
    type: "text";
}

export interface HyperLinkItems extends HyperLinkProps, DroppedItems {
    type: "hyperLink"
}



export function ItemsCase(type: ItemType, x: number, y: number,):DroppedItems {
    switch (type) {
        case "polygon":
            return {
                id: Date.now(),
                x,
                y,
                zIndex: 500,
                width: 50,
                height: 50,
                color:"#3498db",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                sides:5,
                angle:0,
                type: "polygon",
            } as PolygonItems;
        case "square":
            return {
                id: Date.now(),
                x,
                y,
                zIndex: 500,
                width: 50,
                height: 50,
                unit: "px",
                color:"#cc0066",
                borderRadius: "0px",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                angle:0,
                type: "square", 
            } as SquareItems;
        case "circle":
            return {
                id: Date.now(),
                x,
                y,
                zIndex: 500,
                width:50,
                height:50,
                unit: "px",
                color:"#3498db",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                angle:0,
                type: "circle", 
            } as CircleItems;
        case "text":
            return {
                id: Date.now(),
                x,
                y,
                zIndex: 500,
                width: 50,
                height: 50,
                color:"#cc0066",
                border:0,
                borderColor:"#3498db",
                opacity:100,
                angle:0,
                type: "text",
                textColor:"white",
                size:5,
                textAlign:'right',
                verticalAlign:'middle',
            } as TextItems;
            case "hyperLink":
                return {
                    id: Date.now(),
                    x,
                    y,
                    zIndex: 500,
                    width: 50,
                    height: 50,
                    color:"#cc0066",
                    border:0,
                    borderColor:"#3498db",
                    opacity:100,
                    angle:0,
                    type: "hyperLink",
                    textColor:"white",
                    size:5,
                    textAlign:'right',
                    verticalAlign:'middle',
                    href: "home",
                    isLink: 'text',
                } as HyperLinkItems;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}
