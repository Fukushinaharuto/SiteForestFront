'use client'
import axios from 'axios';
import { useState } from 'react';
import Image from "next/image";


interface RegisterProps {
    email:string;
    password:string;
}

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async(event: React.FormEvent) => {
        event.preventDefault();

        if(password.length <= 7){
            setError('パスワードを8文字以上にしてください。')
            return;
        }

        if (password !== passwordConfirmation) {
            setError('パスワードが一致しません。');
            return;
        }

        
        try{
            await axios.post<RegisterProps>(`${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    email,
                    password,
                }
            );
            setError('');
        }catch(error){
            console.error('新規登録のエラー', error);

        }
    }

    const handleVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    }

    return (
        <div>
            <h2>{error}</h2>
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
                            className="w-full pl-10 px-3 py-2 border-2 border-baseC rounded-md"
                        />
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
                            className="w-full pl-10 px-3 py-2 border-2 border-baseC rounded-md"
                        />
                            <button 
                                onClick={handleVisibility}
                                type="button"
                            >
                                <Image
                                src={`/visibility_${passwordVisibility ? "open" : "close"}.svg`}
                                alt="パスワードが見えないアイコン"
                                width={20}
                                height={20}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                />
                            </button>
                        
                    
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
                            className="w-full pl-10 px-3 py-2 border-2 border-baseC rounded-md"
                        />
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
}

export default RegisterForm;