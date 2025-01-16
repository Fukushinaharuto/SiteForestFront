export interface SquareProps{
    color?: string;
    width: number;
    height: number;
    unit: string;
    borderRadius: string;
    border: number;
    borderColor: string;
    opacity: number;
    angle: number;
}
export function Square({ color, width, height, unit, borderRadius, border, borderColor, opacity, angle }:SquareProps) {
    
    return(
        <div
            style={{
                backgroundColor: color,
                width: `${width}${unit}`,
                height: `${height}px`,
                borderRadius: borderRadius,
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100, 
                transform: `rotate(${angle}°)`,
            }}
        ></div>
    )
}