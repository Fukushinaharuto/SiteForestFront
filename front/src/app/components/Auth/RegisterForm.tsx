'use client'
import axios from 'axios';
import { useState } from 'react';


interface RegisterProps {
    email:string;
    password:string;
}

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
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
            const response = await axios.post<RegisterProps>(`${process.env.NEXT_PUBLIC_API_URL}/register`,
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
    return(
        <div>
            <h2>{ error }</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700">メールアドレス</label>
                    <input
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}                      
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">パスワード</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}  
                        required
                        placeholder="8文字以上"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">パスワードの確認</label>
                    <input
                        type="password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        value={passwordConfirmation}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>        
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    登録
                </button>
            </form>
        </div>
    )
}

export default RegisterForm;