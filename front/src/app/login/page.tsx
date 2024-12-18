import { LoginForm } from "@/components/Auth/LoginForm";

export default function Page() {
    return(
        <div>
            <h1 className="text-text text-4xl text-center border-b-8 border-accent p-10 mt-8">
                ログイン
            </h1>
            <div className="flex items-center justify-center px-10 mt-20">
                <div className="p-10 rounded-3xl shadow-form mt-10 w-[700px]">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}