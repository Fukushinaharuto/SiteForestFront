import { Polygon }  from "@/components/parts/Polygon";
import { Draggable } from '@/components/create/dnd/Draggable';
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { useState } from "react";

export function LeftSide(){
    const [openSections, setOpenSections] = useState({
        shapes: false,
        text: false,
        buttons: false,
    });
    const handleOpen = () => {
        setOpenSections((prevState) => ({
            ...prevState,
            shapes: !prevState.shapes,
        }))
    }
    return(
        <div>
            <div className="w-[150px] bg-gray-800 text-white p-4 fixed top-0 left-0 h-screen z-10">
                <h2 className="text-lg font-bold">パーツ</h2>
                <ul className="mt-4 space-y-2">
                    <li className="py-1 relative">
                        <button 
                            onClick={() => handleOpen()}
                            className="w-full text-left"
                        >
                            図形
                        </button>
                        {openSections.shapes && (
                            <div className="absolute top-0 left-full bg-white border border-gray-300 shadow-md p-4 w-20 ml-6 flex items-center justify-center">
                                <ul>
                                    <li className="py-1">
                                        <Draggable id="polygon">
                                            <Polygon
                                                width={50}
                                                height={50}
                                                color="#3498db"
                                                border={0}
                                                borderColor=""
                                                opacity={100}
                                                sides={5}
                                                angleOffset={0}
                                            />
                                        </Draggable>
                                    </li>
                                    <li className="pb-1">
                                        <Draggable id="square">
                                            <Square
                                                width={50}
                                                height={50}
                                                radiusTopLeft={0}
                                                radiusTopRight={0}
                                                radiusBottomLeft={0}
                                                radiusBottomRight={0}
                                                color="#3498db"
                                                border={0}
                                                borderColor=""
                                                opacity={100}
                                                angle={0}
                                            />
                                        </Draggable>
                                    </li>
                                    <li className="py-1">
                                        <Draggable id="circle">
                                            <Circle
                                                width={50}
                                                height={50}
                                                color="#3498db"
                                                border={0}
                                                borderColor=""
                                                opacity={100}
                                                angle={0}
                                            />
                                        </Draggable>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

            </div>
        </div>
    )
}
