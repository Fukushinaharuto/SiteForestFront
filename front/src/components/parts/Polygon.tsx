export interface PolygonProps {
    width: number;
    height: number;
    unit: string;
    color?: string;
    border: number;
    borderColor: string;
    opacity: number;
    sides: number;
    angle: number;
    zIndex: number;
}

export function Polygon({ width, height, unit, color, border, borderColor, opacity, sides, angle, zIndex }: PolygonProps): JSX.Element {
    const generatePolygonPoints = (sides: number, angleOffset: number): string => {
        const points: string[] = [];
        const angleStep = (2 * Math.PI) / sides;

        for (let i = 0; i < sides; i++) {
            const angle = angleStep * i - Math.PI / 2 + (angleOffset * Math.PI) / 180;
            const x = 50 + 50 * Math.cos(angle);
            const y = 50 + 50 * Math.sin(angle);
            points.push(`${x}% ${y}%`);
        }
        return points.join(", ");
    };

    const polygonPoints = generatePolygonPoints(sides, angle);

    return (
        <div
            style={{
                backgroundColor: color,
                width: `${width}${unit}`,
                height: `${height}${unit}`,
                clipPath: `polygon(${polygonPoints})`,
                border: `${border}px solid ${borderColor}`,
                opacity: opacity/100,
                zIndex: zIndex,
            }}
        ></div>
    );
}
