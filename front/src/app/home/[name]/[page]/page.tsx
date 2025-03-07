"use client"

import { useState, useEffect } from "react"
import { PolygonItems, SquareItems, CircleItems, TextItems, HyperLinkItems  } from "@/components/mypage/create/ItemsCase"
import { Polygon } from "@/components/parts/Polygon";
import { Square } from "@/components/parts/Square";
import { Circle } from "@/components/parts/Circle";
import { Text } from "@/components/parts/Text";
import { HyperLink } from "@/components/parts/HyperLink";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ProjectName } from "@/api/ProjectName";
import { VerifyToken } from "@/api/VerifyToken";
import { PageComponentIndex } from "@/api/PageComponent";

export default function Page() {
    const [items, setItems] = useState<(PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[]>([]);
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);
    const { name: encodedName, page: encodedPage } = useParams();
    const name = decodeURIComponent(encodedName as string);
    const page = decodeURIComponent(encodedPage as string);
    const [checkUrl, setCheckUrl] = useState(false);

    useEffect(() => {
        const Index = async() => {
            const response = await PageComponentIndex({ name, page}) 
            if (response ) {
                setItems(response.droppedItems);
            }
        }
        Index()
        
    }, []);

    useEffect(() => {
        if (!Token) {
            router.push("/login");
            return;
        }
        const Verify = async() => {
            const response = await VerifyToken();
            if (response) {
                setCheckToken(true)
            } else {
                Cookies.remove('AuthToken', { path: '/' });
                router.push("/login");
            }
        }
        Verify()
        

    }, [VerifyToken, Token, router]);

    const checkProject = ProjectName({ name });
    useEffect(() => {
        const checkName = async() => {
            const response = await checkProject();
            
            if (response && response.name) {
                if (response.name.some(projectName => projectName === name)) {
                    if (response.page.some(projectPage => projectPage === page)) {
                        setCheckUrl(true)
                        return;
                    } else {
                        router.push(`/home/${name}/home`)
                    }
                } else {
                    router.push("/home");
                }
            } else {
                router.push('/home')
            }
        }    
        checkName();
    }, [Token, name, checkProject, page]);


    if (!(checkToken && checkUrl)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="circle-packman-1"></div>
            </div>
        );
    }

    return(
        <div>
            <div className="relative w-screen h-screen overflow-hidden">
                {items.map((item) => (
                    <div
                        style={{
                            position: "absolute",
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: `${item.width}px`,
                            height: `${item.height}px`,
                            backgroundColor: `${item.color}`,
                            transform: `rotate(${item.angle}deg)`,
                            ...(item.type === "square" && { borderRadius: item.borderRadius }),
                            zIndex: `${item.zIndex}`,
                        }}
                    >
                        {item.type === "polygon" && (
                            <Polygon
                                width={item.width}
                                height={item.height}
                                unit="px"
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                sides={item.sides}
                                angle={item.angle}
                                zIndex={item.zIndex}
                            />
                        )}
                        {item.type === "square" && (
                            <Square
                                width={item.width}
                                height={item.height}
                                unit="px"
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={0}
                                zIndex={item.zIndex}
                            />
                        )}
                        {item.type === "circle" && (
                            <Circle
                                width={item.width}
                                height={item.height}
                                unit="px"
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                angle={item.angle}
                                zIndex={item.zIndex}
                            />
                        )}
                        {item.type === "text" && (
                            <Text
                                width={item.width}
                                height={item.height}
                                unit="px"
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                textColor={item.textColor}
                                size={item.size}
                                textAlign={item.textAlign}
                                verticalAlign={item.verticalAlign}
                                zIndex={item.zIndex}
                            >
                                {item.children}
                            </Text>
                        )}
                        {item.type === "hyperLink" && (
                            <HyperLink
                                width={item.width}
                                height={item.height}
                                unit="px"
                                border={item.border}
                                borderColor={item.borderColor}
                                opacity={item.opacity}
                                textColor={item.textColor}
                                size={item.size}
                                textAlign={item.textAlign}
                                verticalAlign={item.verticalAlign}
                                href={item.href}
                                isLink={item.isLink}
                                zIndex={item.zIndex}
                            >
                                {item.children}
                            </HyperLink>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}