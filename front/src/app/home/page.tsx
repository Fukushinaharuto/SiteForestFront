"use client"

import * as React from "react";
import Moveable from "react-moveable";
import { Square } from "@/components/parts/Square";

// アイテムの型定義
interface Item {
  id: string;
  content: string;
}

export default function App() {
    // アイテムの配列
    const [items, setItems] = React.useState<Item[]>([
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' },
    ]);

    // 各アイテムに対するrefを保持するオブジェクト
    const itemRefs = React.useRef<{[key: string]: React.RefObject<HTMLDivElement>}>({});

    // アイテムの更新関数
    const updateItem = (id: string, updates: Partial<Item>) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, ...updates } : item
        ));
    };
    const [a, setA] = React.useState("");

    return (
        <div className="w-full h-full relative">
            <div>
                {items.map(item => {
                    // 各アイテムに対するrefを作成または取得
                    if (!itemRefs.current[item.id]) {
                        itemRefs.current[item.id] = React.createRef<HTMLDivElement>();
                    }

                    return (
                        <div >
                            <Square
                                    color="black"
                                    width={40}
                                    height={40}
                                    unit="px"
                                    borderRadius={a}
                                    border={0}
                                    borderColor=""
                                    opacity={100}
                                    angle={0}
                                />
                            <div key={item.id} ref={itemRefs.current[item.id]} style={{
                                position: 'absolute',
                                // 他のスタイルプロパティをここに追加
                                backgroundColor: "red",
                                borderRadius:"146px / 146px 146px 146px 55px",
                            }}>
                                {item.content}
                            </div>
                            <Moveable
                                target={itemRefs.current[item.id]}
                                draggable={true}
                                resizable={true}
                                rotatable={true}
                                roundable={true}
                                isDisplayShadowRoundControls={true}
                                roundClickable={"control"}
                                roundPadding={15}
                                keepRatio={false}
                                throttleResize={1}
                                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                                onResize={e => {
                                    e.target.style.width = `${e.width}px`;
                                    e.target.style.height = `${e.height}px`;
                                    e.target.style.transform = e.drag.transform;
                                }}
                                onDrag={e => {
                                    e.target.style.transform = e.transform;
                                }}
                                onRotate={e => {
                                    e.target.style.transform = e.transform;
                                }}

                                roundableOptions={{
                                    minRadius: 0,
                                    maxRadius: 100,
                                    positions: ["tl", "tr", "bl", "br"]
                                }}
                                
                                
                                onRound={e => {
                                    console.log("ROUND", e.borderRadius);
                                    e.target.style.borderRadius = e.borderRadius;
                                    setA(e.borderRadius)
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
