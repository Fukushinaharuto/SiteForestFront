export interface TextProps{
    color?: string;
    width: number;
    height: number;
    unit: string;
    borderRadius?: string;
    border: number;
    borderColor: string;
    opacity: number;
    angle?: number;
    zIndex: number;
    textColor: string;
    size: number;
    font?: string;
    children?: React.ReactNode;
    textAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
}
export function Text({ color, width, height, unit, borderRadius, border, borderColor, opacity, angle, zIndex, textColor, size, font, children, textAlign = 'left', verticalAlign = 'middle' }:TextProps) {
    
    return(
        <div
            style={{
                backgroundColor: color,
                width: `${width}${unit}`,
                height: `${height}${unit}`,
                borderRadius: borderRadius,
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100, 
                transform: `rotate(${angle}deg)`,
                zIndex: zIndex,
                color: textColor,
                fontSize: `${size}px`,
                fontFamily: font,
                display: 'flex',
                justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
                alignItems: verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'bottom' ? 'flex-end' : 'center',
                textAlign: textAlign,
                wordWrap: "break-word",
            }}
        >
            {children}
        </div>
    )
}