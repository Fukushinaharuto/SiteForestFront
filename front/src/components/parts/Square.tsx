export interface SquareProps{
    color: string;
    width: number;
    height: number;
    unit: string;
    radiusTopLeft: number
    radiusTopRight: number;
    radiusBottomLeft: number;
    radiusBottomRight: number;
    border: number;
    borderColor: string;
    opacity: number;
    angle: number;
}
export function Square({ color, width, height, unit, radiusTopLeft, radiusTopRight, radiusBottomLeft, radiusBottomRight, border, borderColor, opacity, angle }:SquareProps) {
    return(
        <div
            style={{
                backgroundColor: color,
                width: `${width}${unit}`,
                height: `${height}px`,
                borderRadius: `${radiusTopLeft}px ${radiusTopRight}px ${radiusBottomRight}px ${radiusBottomLeft}px`,
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100, 
                transform: `rotate(${angle}deg)`,
            }}
        ></div>
    )
}