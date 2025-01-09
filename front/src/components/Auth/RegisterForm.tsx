"use client"

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterApi } from "@/api/Register";
import { ErrorProps } from "@/components/mypage/ProjectStore";


export function RegisterForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const route = useRouter();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setPasswordVisibility(false);
        const loginData = { email, password, password_confirmation: passwordConfirmation };
        try {
            await RegisterApi(loginData);
            route.push('/login');
        } catch (error) {
            const apiError = error as ErrorProps;
            if (apiError?.status === 422 && apiError.data?.errors) {
                setErrors(apiError.data.errors);
            } else {
                setErrors({ passwordConfirmation: ['もう一度、登録し直してください'] })
            }
        }
    };

    return (
        <div>
            <form 
                onSubmit={handleRegister} 
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
                <div className="mb-5">
                    
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
                <div className="mb-6">
                    <label className="block text-text text-base">パスワードの確認</label>
                    <div className="relative">
                        <Image
                            src="/key.svg"
                            alt="確認アイコン"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        />
                        <input
                            type={passwordVisibility ? "text" : "password"}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            value={passwordConfirmation}
                            required
                            placeholder="もう一度パスワードを入力してください"
                            className={`w-full pl-10 px-3 py-2 border-2 rounded-md hover:shadow-input focus:outline-none focus:border-text ${
                                errors.password_confirmation ? "border-error" : "border-baseC"
                            }`}
                        />
                    </div>
                    {errors.password_confirmation && (
                        <p className="pt-2 text-error text-xs">{errors.password_confirmation[0]}</p>
                    )}
                </div>
                <Link 
                    prefetch href="/login"
                    className="text-textLight underline hover:opacity-60"
                >
                    すでにアカウントを持っている方
                </Link>
                <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        className="w-52 bg-sub text-white text-2xl py-2 rounded-3xl transition hover:opacity-60"
                    >
                        登録
                    </button>
                </div>
                
            </form>
        </div>
    );
};
