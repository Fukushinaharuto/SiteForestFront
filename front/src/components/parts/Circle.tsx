export interface CircleProps{
    color: string;
    width: number;
    height: number;
    border: number;
    borderColor: string;
    opacity: number;
    angle: number;
}
export function Circle({ color, width, height, border, borderColor, opacity, angle }:CircleProps) {
    return(
        <div
            style={{
                backgroundColor: color,
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: "60px 60px 60px 60px",
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100, 
                transform: `rotate(${angle}deg)`,
            }}
        ></div>
    )
}