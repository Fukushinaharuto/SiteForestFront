import { RegisterForm } from '@/components/Auth/RegisterForm';

export default function Page() {
    return (
            <div>
                <h1 className="text-text text-4xl text-center border-b-8 border-accent p-10 mt-8">
                        新規登録
                    </h1>
                <div className="flex items-center justify-center px-10 mt-14">
                    <div className="p-10 rounded-3xl shadow-form mt-10 w-[700px]">
                        <RegisterForm />
                    </div>
                </div>
            </div>
    );
};

