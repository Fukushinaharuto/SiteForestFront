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
import Link from "next/link";
import Image from "next/image"
import { PageIndex } from "@/api/Page"
import { PageComponentIndex } from "@/api/PageComponent";

export type ItemType = PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems;
export default function Page() {
    const [items, setItems] = useState<(PolygonItems | SquareItems | CircleItems | TextItems | HyperLinkItems)[]>([]);
    const Token = Cookies.get('AuthToken');
    const router = useRouter();
    const [checkToken, setCheckToken] = useState(false);
    const { name: encodedName, page: encodedPage } = useParams();
    const name = decodeURIComponent(encodedName as string);
    const page = decodeURIComponent(encodedPage as string);
    const [checkUrl, setCheckUrl] = useState(false);
    const [previewHeader, setPreviewHeader] = useState(false);
    const [pageName, setPageName] = useState("");
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        const loadItems = async () => {
            const storedItems = localStorage.getItem(`${name}_${page}_droppedItems`);
            const localItems = storedItems ? JSON.parse(storedItems) : [];
    
            const response = await PageComponentIndex({ name, page });
            const dbItems = response ? response.droppedItems : [];
    
            const mergedItems = dbItems.map((dbItem: ItemType) => {
                const localItem = localItems.find((local: ItemType) => local.id === dbItem.id);
                return localItem ? { ...dbItem, ...localItem } : dbItem;
            });
    
            localItems.forEach((localItem: ItemType) => {
                if (!dbItems.some((dbItem: ItemType) => dbItem.id === localItem.id)) {
                    mergedItems.push(localItem);
                }
            });
            setItems(mergedItems);
        };
    
        loadItems();
    }, [name, page]);
    
    

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
                        router.push(`/mypage/preview/${name}/home`)
                    }
                } else {
                    router.push("/mypage");
                }
            } else {
                router.push('/mypage')
            }
        }    
        checkName();
    }, [Token, name, checkProject, page]);

    useEffect(() => {
        const PageList = async() => {
            const response = await PageIndex({name});
            setPages(response.pages || []);
        }
        PageList()
    }, [name, setPageName]);

    const handlePageJump = () => {
        if (pageName) {
            router.push(`/mypage/preview/${name}/${pageName}`);
        }
    };

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
                {previewHeader ? 
                
                <div className="fixed top-0 left-0 w-full bg-baseC border-b-2 border-text h-[70px] z-10">
                    <nav className="flex items-center justify-end mx-8 h-full">
                        <div className="flex space-x-4 mr-8">
                            <select
                                onChange={(e) => setPageName(e.target.value)}
                                className="text-text border border-text w-52"
                                value={pageName}
                            >
                                <option value="" disabled>ページ選択</option>
                                {pages.map((page) => (
                                    <option key={page} value={page}>
                                        {page}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <button
                                    className="bg-accent py-2 px-3 rounded-md text-white"
                                    onClick={handlePageJump}
                                >
                                    遷移
                                </button>
                            </div>
                        </div>
                        <Link 
                            href={`/mypage/${name}/${page}`} prefetch
                            className="bg-accent px-3 py-2 rounded-md text-white">作成ページに戻る
                        </Link>
                    </nav>
                    <button
                        className="fixed top-1 left-1"
                        onClick={() => setPreviewHeader(!previewHeader)}
                    >
                        <Image
                            src="/close.svg"
                            alt="ヘッダーを閉じるアイコン"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
                :
                <button
                    className="fixed top-1 left-1 z-10 bg-baseC"
                    onClick={() => setPreviewHeader(!previewHeader)}
                >
                    <Image
                        src="/open.svg"
                        alt="ヘッダーを開くアイコン"
                        width={30}
                        height={30}
                    />
                </button>
                }
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