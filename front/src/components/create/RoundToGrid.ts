export function RoundToGrid(value: number, gridSize: number): number {
    return Math.round(value / gridSize) * gridSize;
}
    