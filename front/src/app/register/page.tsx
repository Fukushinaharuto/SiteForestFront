import RegisterForm from '@/components/Auth/RegisterForm';

const Register = () => {
    return (
        <div className="min-h-screen bg-baseC flex items-center justify-center">
            <div className="max-w-xl w-full">
                <h1 className="text-text text-4xl text-center bg-accent rounded-t-3xl shadow-md p-4">
                    新規登録
                </h1>
                <div className="bg-white p-6 rounded-b-3xl shadow-md">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default Register;
