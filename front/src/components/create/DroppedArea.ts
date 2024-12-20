import { RoundToGrid } from "@/components/create/RoundToGrid";
import { DragEndEvent } from "@dnd-kit/core";

export function DroppedArea(active:DragEndEvent["active"], containerId:string) {
    const container = document.getElementById(containerId);
    const containerRect = container?.getBoundingClientRect();
    if (!container || !containerRect) return null;
    const translated = active.rect.current.translated;
    if (!translated) return null;
    let finalX = translated.left - containerRect.left;
    let finalY = translated.top - containerRect.top;
    if (finalX < 0) finalX = 0;
    if (finalX + 50 > containerRect.width) finalX = containerRect.width - 50;
    if (finalY < 0) finalY = 0;
    if (finalY + 50 > containerRect.height) finalY = containerRect.height - 50;
    finalX = RoundToGrid(finalX, 5);
    finalY = RoundToGrid(finalY, 5);
    return { finalX, finalY };
};
