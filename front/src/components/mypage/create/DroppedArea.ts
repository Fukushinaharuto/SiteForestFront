import { DragEndEvent } from "@dnd-kit/core";

export function DroppedArea(
    active: DragEndEvent["active"],
    containerId: string
): { finalX: number; finalY: number } | null {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return null;
    }
    const containerRect = container.getBoundingClientRect();
    if (!containerRect) return null;
    const translated = active.rect.current?.translated;
    if (!translated) {
        console.error("Translated coordinates not found in active item.");
        return null;
    }
    let finalX = translated.left - containerRect.left;
    let finalY = translated.top - containerRect.top;
    if (finalX < 0) finalX = 0;
    if (finalX + 50 > containerRect.width) finalX = containerRect.width - 50;
    if (finalY < 0) finalY = 0;
    if (finalY + 50 > containerRect.height) finalY = containerRect.height - 50;

    return { finalX, finalY };
}
