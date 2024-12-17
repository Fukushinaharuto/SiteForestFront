export const RoundToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;