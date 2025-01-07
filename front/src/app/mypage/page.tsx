"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProjectList } from "@/components/mypage/ProjectList";
import { ProjectStore } from "@/components/mypage/ProjectStore";

export default function Page() {
    const Token = Cookies.get("AuthToken");
    const router = useRouter();

    useEffect(() => {
        if (!Token) {
            router.push("/login");
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative max-w-6xl mx-auto">
            <button
                className="bg-accent text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                新規作成
            </button>
            <ProjectList Token={Token} />

            {isModalOpen && (
                <ProjectStore
                    Token={Token}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
