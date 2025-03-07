import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { Text } from "@/components/parts/Text";
import {  DragOverlay } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core";
import { HyperLink } from "@/components/parts/HyperLink";

export function DragOver({ activeDragItem }: { activeDragItem: UniqueIdentifier | null }) {

    return( 
        <DragOverlay>
            {activeDragItem === "polygon" && (
                <Polygon
                    width={50}
                    height={50}
                    unit="px"
                    color="#3498db"
                    border={0}
                    borderColor=""
                    opacity={100}
                    sides={5}
                    angle={0}
                    zIndex={1}
                />
            )}
            {activeDragItem === "square" && (
                <Square
                    width={50}
                    height={50}
                    unit="px"
                    borderRadius="0px"
                    color="#cc0066"
                    border={0}
                    borderColor=""
                    opacity={100}
                    angle={0}
                    zIndex={1}
                />
            )}
            {activeDragItem === "circle" && (
                <Circle
                    width={50}
                    height={50}
                    unit="px"
                    color="#3498db"
                    border={0}
                    borderColor=""
                    opacity={100}
                    angle={0}
                    zIndex={1}
                />
            )}
            {activeDragItem == "text" && (
                <Text
                    width={50}
                    height={50}
                    unit="px"
                    color="#cc0066"
                    border={0}
                    borderColor=""
                    opacity={100}
                    angle={0}
                    zIndex={1}
                    textColor="white"
                    size={5}
                    textAlign="right"
                    verticalAlign="middle"
                >
                    テキスト
                </Text>
            )}
            {activeDragItem == "hyperLink" && (
                <HyperLink
                    width={50}
                    height={50}
                    unit="px"
                    color="#cc0066"
                    border={0}
                    borderColor=""
                    opacity={100}
                    angle={0}
                    zIndex={1}
                    textColor="white"
                    size={5}
                    textAlign="right"
                    verticalAlign="middle"
                    href=""
                    isLink="no"
                >
                    テキスト
                </HyperLink>
            )}
        </DragOverlay>
    )
}