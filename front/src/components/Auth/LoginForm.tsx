"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginApi } from "@/api/Login";
import { ErrorProps } from "@/components/mypage/ProjectStore";

export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const route = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setPasswordVisibility(false);
        const loginData = { email, password };
        try {
            const response = await LoginApi(loginData);
            if (response.token) {
                Cookies.set('AuthToken', response.token, {
                    secure: true,
                    sameSite: 'Lax',
                    expires: 10,
                    path: '/'
                });
                route.push('/home')
            }
        } catch (error) {
            const apiError = error as ErrorProps;
            if (apiError?.status === 422 && apiError.data?.errors) {
                setErrors(apiError.data.errors);
            } else {
                setErrors({ password: ['メールアドレスまたはパスワードが正しくありません。'] })
            }
        }
    };

    return (
        <div>
            <form 
                onSubmit={handleLogin} 
            >
                <div className="mb-5">
                    <label className="block text-text text-base mb-1">メールアドレス</label>
                    <div className="relative">
                        <Image
                            src="/account.svg"
                            alt="メールアイコン"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        />
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="example@mail.com"
                            className={`w-full pl-10 px-3 py-2 border-2 rounded-md hover:shadow-input focus:outline-none focus:border-text ${
                                errors.email ? "border-error" : "border-baseC"
                            }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="pt-2 text-error text-xs">{errors.email[0]}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-text text-base mb-1">パスワード</label>
                    <div className="relative">
                        <input
                            type={passwordVisibility ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="8文字以上入力してください"
                            className={`relative w-full pl-10 px-3 py-2 border-2 rounded-md hover:shadow-input focus:outline-none focus:border-text ${
                                errors.password ? "border-error" : "border-baseC"
                            }`}
                        />
                        <Image
                            src="/key.svg"
                            alt="鍵アイコン"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        />         
                        <button onClick={() => setPasswordVisibility(!passwordVisibility)} type="button">
                            <Image
                                src={`/visibility_${passwordVisibility ? "open" : "close"}.svg`}
                                alt="パスワード表示切替アイコン"
                                width={20}
                                height={20}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                        </button>
                    </div>
                    {errors.password && (
                        <p className="pt-2 text-error text-xs">{errors.password[0]}</p>
                    )}
                </div>
                <div className="space-y-2 mt-2">
                    <Link 
                        prefetch href="/register"
                        className="block text-textLight underline hover:opacity-60"
                    >
                        まだアカウントを登録していない方
                    </Link>

                    <Link 
                        prefetch href="/register"
                        className="block text-textLight underline hover:opacity-60"
                    >
                        パスワードをお忘れの方
                    </Link>
                </div>
                <div className="flex justify-center mt-7">
                    <button
                        type="submit"
                        className="w-52 bg-sub text-white text-2xl py-2 rounded-3xl transition hover:opacity-60"
                    >
                        ログイン
                    </button>
                </div>
            </form>
        </div>
    );
};