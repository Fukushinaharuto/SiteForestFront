"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export function Header () {
    const pathname = usePathname();
    const isShow = pathname === '/mypage' || pathname === '/home';


    return (
        <div>
            {isShow && (
                <div>
                    <div className="h-[70px]" />
                    <div className="fixed top-0 left-0 w-full bg-white border-b-2 border-text h-[70px]">
                        <nav className="flex items-center justify-between mx-8 h-full">
                            <div className="flex justify-end space-x-6">
                                <Link href="/home" prefetch className="text-text hover:text-primary">Home</Link>
                                <Link href="/mypage" prefetch className="text-text hover:text-primary">MyPage</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};