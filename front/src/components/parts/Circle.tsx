export interface CircleProps{
    color?: string;
    width: number;
    height: number;
    unit: string;
    border: number;
    borderColor: string;
    opacity: number;
    angle: number;
    zIndex: number;
}
export function Circle({ color, width, height, unit, border, borderColor, opacity, angle, zIndex }:CircleProps) {
    return(
        <div
            style={{
                backgroundColor: color,
                width: `${width}${unit}`,
                height: `${height}${unit}`,
                borderRadius: "60px 60px 60px 60px",
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100, 
                transform: `rotate(${angle}°)`,
                zIndex: zIndex,
            }}
        ></div>
    )
}