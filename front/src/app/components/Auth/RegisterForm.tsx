"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({}); // 各フィールドのエラーを管理

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({}); // エラーをリセット

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            // 成功時の処理
            alert("登録が完了しました！");
        } catch (error: any) {
            if (error.response?.status === 422) {
                // バリデーションエラーをセット
                setErrors(error.response.data.errors);
            } else {
                console.error("新規登録のエラー", error);
            }
        }
    };

    const handleVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                {/* メールアドレス入力 */}
                <div className="relative mb-4">
                    <label className="block text-text text-base">メールアドレス</label>
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
                            placeholder="user@mail.com"
                            className={`w-full pl-10 px-3 py-2 border-2 rounded-md ${
                                errors.email ? "border-red-500" : "border-baseC"
                            }`}
                        />
                        {errors.email && (
                            <p className="absolute left-0 top-full text-red-500 text-sm">{errors.email[0]}</p>
                        )}
                    </div>
                </div>

                {/* パスワード入力 */}
                <div className="relative mb-4">
                    <label className="block text-text text-base">パスワード</label>
                    <div className="relative">
                        <Image
                            src="/key.svg"
                            alt="鍵アイコン"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        />
                        <input
                            type={passwordVisibility ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="8文字以上入力してください"
                            className={`w-full pl-10 px-3 py-2 border-2 rounded-md ${
                                errors.password ? "border-red-500" : "border-baseC"
                            }`}
                        />
                        <button onClick={handleVisibility} type="button">
                            <Image
                                src={`/visibility_${passwordVisibility ? "open" : "close"}.svg`}
                                alt="パスワード表示切替アイコン"
                                width={20}
                                height={20}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                        </button>
                        {errors.password && (
                            <p className="absolute left-0 top-full text-red-500 text-sm">{errors.password[0]}</p>
                        )}
                    </div>
                </div>

                {/* パスワード確認 */}
                <div className="relative mb-6">
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
                            type="password"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            value={passwordConfirmation}
                            required
                            className={`w-full pl-10 px-3 py-2 border-2 rounded-md ${
                                errors.password_confirmation ? "border-red-500" : "border-baseC"
                            }`}
                        />
                        {errors.password_confirmation && (
                            <p className="absolute left-0 top-full text-red-500 text-sm">{errors.password_confirmation[0]}</p>
                        )}
                    </div>
                </div>

                {/* 登録ボタン */}
                <button
                    type="submit"
                    className="w-full bg-sub text-text text-2xl py-2 rounded-md transition"
                >
                    登録
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
