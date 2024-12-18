import { Dispatch, SetStateAction } from "react";

interface Item {
    id: string;
    weight: number;
    height: number;
    color: string;
    border: number;
    borderColor: string;
    opacity: number;
    x: number;
    y: number;
    sides?: number;
    angleOffset?: number;
    radiusTopLeft?: number;
    radiusTopRight?: number;
    radiusBottomLeft?: number;
    radiusBottomRight?: number;
    angle?: number;
}

export const addDroppedItem = (
    setDroppedItems: Dispatch<SetStateAction<Item[]>>,
    activeId: string,
    finalX: number,
    finalY: number
) => {
    let newItem: Item;

    switch (activeId) {
        case "polygon":
            newItem = {
                id: activeId,
                weight: 50,
                height: 50,
                color: "#3498db",
                border: 0,
                x: finalX,
                y: finalY,
                sides: 5,
            };
            break;
        case "square":
            newItem = {
                id: activeId,
                size: 50,
                color: "#3498db",
                x: finalX,
                y: finalY,
                radiusTopLeft: 0,
                radiusTopRight: 0,
                radiusBottomLeft: 0,
                radiusBottomRight: 0,
            };
            break;
        case "circle":
            newItem = {
                id: activeId,
                size: 50,
                color: "#3498db",
                x: finalX,
                y: finalY,
            };
            break;
        default:
            return;
    }

    setDroppedItems((prevItems) => [...prevItems, newItem]);
};
